import React, { Component } from "react";
import FriendStatus from "./FriendStatus";
import AddFriend from "./AddFriend";
import { Avatar, Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";

export class Friend extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.allFriends);
    this.state = {};
  }

  clickHandler(event) {
    let parentIndex = event.target.parentNode.getAttribute('id')
    this.props.delete(parentIndex)
  }

  render() {
    return (
      <div>
        <Grid
          container
          spacing={1}
          direction="column"
          sx={{ height: "100%", width: "25%" }}
          justifyContent="center"
          alignItems="center"
        >
          {this.props.allFriends.map((friend, index) => {
            return (
              <Grid item key={index} id={index}>
                <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }} />

                <FriendStatus
                  friendUsername={friend.username}
                  friendStatus={friend.company.catchPhrase}
                />
                <Button
                  onClick={(event) => this.clickHandler(event)}
                  type="submit"
                  variant="outlined"
                  sx={{ mt: 1, mb: 1 }}
                >
                  Unfollow
                </Button>
              </Grid>
            );
          })}

          <Grid item>
            <AddFriend add={this.props.add} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Friend;
