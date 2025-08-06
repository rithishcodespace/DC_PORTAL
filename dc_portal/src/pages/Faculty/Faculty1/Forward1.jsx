import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Grid,
} from "@mui/material";

// Slide transition for modal
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Forward1 = () => {
  const [logs, setLogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/faculty-logger")
      .then((res) => {
        setLogs(res.data);
      })
      .catch(() => {
        setModalMessage("Failed to fetch logs.");
        setModalOpen(true);
      });
  }, []);

  const handleSend = (log) => {
    const payload = {
      student_name: log.student_name,
      S_ID: log.S_ID,
      Date_: log.time_date.split("T")[0],
      Time_: log.time_date.split("T")[1].slice(0, 8),
      Venue: log.venue,
      Comment: log.comment,
      faculty: log.faculty_name,
    };

    axios
      .post("http://localhost:5000/send-to-admin", payload)
      .then(() => {
        setModalMessage("Sent to admin successfully!");
        setModalOpen(true);
      })
      .catch(() => {
        setModalMessage("Failed to send complaint.");
        setModalOpen(true);
      });
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ marginTop: "80px", marginLeft: "25px"}}>
    <Box sx={{ p: 4, ml: { xs: '70px', sm: '70px' } }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" ,marginTop: "0px", marginLeft:"300px"}}>
        Forward Complaints to Admin
      </Typography>

      {logs.length === 0 ? (
        <Typography>No complaints found.</Typography>
      ) : (
        <Grid container spacing={3} >
          {logs.map((log) => (
            <Grid item xs={12} sm={6} md={4} key={log.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    ID: {log.complaint_id}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {log.student_name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Date & Time:</strong> {log.time_date}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Venue:</strong> {log.venue}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Comment:</strong> {log.comment}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={() => handleSend(log)}
                >
                  Send to Admin
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Animated Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  );
};

export default Forward1;