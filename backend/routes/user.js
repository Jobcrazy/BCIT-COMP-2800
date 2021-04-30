let express = require('express');
let router = express.Router();
let utils = require('../common/utils');
let database = require('../common/database');
let auth = require('../common/auth');

// User register
router.post('/login', async function (req, res, next) {
    try {
        var params = [req.body.gid];
        let result = await database.QueryMySQL('SELECT id from bk_user where gid = ?', params);

        if (result.length) {
            params = [req.body.fname, req.body.gname, req.body.xname,
                req.body.head, req.body.email, req.body.gid];
            await database.QueryMySQL('UPDATE bk_user SET `fname` = ?, `gname` = ?, ' +
                '`xname` = ?, `head` =? , `email` = ? WHERE `gid` = ?', params);
            return utils.SendResult(res);
        }

        params = [req.body.gid, req.body.fname, req.body.gname,
            req.body.xname, req.body.head, req.body.email];
        await database.QueryMySQL('INSERT INTO bk_user( `gid`, `fname`, `gname`, ' +
            '`xname`, `head`, `email`) VALUES(?, ?, ?, ?, ?, ?)', params);
        return utils.SendResult(res);
    } catch (e) {
        utils.SendError(res, e);
    }
});

module.exports = router;
