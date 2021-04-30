let express = require('express');
let router = express.Router();
let utils = require('../common/utils');
let database = require('../common/database');

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        let result = database.QueryMySQL("SELECT * FROM bk_user");
        return utils.SendResult(res, result);
    }catch (e) {
        utils.SendError(res, e);
    }
});

module.exports = router;
