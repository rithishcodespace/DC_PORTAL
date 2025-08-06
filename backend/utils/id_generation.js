const db = require("../config/db");

exports.complaint_id = () => {
  return new Promise((resolve, reject) => {
    // MySQL will generate a unique UUID and prefix with C_
    db.query("SELECT CONCAT('C_', UUID()) AS complaint_id", (err, result) => {
      if (err) return reject(err);
      resolve(result[0].complaint_id);
    });
  });
};


exports.response_id = async(complaint_id) => {
    const num_part = complaint_id.split("_")[1];
    return `R_${num_part}`
}

exports.meeting_id = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT CONCAT('MEET_', UUID_SHORT()) AS meeting_id", (err, result) => {
      if (err) return reject(err);
      resolve(result[0].meeting_id);
    });
  });
};
