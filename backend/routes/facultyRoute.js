const express = require("express");
const router = express.Router();
const faculty = require("../controllers/facultyController");

router.delete("/faculty/send_to_admin/:complaint_id/:id",faculty.send_to_admin); // id -> faculty id

module.exports = router;