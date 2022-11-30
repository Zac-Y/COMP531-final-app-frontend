import React from "react";
import { Avatar, Button } from "@mui/material";
import { Grid } from "@mui/material";
import UpdateButton from "./UpdateButton";

function AvatarUpdator() {
  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Avatar
          alt="Remy Sharp"
          // src="/static/images/avatar/1.jpg"
          sx={{ width: 100, height: 100 }}
        />
        <UpdateButton />
      </Grid>
    </div>
  );
}

export default AvatarUpdator;
