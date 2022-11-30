import React, { Component } from "react";
import { Grid, Typography } from "@mui/material";
import logo from "./Icon.png";
import "./Icon.css";

export default class Icon extends Component {
  render() {
    return (
      <div>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <img src={logo} alt="Icon"></img>
          </Grid>
          <Grid item>
            <Grid>
              <Typography variant="h4">Welcome to Ricebook!</Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">Online platform for students</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
