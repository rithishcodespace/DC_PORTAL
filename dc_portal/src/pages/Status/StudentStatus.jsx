import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography, MenuItem, Select } from "@mui/material";

const StudentStatus = () => {
  const [student, setStudent] = useState({ roll_no: "S1001", name: "John Doe" }); 
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState("");
  const [revokeReason, setRevokeReason] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/logger/${student.roll_no}`);
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints", err);
    }
  };

  const handleRevokeComplaint = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/revoked", {
        roll_no: student.roll_no,
        s_name: student.name,
        reason: revokeReason,
        complaint_id: selectedComplaintId,
      });

      alert("Revoked complaint submitted successfully!");
      setSelectedComplaintId("");
      setRevokeReason("");
    } catch (error) {
      console.error("Error submitting revoke complaint:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Revoke Complaint</Typography>

      {/* Complaint Dropdown */}
      <Select
        fullWidth
        value={selectedComplaintId}
        onChange={(e) => setSelectedComplaintId(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>Select a complaint</MenuItem>
        {complaints.map((c) => (
          <MenuItem key={c.complaint_id} value={c.complaint_id}>
            {c.complaint_id} - {c.comment}
          </MenuItem>
        ))}
      </Select>

      {/* Reason */}
      <TextField
        label="Reason to Revoke"
        fullWidth
        multiline
        rows={4}
        value={revokeReason}
        onChange={(e) => setRevokeReason(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        disabled={!selectedComplaintId || !revokeReason}
        onClick={handleRevokeComplaint}
      >
        Submit Revoke Request
      </Button>
    </Box>
  );
};

export default StudentStatus;