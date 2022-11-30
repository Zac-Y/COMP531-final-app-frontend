import React, { Component } from "react";
import Button from "@mui/material/Button";
import { Typography, TextField, Grid } from "@mui/material";

class UserStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: JSON.parse(localStorage.getItem("userObject")).username,
      status:
        localStorage.getItem("updatedStatus") == null
          ? JSON.parse(localStorage.getItem("userObject")).company.catchPhrase
          : localStorage.getItem("updatedStatus"),
      inputStatus: "",
    };
  }

  updateStatus() {
    this.setState({
      status: this.state.inputStatus,
    });
    localStorage.setItem("updatedStatus", this.state.inputStatus);
  }

  readStatus(event) {
    this.setState({
      inputStatus: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Typography align="center" sx={{ fontSize: 20 }} color="text.first">
          {this.state.username}
        </Typography>
        <Typography align="center" sx={{ fontSize: 15 }} color="text.secondary">
          {this.state.status}
        </Typography>

        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              onChange={(event) => this.readStatus(event)}
              name="status"
              id="status"
              label="New Status"
              size="small"
              value={this.state.inputStatus}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                this.updateStatus();
              }}
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserStatus;
