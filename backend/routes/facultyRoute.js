const express = require("express");
const router = express.Router();
const faculty = require("../controllers/facultyController");

router.delete("/faculty/send_to_admin/:complaint_id/:id",faculty.send_to_admin); // id -> faculty id
router.patch("/faculty/update_revoke_status/:complaint_id/:status",faculty.update_revoke_status);

module.exports = router;