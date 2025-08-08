const db = require("../config/db");
const createError = require("http-errors");

// forwards serious complaints to admin
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

// update rovoke request status
exports.update_revoke_status = (req, res, next) => {
  try {
    const{status, complaint_id} = req.params;
    if(!['accepted','rejected'].includes(status) || complaint_id.trim() == "")return next(createError.BadRequest("some parameters are missing!"));
    let sql = "update faculty_logger set status = ? where complaint_id = ?";
    db.query(sql,[status, complaint_id], (err,result) => {
      if(err)return next(err);
      if(result.affectedRows == 0)return next(createError.BadRequest('status not updated!'));
      res.send(`status updated to ${status}`);
    })
  } catch (error) {
    next(error);
  }
};


