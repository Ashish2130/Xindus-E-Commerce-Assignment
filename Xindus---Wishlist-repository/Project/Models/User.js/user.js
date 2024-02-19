const sql = require('mssql');

const user = {
    username: { type: sql.NVarChar, required: true },
    password: { type: sql.NVarChar, required: true }
};

module.exports = user;