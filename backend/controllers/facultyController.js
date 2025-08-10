const db = require("../config/db");
const createError = require("http-errors");
const Tesseract = require("tesseract.js");

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

// posts complaint
exports.post_complaint = async(req,res,next) => {
  try{
    const{file, complaint} = req.body;
    if(!file)return next(createError.BadRequest('file not found!'));
    if(!complaint)return next(createError.BadRequest("complaint not found!"));
    // ocr
    const result = await Tesseract.recognize(file.path, 'eng', {
      logger: info => console.log(info) // ocr process logging
    });

    const rawText = result.data.text;
    // Regex extraction
    const nameMatch = rawText.match(/^[A-Z\s]+$/m);
    const regMatch = rawText.match(/\d{7}[A-Z]{2}\d{3}/);
    const deptMatch = rawText.match(/CSE|ECE|EEE|MECH|FD|FT|CB|AD|AL|BT|ISE|AG|EIE/);

    const extractedData = {
      name: nameMatch ? nameMatch[0] : null,
      register_number: regMatch ? regMatch[0] : null,
      dept: deptMatch ? deptMatch[0] : null
    };

    if(extractedData.register_number.trim().length < 12)res.status(404).json({
      message : "retake photo, image was not clear!"
    })

    // fetch student details using his register number
    let sql = "select * from users where reg_num = ?";
    db.query(sql,[extractedData.register_number],(err,user) => {
      if(err)return next(err);
      if(result.length == 0)return next(createError[404]);
      if(user.length == 0)return next(createError.NotFound("User not found!"));
      // insert complaint into faculty logger page
      

    })

  }
  catch(error){
    next(error);
  }
}


