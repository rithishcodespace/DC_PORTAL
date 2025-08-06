const db = require("../config/db");
const createError = require("http-errors");

exports.send_to_admin = (req,res,next) => {
    try{
      const{complaint_id, id} = req.params;
      if(complaint_id.trim() == "" || id.trim() == "")return next(createError.BadRequest());
      let sql = "insert into faculty_to_admin_issues(complaint_id, student_id, date_time) values(?, ?, NOW())";
      db.query(sql,[complaint_id, id],(err,result) => {
        if(err)return next(err);
        if(result.affectedRows == 0)return next(createError[400]);
      })
      let sql1 = "delete from faculty_logger where complaint_id = ? and id = ?";
      db.query(sql,[complaint_id, id],(err,result) => {
        if(err)return next(err);
        if(result.affectedRows == 0)return next(createError[400])
        res.json({
          message:"complaint forwarded to admin"
        })
      })
    }
    catch(error){
      next(error);
    }
}