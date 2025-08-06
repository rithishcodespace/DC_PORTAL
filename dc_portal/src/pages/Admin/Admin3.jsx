import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export default function Admin3() {
  const navigate = useNavigate();
  return (
    <div style={{ marginLeft: "120px", padding: "40px", marginBottom: "370px" }}>
  <Typography
    variant="h6"
    sx={{
      fontFamily: "tahoma",
      fontWeight: 600,
      fontSize: "2.3rem",
      marginBottom: "30px",
      color: "#555555",
      textAlign: "left",
    }}
  >
    Activities
  </Typography>
  

  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "80px",
      flexWrap: "wrap",
    }}
  >
    {/* <Button
      onClick={() => navigate("/admin3_1")}
      variant="contained"
      disableElevation
      sx={{
      backgroundColor: "#F5F5F5",
      color: "inherit", 
      textTransform: "none",
      fontFamily: "sans-serif",
      fontSize: "1rem",
      fontWeight: 400,
      width: "280px",
      height: "60px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "none",
      "&:hover": {
      backgroundColor: "#E7E5E2",
    },
  }}
>
  <Typography
    sx={{
      fontFamily: "sans-serif",
      fontSize: "1.1rem",
      fontWeight: 400,
      color: "black", 
    }}
  >
    Create a meeting
  </Typography>
  <ArrowForwardIosIcon
    sx={{
      fontSize: "1rem",
      marginLeft: "40px",
      color: "black", 
    }}
  />
</Button> */}


    <Button
      onClick={() => navigate("/admin3_2")}
      variant="contained"
      disableElevation
      sx={{
        backgroundColor: "#F5F5F5",
        color: "#555555",
        textTransform: "none",
        fontFamily: "sans-serif",
        fontSize: "1rem",
        fontWeight: 400,
        width: "280px",         
        height: "60px",         
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "0px",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#E7E5E2",
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: "sans-serif",
          fontSize: "1.1rem",
          fontWeight: 400,
          color: "black",
        }}
      >
        Scheduled meetings
      </Typography>
      <ArrowForwardIosIcon
        sx={{
          fontSize: "1rem",
          marginLeft: "30px",
          color: "black",
        }}
      />
    </Button>
  </Box>
</div>


  );
}