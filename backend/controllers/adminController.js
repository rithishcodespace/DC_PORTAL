const db = require("../config/db");
const createError = require("http-errors");
const { meeting_id } = require("../utils/id_generation");

exports.schedule_meeting = async(req,res,next) => {
    try{
      const{complaint_id, admin_id} = req.params;
      const{venue, info, date_time} = req.body; // admin_id
      const meet_id = await meeting_id();
      console.log(meet_id);
      if (
      !complaint_id?.trim() || !admin_id?.trim() || !venue?.trim() || !info?.trim() || !date_time?.trim() || !meet_id?.trim()) {
        return next(createError.BadRequest("Request body is missing"));
    }
      let sql = "insert into meetings(meeting_id, complaint_id, admin_id, venue, date_time, info) values (?, ?, ?, ?, ?, ?)";
      const values = [meet_id, complaint_id, admin_id, venue, date_time, info];
      db.query(sql,values,(err,result) => {
        if(err)return next(err);
        if(result.affectedRows == 0)return next(createError[400]);
        return res.send("meeting scheduled!");
      })
    }
    catch(error)
    {
        next(error);
    }
}