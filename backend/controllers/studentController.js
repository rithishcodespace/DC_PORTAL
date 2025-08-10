const createError = require("http-errors");
const db = require("../config/db");

// Get all complaints for a student + revoke_status
exports.get_complaints = (req,res,next) => {
    try{
      const {id} = req.params;
      if(id.trim() == "")return next(createError("id not present!"));
      let sql = "select * from faculty_logger where student_id = ? and date_time <= now() - interval 6 hour";
      db.query(sql,[id],(err,result) => {
        if(err)return next(err);
        res.send(result);
      })
    }
    catch(error){
        next(error);
    }
}

// submit a response for the complaint
exports.revoke_complaint = (req,res,next) => {
  try{
    const{complaint_id} = req.params;
    const{reason} = req.body;
    if(complaint_id.trim() == "" || reason.trim() == "")return next(createError.BadRequest("some parameters are missing!"));
    let sql = "update faculty_logger set revoke_message = ? where complaint_id = ?";
    db.query(sql, [reason, complaint_id], (err, result) => {
      if(err)return next(err);
      if(result.affectedRows == 0)return next(createError.BadRequest('error occured while inserting!'));
      return res.send('revoke sent to faculty!');
    })
  }
  catch(error){
    next(error);
  }
}

