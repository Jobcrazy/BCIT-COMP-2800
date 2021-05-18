const express = require("express");
const router = express.Router();
const utils = require("../common/utils");
const database = require("../common/database");
const auth = require("../common/auth");
const error_code = require("../common/error_code");

router.post("/make", auth, async function (req, res, next) {
    try {
        let SQL = "SELECT * FROM bk_bike WHERE id = ?";
        let Params = [req.body.id];
        let bikeInfo = await database.QueryMySQL(SQL, Params);

        if (!bikeInfo.length) {
            return utils.SendError(res, error_code.error_record);
        } else if (req.session.uid === bikeInfo[0].uid) {
            return utils.SendError(res, error_code.error_same_person);
        } else if (bikeInfo[0].available === '0') {
            return utils.SendError(res, error_code.error_rented);
        }

        SQL = "UPDATE bk_bike SET available = 0 WHERE id = ?";
        Params = [req.body.bid];
        await database.QueryMySQL(SQL, Params);

        SQL = "INSERT INTO bk_order (rid, oid, bid, price, " +
            "deposit, location) VALUES(?, ?, ?, ?, ?, POINT(?,?))";
        Params = [
            req.session.uid,
            bikeInfo[0].uid,
            bikeInfo[0].id,
            bikeInfo[0].price,
            bikeInfo[0].deposit,
            bikeInfo[0].location.x,
            bikeInfo[0].location.y
        ];
        await database.QueryMySQL(SQL, Params);
        return utils.SendResult(res);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/list/in", auth, async function (req, res, next) {
    try {
        let SQL = "SELECT * FROM bk_order WHERE rid = ?";
        let Params = [req.session.uid];
        let result = await database.QueryMySQL(SQL, Params);

        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/list/out", auth, async function (req, res, next) {
    try {
        let SQL = "SELECT * FROM bk_order WHERE oid = ?";
        let Params = [req.session.uid];
        let result = await database.QueryMySQL(SQL, Params);

        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

router.post("/complete", auth, async function (req, res, next) {
    try {
        let SQL = "SELECT return_at FROM bk_order WHERE id = ?";
        let Params = [req.body.id];
        let result = await database.QueryMySQL(SQL, Params);
        if (result[0].return_at) {
            return utils.SendError(res, error_code.error_returned);
        }

        SQL = "UPDATE bk_order SET return_at = current_timestamp() " +
            "WHERE id = ?";
        await database.QueryMySQL(SQL, Params);

        SQL = "SELECT bid, oid, price, TIMESTAMPDIFF(HOUR, create_at, return_at) as time " +
            "FROM bk_order WHERE id = ?";
        result = await database.QueryMySQL(SQL, Params);
        if (!result.length) {
            return utils.SendError(res, error_code.error_record);
        }

        let price = parseFloat(result[0].price) * parseInt(result[0].time);
        SQL = "UPDATE bk_user SET balance = balance + ? WHERE id = ?";
        Params = [price, result[0].oid];

        await database.QueryMySQL(SQL, Params);

        SQL = "UPDATE bk_bike SET available = 1 WHERE id = ?";
        Params = [result[0].bid];
        await database.QueryMySQL(SQL, Params);

        return utils.SendResult(res);
    } catch (e) {
        utils.SendError(res, e);
    }
});

module.exports = router;