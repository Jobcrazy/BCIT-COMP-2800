let express = require("express");
let request = require('request');
let qs = require('querystring');
let router = express.Router();
let utils = require("../common/utils");
let database = require("../common/database");
let auth = require("../common/auth");
let error_code = require("../common/error_code");

// User login
router.post("/login", async function (req, res, next) {
    try {
        let params = [req.body.gid];
        let result = await database.QueryMySQL(
            "SELECT id from bk_user where gid = ?",
            params
        );

        //User exists, update information
        if (result.length) {
            params = [
                req.body.fname,
                req.body.gname,
                req.body.xname,
                req.body.head,
                req.body.email,
                req.body.gid,
            ];
            await database.QueryMySQL(
                "UPDATE bk_user SET `fname` = ?, `gname` = ?, " +
                "`xname` = ?, `head` =? , `email` = ? WHERE `gid` = ?",
                params
            );

            let result = await database.QueryMySQL(
                "SELECT id from bk_user where gid = ?",
                [req.body.gid]
            );

            req.session.uid = result[0].id;
            return utils.SendResult(res);
        }

        //User does not exists, insert to user table
        params = [
            req.body.gid,
            req.body.fname,
            req.body.gname,
            req.body.xname,
            req.body.head,
            req.body.email,
        ];
        result = await database.QueryMySQL(
            "INSERT INTO bk_user( `gid`, `fname`, `gname`, " +
            "`xname`, `head`, `email`) VALUES(?, ?, ?, ?, ?, ?)",
            params
        );

        req.session.uid = result.insertId;
        return utils.SendResult(res);
    } catch (e) {
        utils.SendError(res, e);
    }
});

// Get the current user's information
router.post("/profile", auth, async function (req, res, next) {
    try {
        let params = [req.session.uid];
        let result = await database.QueryMySQL(
            "SELECT fname, gname, xname, head, email, balance " + "from bk_user where id = ?",
            params
        );
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

// User Email Login
router.post("/email/login", async function (req, res, next) {
    try {
        let password = await utils.CalcStringMD5(req.body.password);
        let params = [req.body.email, password];
        let result = await database.QueryMySQL(
            "SELECT id from bk_user where email = ? and password = ?",
            params
        );

        //User exists, update information
        if (result.length) {
            req.session.uid = result[0].id;
            return utils.SendResult(res);
        }

        return utils.SendError(res, error_code.error_user);
    } catch (e) {
        utils.SendError(res, e);
    }
});

// User Email Register
router.post("/email/register", async function (req, res, next) {
    try {
        let password = await utils.CalcStringMD5(req.body.password);
        let params = [
            password,
            req.body.gname + ' ' + req.body.xname,
            req.body.gname,
            req.body.xname,
            req.body.email,
            password,
        ];

        result = await database.QueryMySQL(
            "INSERT INTO bk_user( `gid`, `fname`, `gname`, " +
            "`xname`, `email`, `password`) VALUES(?, ?, ?, ?, ?, ?)",
            params
        );

        req.session.uid = result.insertId;
        return utils.SendResult(res);
    } catch (e) {
        utils.SendError(res, e);
    }
});

// Twitter
const CONSUMER_KEY = "5He4PeGxLLuGUFHKS0UQCGaeU";
const CONSUMER_SECRET = "xRQEsWrKWpEqQjYUorLXGbaJJXwHw75d3UU0hrr3No2z2f5WjI";

router.get("/callback", async function (req, res, next) {
    const oauth =
            {
                consumer_key: CONSUMER_KEY,
                consumer_secret: CONSUMER_SECRET,
                token: req.query.oauth_token,
                token_secret: req.session.oauth_token_secret,
                verifier: req.query.oauth_verifier
            },
        url = 'https://api.twitter.com/oauth/access_token';

    request.post({url: url, oauth: oauth}, function (e, r, body) {
        // ready to make signed requests on behalf of the user
        const perm_data = require('querystring').parse(body);
        const oauth =
                {
                    consumer_key: CONSUMER_KEY,
                    consumer_secret: CONSUMER_SECRET,
                    token: perm_data.oauth_token,
                    token_secret: perm_data.oauth_token_secret
                },
            url = 'https://api.twitter.com/1.1/statuses/update.json',
            qs = {
                //screen_name: perm_data.screen_name,
                //user_id: perm_data.user_id
                status: "Bike2Go is an application that allows users to lend or rent a bike from other users. " +
                    "User’s pay a deposit upon renting a bike, and pay a small fee upon returning the bike. " +
                    "http://bike.kaka888.net"
            };
        request.post({url: url, oauth: oauth, qs: qs, json: true}, function (e, r, user) {
            //res.redirect("http://bike.kaka888.net/user/main/me?shared=1")
            res.send("<h1>Successful Shared! Redirecting to Bike2Go...</h1>" +
                "<script>" +
                "setTimeout(function(){ window.location.href='http://bike.kaka888.net/user/main/me'}, 1500);</script>");
        })
    })
});

router.get("/twitter/auth", async function (req, res, next) {
    try {
        const oauth =
                {
                    callback: 'http://bike.kaka888.net/api/user/callback',
                    consumer_key: "5He4PeGxLLuGUFHKS0UQCGaeU",
                    consumer_secret: "xRQEsWrKWpEqQjYUorLXGbaJJXwHw75d3UU0hrr3No2z2f5WjI"
                },
            url = 'https://api.twitter.com/oauth/request_token';

        request.post({url: url, oauth: oauth}, function (e, r, body) {
            const req_data = qs.parse(body);
            req.session.oauth_token_secret = req_data.oauth_token_secret;
            const uri = 'https://api.twitter.com/oauth/authenticate'
                + '?' + qs.stringify({oauth_token: req_data.oauth_token});
            res.redirect(uri);
        })
    } catch (e) {
        utils.SendError(res, e);
    }
});

module.exports = router;
