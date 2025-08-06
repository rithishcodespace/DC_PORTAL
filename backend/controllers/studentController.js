const createError = require("http-errors");
const db = require("../config/db");

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

exports.submit_response = (req,res,next) => {
  try{
    const{id} = req.params;
    const{response} = req.body;
    if(id.trim() == "")return next(createError("id not present!"));
    if(response.trim() == "")return next(createError("student response not found!"));
    const resp_id = response_id;
    let sql = `insert into complaint_responses(response_id, complaint_id, student_id, response) 
    values ()`

  }
  catch(error)
  {
    next(error);
  }
}