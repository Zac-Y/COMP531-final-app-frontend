import React, { Component, useState } from "react";
import Button from "@mui/material/Button";
import { Typography, TextField, Grid } from "@mui/material";

function FriendStatus(props) {

  return (
    <div>
      <Typography align="center" sx={{ fontSize: 20 }} color="text.first">
        {/* Username */}
        {props.friendUsername}
      </Typography>
      <Typography align="center" sx={{ fontSize: 15 }} color="text.secondary">
        {/* message */}
        {props.friendStatus}
      </Typography>
    </div>
  );
}

export default FriendStatus;
