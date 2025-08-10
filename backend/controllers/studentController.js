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

// get all scheduled meetings
exports.get_scheduled_meetings = (req,res,next) => {
  try{
    const{type} = req.params;
    const{student_id} = req.body;
    if(!student_id.trim())return next(createError.BadRequest("student_id not found!"));
    if(!['history','scheduled'].includes(type))return next(createError.BadRequest('invalid type'))
    condition = (type == 'scheduled') ? 't1.date_time >= NOW()' : 't1.date_time < NOW()';
    let sql = ` select t1.meeting_id, t1.admin_id, t1.venue, t1.date_time
                from meetings t1 join faculty_logger t2 
                on t1.complaint_id = t2.complaint_id
                where t2.student_id = ? and ${condition} `
    db.query(sql,[student_id],(err,result) => {
      if(err || result.length == 0){
        return next(err || createError.NotFound('no scheduled meetings found'));
      }
      res.send(result);
    })
  }
  catch(error){
    next(error);
  }
}

