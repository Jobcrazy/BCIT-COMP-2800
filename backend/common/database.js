/*
* Copyright (c) 2010-2021, James Liu
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions
* are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in
*       the documentation and/or other materials provided with the distribution.
*     * Neither the name of Tit Software nor the names of its
*       contributors may be used to endorse or promote products derived
*       from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

let config = require('config');
let mysql = require('mysql');
let connection = null;

module.exports.QueryMySQL = function () {
    let local_arguments = arguments;

    return new Promise(function (resolve, reject) {
        if (!connection) {
            let config_mysql = config.get((process.env.DATABASE || 'bike') + '.db.mysql');
            connection = mysql.createPool({
                host: config_mysql.host,
                user: config_mysql.user,
                password: config_mysql.password,
                database: config_mysql.database,
                connectionLimit: config_mysql.max_connections,
                multipleStatements: config_mysql.multipleStatements
            });
            console.log('MySQL Pool Have Been Inited.')
        }

        if (local_arguments.length !== 1 && local_arguments.length !== 2) {
            return reject('Wrong arguments number.');
        }

        let sql = local_arguments[0];
        let params = local_arguments[1];
        if (typeof (params) !== 'object') {
            connection.query(sql, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        } else {
            connection.query(sql, params, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        }
    });
};