const express = require("express");
const router = express.Router();
const utils = require("../common/utils");
const error_code = require("../common/error_code");
const database = require("../common/database");
const auth = require("../common/auth");

router.post("/add", auth, async function (req, res, next) {
    try {
        let SQL =
            "INSERT INTO bk_bookmark VALUES(?, ?)";
        let Params = [req.session.uid, req.body.bid];
        let result = await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/remove", auth, async function (req, res, next) {
    try {
        let SQL =
            "DELETE FROM bk_bookmark WHERE uid = ? AND bid = ?";
        let Params = [req.session.uid, req.body.bid];
        let result = await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/find", auth, async function (req, res, next) {
    try {
        let SQL =
            "SELECT id, title, description, photos, price " +
            "FROM bk_bookmark " +
            "LEFT JOIN bk_bike " +
            "ON bk_bike.id = bk_bookmark.bid " +
            "WHERE bk_bookmark.uid = ?"
        let Params = [req.session.uid];
        let result = await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});


module.exports = router;