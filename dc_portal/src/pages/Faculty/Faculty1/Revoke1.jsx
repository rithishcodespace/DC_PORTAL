import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/revoke1.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Revoke1 = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [expandedCard, setExpandedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: null, message: "" });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/revoked");
      console.log("Fetched Complaints:", response.data); // Debugging: Log fetched complaints
      const validComplaints = response.data.filter((c) => c.Roll_no); // Filter out complaints with null Roll_no
      setComplaints(validComplaints);
      applyFilter(validComplaints); // Trigger applyFilter after fetching complaints
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const applyFilter = (complaintsToFilter = complaints) => {
    console.log("Applying Filter:", filter); // Debugging: Log the selected filter
    console.log("Complaints Before Filtering:", complaintsToFilter); // Debugging: Log complaints before filtering

    let filtered = [];
    if (filter === "All") {
      filtered = complaintsToFilter;
    } else if (filter === "Pending") {
      filtered = complaintsToFilter.filter((c) => !c.STATUS_);
    } else {
      filtered = complaintsToFilter.filter((c) => c.STATUS_ === filter);
    }

    console.log("Filtered Complaints:", filtered); // Debugging: Log filtered complaints
    setFilteredComplaints(filtered);
  };

  const updateStatus = async (complaint_id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/revoked/${complaint_id}`, {
        status,
      });
      setModalContent({
        icon:
          status === "Accepted" ? (
            <CheckCircleIcon className="modal-icon accepted" />
          ) : (
            <CancelIcon className="modal-icon declined" />
          ),
        message: `Complaint ${status}!`,
      });
      setModalOpen(true);
      fetchComplaints();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleCardClick = (complaint_id) => {
    setExpandedCard((prev) => (prev === complaint_id ? null : complaint_id));
  };

  return (
    <div className="revoke-container" style={{ marginTop: "110px" }}>
      <h2>Revoked Complaints</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Accepted", "Declined", "pending"].map((type) => (
          <button
            key={type}
            className={filter === type ? "filter-btn active" : "filter-btn"}
            onClick={() => {
              setFilter(type);
              applyFilter(); // Trigger applyFilter when filter changes
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="revoke-grid" style={{ marginLeft: "50px" }}>
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.complaint_id || complaint.Roll_no} // Use complaint_id as fallback key
            className={`revoke-card ${
              complaint.STATUS_?.toLowerCase() || "pending"
            } ${expandedCard === complaint.complaint_id ? "expanded" : ""}`}
            onClick={() => handleCardClick(complaint.complaint_id)}
          >
            <div className="revoke-card-header">
              <p>
                <strong>Name:</strong> {complaint.student_name}
              </p>
              <p>
                <strong>Register Number:</strong> {complaint.Roll_no}
              </p>
              {expandedCard === complaint.complaint_id && (
                <p>
                  <strong>Reason:</strong> {complaint.REASON}
                </p>
              )}
            </div>

            {complaint.STATUS_ && expandedCard !== complaint.complaint_id ? (
              <p
                className={`status-text ${
                  complaint.STATUS_ === "Accepted" ? "accepted" : "declined"
                }`}
              >
                {complaint.STATUS_}
              </p>
            ) : null}

            {complaint.STATUS_ === "pending" &&
              expandedCard === complaint.complaint_id && (
                <div className="button-group">
                  <button
                    className="accept-btn action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(complaint.complaint_id, "Accepted");
                    }}
                  >
                    ACCEPT
                  </button>
                  <button
                    className="decline-btn action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(complaint.complaint_id, "Declined");
                    }}
                  >
                    DECLINE
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Status Update</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          {modalContent.icon}
          <Typography variant="h6" sx={{ mt: 2 }}>
            {modalContent.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Revoke1;
