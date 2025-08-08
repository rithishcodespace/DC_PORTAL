const express = require("express");
const router = express.Router();
const student = require("../controllers/studentController");

router.get("/student/get_complaints/:id",student.get_complaints); // can be also used to display revoke status
router.patch("/student/revoke_complaint/:complaint_id/:student_id",student.revoke_complaint);

module.exports = router;