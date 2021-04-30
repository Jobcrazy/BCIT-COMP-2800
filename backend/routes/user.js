let express = require('express');
let router = express.Router();
let utils = require('../common/utils');
let database = require('../common/database');
let auth = require('../common/auth');

// User register
router.post('/login', async function (req, res, next) {
    try {
        let result = await database.QueryMySQL('SELECT id, token from hw_user where gid = ?');
        if (result.length) {
            result = await database.QueryMySQL('UPDATE hw_user SET `fname` = ?, `gname` = ?, ' +
                '`xname` = ?, `head` =? , `email` = ? WHERE `gid` = ?');
            return utils.SendResult(res);
        }

        result = await database.QueryMySQL('INSERT INTO hw_user( `gid`, `fname`, `gname`, ' +
            '`xname`, `head`, `email`, `token`) VALUES(?, ?, ?, ?, ?, ?, ?)');
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

module.exports = router;
