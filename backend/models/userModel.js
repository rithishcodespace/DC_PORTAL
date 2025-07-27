const db = require("../config/db");

exports.findUserByEmail = (email,callback) => {
    db.query("select * from users where email = ?",[email], callback)
};