import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/mentor1.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";

const Mentor1 = () => {
  const [queue, setQueue] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [formData, setFormData] = useState({ S_ID: "", student_name: "" });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ success: true, message: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/mentor-queue").then((res) => {
      setQueue(res.data);
    });
  }, []);

  const handleYes = (complaint) => {
    setSelectedComplaint(complaint);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/mentor/submit", {
        complaint_id: selectedComplaint?.complaint_id,
        S_ID: formData.S_ID,
        student_name: formData.student_name,
      });

      setModalData({ success: true, message: "Student details submitted successfully!" });
      setModalOpen(true);
      setShowForm(false);
      setFormData({ S_ID: "", student_name: "" });
    } catch (err) {
      console.error("Submit failed:", err);
      setModalData({ success: false, message: "Failed to submit. Check console for error." });
      setModalOpen(true);
    }
  };

  return (
    <div className="mentor-page" style={{marginLeft: "120px"}}>
      <h2>Mentor</h2>

      <div className="cards-container">
        {queue.map((item, idx) => (
          <div key={idx} className="card">
            <video controls src={`http://localhost:5000/${item.video_path}`} />
            <div className="info">
              <p>Complaint ID: {item.complaint_id}</p>
              <button className="yes" onClick={() => handleYes(item)}>Yes</button>
              <button className="no">No</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="popup-form">
          {/* Close Icon with custom class */}
          <IconButton className="close-icon" onClick={() => setShowForm(false)}>
            <CloseIcon />
          </IconButton>

          <h4>Enter Student Details</h4>
          <input
            type="text"
            placeholder="Student Name"
            value={formData.student_name}
            onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={formData.S_ID}
            onChange={(e) => setFormData({ ...formData, S_ID: e.target.value })}
          />
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {/* Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Status</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          {modalData.success ? (
            <CheckCircleOutlineIcon className="modal-icon success" />
          ) : (
            <ErrorOutlineIcon className="modal-icon error" />
          )}
          <Typography sx={{ mt: 2 }}>{modalData.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} variant="contained">OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Mentor1;