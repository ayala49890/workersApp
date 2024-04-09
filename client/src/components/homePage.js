import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Grid, Paper } from "@mui/material";
import logo from "../images/logo.png";

const HomePage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${logo})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        maskRepeat: "no-repeat",
        opacity: 0.7,
      }}
    >
      <Grid item xs={10} sm={8} md={6}>
        <Paper
          elevation={3}
          style={{ padding: 20, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            ברוך הבא למערכת ניהול עובדים
          </Typography>
          <Typography variant="body1" paragraph align="center">
            כאן תוכל לנהל את רשימת העובדים שלך, לערוך אותם, להוסיף עובדים חדשים
            ולנהל את תפקידיהם.
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/home"
              >
                כניסה
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomePage;
