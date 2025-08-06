const express = require("express");
const router = express.Router();

router.get("/student/get_complaints/:id",get_complaints);
router.post("/student/submit_response/:id/:",submit_response);