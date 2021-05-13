const express = require("express");
const router = express.Router();
const utils = require("../common/utils");
const error_code = require("../common/error_code");
const database = require("../common/database");
const auth = require("../common/auth");

router.post("/add", auth, async function (req, res, next) {
    let title = req.body.title;
    let description = req.body.description;
    let photos = JSON.stringify(req.body.photos);
    let location = req.body.location;
    let deposit = req.body.deposit;
    let price = req.body.price;

    // insert data to database
    let SQL =
        "INSERT INTO bk_bike (uid, title, description, photos, location, deposit, price) VALUES(?,?,?,?, POINT(?,?), ?, ?)";
    let Params = [
        req.session.uid,
        title,
        description,
        photos,
        location.lat,
        location.long,
        deposit,
        price,
    ];

    try {
        await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, error_code.error_success);
    } catch (e) {
        return utils.SendResult(res, e);
    }
});

router.post("/find", auth, async function (req, res, next) {
    let location = req.body.location;
    let distance = req.body.distance;
    try {
        let SQL =
            "SELECT id, location FROM bk_bike WHERE ST_DISTANCE_SPHERE(location, POINT(?, ?)) < ?";
        let Params = [location.lat, location.long, distance];
        let result = await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/list", auth, async function (req, res, next) {
    try {
        let SQL =
            "SELECT title, description, photos, price FROM bk_bike WHERE uid = ?";
        let Params = [req.session.uid];
        let result = await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
})

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

router.post("/bikeAndOwner", auth, async function (req, res, next) {
    try {
        let SQL =
            "SELECT title, description, photos, deposit,price, fname, head, email FROM bk_bike " +
            "LEFT JOIN bk_user " +
            "ON bk_bike.uid = bk_user.id " +
            "WHERE bk_bike.id = ?";
        let Params = [req.body.bid];
        let result = await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

module.exports = router;
