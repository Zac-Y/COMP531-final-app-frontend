import React, { Component } from "react";
import Button from "@mui/material/Button";
import { Typography, TextField, Grid } from "@mui/material";

export class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: "",
    };
  }

  readName(event) {
    this.setState({
      inputName: event.target.value,
    });
  }

  clickHandler() {
    this.props.add(this.state.inputName);
  }

  render() {
    return (
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <TextField
            onChange={(event) => this.readName(event)}
            value={this.state.inputName}
            name="user"
            id="user"
            label="User"
            size="small"
          />
        </Grid>
        <Grid item>
          <Button
            onClick={() => this.clickHandler()}
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default AddFriend;