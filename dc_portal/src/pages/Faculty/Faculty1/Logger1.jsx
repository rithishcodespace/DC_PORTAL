import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Fade,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useFacultyStore from "../../../store/useFacultyStore";

const Logger1 = () => {
  const { students, fetchStudents, createLog } = useFacultyStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [SID, setSID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [facultyName, setFacultyName] = useState("");

  const [timeDate, setTimeDate] = useState("");
  const [comment, setComment] = useState("");
  const [venue, setVenue] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ success: true, message: "" });

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents([]);
    } else {
      setFilteredStudents(
        students.filter((student) =>
          (student?.S_ID?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (student?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, students]);

  const handleSelectStudent = (student) => {
    setSID(student.S_ID);
    setStudentName(student.name);
    setSearchTerm("");
    setFilteredStudents([]);
  };

  const handleSubmit = () => {
    if (!facultyName || !timeDate || !comment || !venue) {
      setModalData({ success: false, message: "All fields are required" });
      setModalOpen(true);
      return;
    }

    createLog({
      S_ID: SID,
      student_name: studentName,
      faculty_name: facultyName,
      time_date: timeDate,
      comment,
      venue,
    });

    setModalData({ success: true, message: "Log created successfully!" });
    setModalOpen(true);

    // Reset form
    setSID("");
    setStudentName("");
    setFacultyName("");
    setTimeDate("");
    setComment("");
    setVenue("");
    setShowForm(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", 
        background: "#f9f9f9",
        position: "relative",
        marginLeft: "100px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(true)}
        sx={{
          position: "fixed",
          top: 100,
          right: 40,
          zIndex: 1000,
        }}
      >
        + CREATE
      </Button>

      {showForm && (
        <div style={{ marginTop: "50px", marginBottom: "20px"}}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            minHeight: "calc(100vh - 64px)",
            justifyContent: "center", 
            alignItems: "center",
            marginLeft: "200px",
            mt: 8,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 600,
              borderRadius: 4,
              /* marginTop: "-70px",  */
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
              Create Log Entry
            </Typography>

            <TextField
              label="Search Student"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete="off"
            />

            {filteredStudents.length > 0 && (
              <Paper
                elevation={3}
                sx={{
                  mb: 2,
                  maxHeight: 150,
                  overflowY: "auto",
                  backgroundColor: "#fff",
                }}
              >
                {filteredStudents.map((student) => (
                  <Fade in key={student.S_ID}>
                    <Box
                      sx={{
                        p: 1,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                      onClick={() => handleSelectStudent(student)}
                    >
                      {student.S_ID} - {student.name}
                    </Box>
                  </Fade>
                ))}
              </Paper>
            )}

            <TextField label="Register Number" fullWidth value={SID} disabled sx={{ mb: 2 }} />
            <TextField label="Student Name" fullWidth value={studentName} disabled sx={{ mb: 2 }} />
            <TextField
              label="Faculty Name"
              fullWidth
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              type="datetime-local"
              fullWidth
              value={timeDate}
              onChange={(e) => setTimeDate(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Comment"
              multiline
              rows={3}
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Venue"
              fullWidth
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </Box>
          </Paper>
        </Box>
        </div>
      )}

      {/* Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Status</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          {modalData.success ? (
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "#4caf50", animation: "pop 0.3s ease" }}
            />
          ) : (
            <ErrorOutlineIcon
              sx={{ fontSize: 60, color: "#f44336", animation: "pop 0.3s ease" }}
            />
          )}
          <Typography sx={{ mt: 2 }}>{modalData.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setModalOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Logger1;