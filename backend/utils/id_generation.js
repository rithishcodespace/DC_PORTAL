const db = require("../config/db");

async function complaint_id(){
   db.query("select count(*) from faculty_logger",(err,res) => {
        if(err)return res.send(err);
        return `C_${res}`;
   })
}

async function response_id(complaint_id){
    const num_part = complaint_id.split("_")[1];
    return `R_${num_part}`
}