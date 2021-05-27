const express = require("express");
const router = express.Router();
const utils = require("../common/utils");
const error_code = require("../common/error_code");
const database = require("../common/database");
const auth = require("../common/auth");

router.post("/add", auth, async function (req, res, next) {
    let title = req.body.title;
    let description = req.body.description;
    let photos = req.body.photos;
    //set default photo list to [3]
    if (photos.length === 0){
        photos = JSON.stringify([3]);
    }
    let location = req.body.location;
    let deposit = req.body.deposit;
    let price = req.body.price;

    // insert data to database
    if (!req.body.location){
        return utils.SendError(res, error_code.error_location);
    }
    let SQL =
        "INSERT INTO bk_bike (uid, title, description, photos, location, deposit, price) VALUES(?,?,?,?, POINT(?,?), ?, ?)";
    let Params = [
        req.session.uid,
        title,
        description,
        photos,
        location.lng,
        location.lat,
        deposit,
        price,
    ];

    try {
        await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, error_code.error_success);
    } catch (e) {
        return utils.SendError(res, e);
    }
});

router.post("/find", auth, async function (req, res, next) {
    let location = req.body.location;
    let distance = req.body.distance;
    try {
        let SQL =
            "SELECT id, location FROM bk_bike WHERE ST_DISTANCE_SPHERE(location, POINT(?, ?)) < ? " +
            "AND available = 1";
        let Params = [location.long, location.lat, distance];
        let result = await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/list", auth, async function (req, res, next) {
    try {
        let SQL =
            "SELECT id, title, description, photos, price FROM bk_bike WHERE uid = ?";
        let Params = [req.session.uid];
        let result = await database.QueryMySQL(SQL, Params);

        for (let index = 0; index < result.length; ++index) {
            if (result[index].photos) {
                SQL = "SELECT path from bk_file WHERE id in (?)";
                Params = [JSON.parse(result[index].photos)];
                result[index].photos = await database.QueryMySQL(SQL, Params);
            }
        }

        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/remove", auth, async function (req, res, next) {
    try {
        let SQL =
            "DELETE FROM bk_bike WHERE id = ?";
        let Params = [req.body.bid];
        let result = await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/detail", auth, async function (req, res, next) {
    try {
        let SQL =
            "SELECT title, description, photos, deposit, price, " +
            "fname, head, email, bk_bookmark.bid FROM bk_bike " +
            "LEFT JOIN bk_user " +
            "ON bk_bike.uid = bk_user.id " +
            "LEFT JOIN bk_bookmark " +
            "ON bk_bookmark.bid = ? and bk_bookmark.uid = ? " +
            "WHERE bk_bike.id = ?";
        let Params = [req.body.bid, req.session.uid, req.body.bid];
        let result = await database.QueryMySQL(SQL, Params);

        if (result.length && result[0].photos) {
            SQL = "SELECT path from bk_file WHERE id in (?)";
            Params = [JSON.parse(result[0].photos)];
            result[0].photos = await database.QueryMySQL(SQL, Params);
        }

        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

module.exports = router;
