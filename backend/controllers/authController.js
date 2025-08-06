const bycrypt = require("bycrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const db = require("../config/db");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

exports.login = (req, res) => {
    try{
        const {emailId, password} = req.body;
        if(!emailId.trim() || !password.trim()) {
         return createError(BadRequest, "EmailId or Password is missing!");
        }
        const sql = `select * from (
         select * from students where emailId = ? and password = ?
         union
         select * from faculties where emailId = ? and password = ?
         union 
         select * from admins where emaildId = ? and password = ?
        ) as all_matches limit 1`;
         
        const values = [emailId, password, emailId, password, emailId, password];
        db.query(sql,values,(error,result) => {
            if(error) {
                return createError(BadRequest,"An error occured",error);
            }
            if(result.length === 0){
                return createError(Unauthorized, "Invalid emailId or password");
            }
            const user = result[0];
            const token = jwt.sign({id: user.id},process.env.JWT_SECRET,{expiresIn: "1h"});
            res.cookie("token", token); 
            res.json({
                message: "login successful",
                "user_id":result.id,
                "user_name":result.name,
                "email_id":result.emailId,
            });
        })
    
    }
    catch(error){
        return res.send(error);
    }
    
}

exports.logout = (req,res,next) => {
    try{
      res.clearCookie('token',{httpOnly: true, secure: true, sameSite: 'Strict'})
      res.send('User logged out successfully!');
    }
    catch(error)
    {
      next(error);
    }
}