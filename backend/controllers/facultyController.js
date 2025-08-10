const db = require("../config/db");
const createError = require("http-errors");
const Tesseract = require("tesseract.js");
const{complaint_id} = require("../utils/id_generation");

// forwards serious complaints to admin
exports.send_to_admin = (req, res, next) => {
  try {
    const { complaint_id } = req.params;
    if (!complaint_id || complaint_id.trim() === "")
      return next(createError.BadRequest("complaint_id is required"));

    db.beginTransaction(err => {
      if (err) return next(err);

      // Insert into faculty_to_admin_issues
      const sql = `INSERT INTO faculty_to_admin_issues(complaint_id, date_time) VALUES(?, NOW())`;
      db.query(sql, [complaint_id], (err, result) => {
        if (err || result.affectedRows === 0) {
          return db.rollback(() => {
            next(err || createError.BadRequest("Failed to forward complaint"));
          });
        }

        // Update faculty_logger status
        const updateSql = `UPDATE faculty_logger SET status = ? WHERE complaint_id = ?`;
        db.query(updateSql, ['forwarded', complaint_id], (err, result) => {
          if (err || result.affectedRows === 0) {
            return db.rollback(() => {
              next(err || createError.BadRequest("Failed to update status"));
            });
          }

          // Commit transaction
          db.commit(err => {
            if (err) {
              return db.rollback(() => next(err));
            }
            res.json({ message: "Complaint forwarded to admin" });
          });
        });
      });
    });
  } catch (error) {
    next(error);
  }
};

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
    const{faculty_id} = req.params;
    const{complaint, venue} = req.body;
    if(!req.file)return next(createError.BadRequest('file not found!'));
    if(!complaint || !venue)return next(createError.BadRequest("complaint description or venue not found!"));
    // ocr
    const result = await Tesseract.recognize(req.file.path, 'eng', {
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

    if(!extractedData.register_number || extractedData.register_number.trim().length < 12) {
      return res.status(404).json({
          message: "Retake photo, image was not clear!"
      });
    }

    db.beginTransaction(err => {
      // fetch student details using his register number
      let sql = "select * from users where reg_num = ?";
      db.query(sql,[extractedData.register_number],async(err,user) => {
        if(err || user.length == 0){
          return db.rollback(() => {
            next(err || next(createError.NotFound("User not found!")))
          })
        }
        // insert complaint into faculty logger page
        const comp_id = await complaint_id();
        sql = "insert into faculty_logger(complaint_id, student_id, complaint, venue, faculty_id) values(?, ?, ?, ?, ?)";
        const values = [comp_id, user[0].user_id, complaint, venue, faculty_id];
        db.query(sql,values,(err1,result) => {
          if((err) || result.affectedRows == 0){
            return db.rollback(()=>{
              next(err1 || createError.BadRequest("An error occured while registering the complaint!"))
            })
          }
           db.commit(err => {
            if (err) {
              return db.rollback(() => next(err));
            }
            res.send('Complaint registered successfully!');
          });
          
        })
    }) 
    })

  }
  catch(error){
    next(error);
  }
}


