const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");

router.post("/admin/schedule_meetings/:complaint_id/:admin_id",admin.schedule_meeting); // admin id

module.exports = router