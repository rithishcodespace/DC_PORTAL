const express = require("express");
const router = express.Router();
const student = require("../controllers/studentController");

router.get("/student/get_complaints/:id",student.get_complaints);
router.post("/student/submit_response/:complaint_id/:id",student.submit_response);

module.exports = router;