import React from "react";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Admin3_1() {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          width: "400px",
          maxHeight: "80vh",
          overflowY: "auto",
          margin: "auto",
          p: 2.5,
          boxShadow: 5,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px'
          }
        }}
        component="form"
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            '&:hover': {
              backgroundColor: '#f0f0f0'
            }
          }}
          onClick={() => navigate("/admin3")}
        >
          <CloseIcon />
        </IconButton>

        <Typography 
          variant="h6" 
          textAlign="center" 
          gutterBottom 
          sx={{ mb: 2, fontWeight: 500, fontFamily: "Tahoma", color: "#5A6387" }}
        >
          Create Meeting
        </Typography>

        <TextField
          size="small"
          label="Student ID"
          name="studentId"
          required
          fullWidth
          sx={{ mb: 1 }}
        />

        <TextField
          size="small"
          label="Venue"
          name="venue"
          required
          fullWidth
          sx={{ mb: 1 }}
        />

        <TextField
          size="small"
          label="Date"
          name="date"
          type="date"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 1 }}
        />

        <TextField
          size="small"
          label="Time"
          name="time"
          type="time"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 1 }}
        />

        <TextField
          size="small"
          label="Reason"
          name="reason"
          required
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px"
        }}>
          <Button
            type="button"
            variant="contained"
            color="error"
            sx={{
              width: "100px",
              borderRadius: "3px",
              textTransform: 'none',
              fontFamily: "tahoma",
              backgroundColor: "#FF5E5E"
            }}
          >
            Clear
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "100px",
              borderRadius: "3px",
              textTransform: 'none',
              fontFamily: "tahoma"
            }}
          >
            Create <i className="bi bi-plus-lg" style={{ marginLeft: "8px" }}></i>
          </Button>
        </div>
      </Box>
    </div>
  );
}
