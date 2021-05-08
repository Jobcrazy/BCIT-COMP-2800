const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const utils = require('../common/utils');
const error_code = require('../common/error_code');
const database = require('../common/database');
const auth = require('../common/auth');
const fs = require('fs');

// File upload
router.post('/upload', /*auth,*/ function (req, res) {
    // Make directories
    let publicDir = __dirname.replace('routes', 'public/');
    let uploadDir = publicDir + 'uploads/';
    if (!utils.mkdirsSync(publicDir, '0777') ||
        !utils.mkdirsSync(uploadDir, '0777')) {
        return utils.SendError(res, error_code.error_form);
    }

    // Receive file
    let form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = uploadDir;
    //form.maxFileSize = 20 * 1024 * 1024; //Max file size
    form.parse(req, async function (err, fields, files) {
        if (err || !files.file || !files.file.path) {
            return utils.SendError(res, error_code.error_form);
        }

        let fileName = files.file.name;
        let oldPath = files.file.path;
        let fileMD5 = null;

        try {
            fileMD5 = await utils.CalcFileMD5(oldPath);
        } catch (err) {
            return utils.SendError(res, error_code.error_io);
        }

        // Make directories
        let levelOneDir = uploadDir + fileMD5.substring(0, 2);
        let levelTwoDir = levelOneDir + '/' + fileMD5.substring(fileMD5.length - 2);
        if (!utils.mkdirsSync(levelOneDir, '0777') ||
            !utils.mkdirsSync(levelTwoDir, '0777')) {
            return utils.SendError(res, error_code.error_io);
        }

        // Move file to new path
        let newPath = levelTwoDir + "/" + fileMD5 + '.' +
            fileName.split('.')[fileName.split('.').length - 1];
        if (!fs.existsSync(newPath)) {
            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    return utils.SendError(res, error_code.error_io);
                }
            });
        }

        // Insert into Database
        let SQL = "SELECT * FROM bk_file WHERE md5 = ?";
        let Params = [fileMD5];

        try {
            let result = await database.QueryMySQL(SQL, Params);
            if (result.length) {
                fs.unlinkSync(oldPath);
                return utils.SendResult(res, result);
            }

            let newFileName = fileMD5 + '.' +
                fileName.split('.')[fileName.split('.').length - 1];
            let newRelativePath = "public/uploads/" + fileMD5.substring(0, 2) + "/" +
                fileMD5.substring(fileMD5.length - 2) + "/" + fileMD5 + '.' +
                fileName.split('.')[fileName.split('.').length - 1];
            let insertSQL = "INSERT INTO bk_file(name, path, md5) VALUES(?,?,?)";
            let insertParams = [newFileName, newRelativePath, fileMD5];
            await database.QueryMySQL(insertSQL, insertParams);

            result = await database.QueryMySQL(SQL, Params);
            return utils.SendResult(res, result);
        } catch (e) {
            return utils.SendError(res, e);
        }
    });
});

module.exports = router;