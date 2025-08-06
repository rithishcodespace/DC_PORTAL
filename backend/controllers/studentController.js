const createError = require("http-errors");
const db = require("../config/db");
const {response_id, complaint_id} = require("../utils/id_generation");

// Get all complaints for a student
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

// Submit a response to a complaint
exports.submit_response = async(req,res,next) => {
  try{
    const{id, complaint_id} = req.params; 
    const{response} = req.body;
    if(id.trim() == "")return next(createError("complaint_id not present!"));
    const resp_id = await response_id(complaint_id);
    if(response.trim() == "" || resp_id == "")return next(createError("student response or response_id not found!"));
    let sql = `insert into complaint_responses(response_id, complaint_id, student_id, response) values (?, ?, ?, ?)`;
    const values = [resp_id, complaint_id, id, response];
    db.query(sql, values, (err,result) => {
      if(err)next(err);
      console.log("SQL Values:", values);
      if(result.affectedRows == 0)return next("response not submitted!");
      return res.send("response submitted successfully!");
    })

  }
  catch(error)
  {
    next(error);
  }
}
