import React, { Component, useState } from "react";
import UserStatus from "./UserStatus";
import { Grid, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function UserProfile() {
  let navigate = useNavigate();

  return (
    <Grid
      container
      sx={{ height: "100%", width: "25%" }}
      justifyContent="flex-end"
    >
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item>
          <Button
            onClick={() => {
              localStorage.setItem("userObject", null);
              // localStorage.setItem("friends", JSON.stringify([]));
              // localStorage.clear();
            }}
            variant="contained"
            href="/"
            style={{ textAlign: "left" }}
          >
            Log Out
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => {
            navigate("/profile");
          }}>
            Profile
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item>
          <UserStatus />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
