import React, {useState} from "react";
import Icon from "../Icon/Icon";
import { Grid, Button } from "@mui/material";
import InfoUpdator from "./InfoUpdator";
import AvatarUpdator from "./AvatarUpdator";
import InfoCurrent from "./InfoCurrent";

function Profile() {
    const loggedUser = JSON.parse(localStorage.getItem("userObject"));
    const[info, setInfo] = useState({
        name: loggedUser.username,
        email: loggedUser.email,
        phone: loggedUser.phone,
        zip: loggedUser.address.zipcode
    });
  return (
    <div>
      <Button variant="contained" href="/main">Main Page</Button>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Icon />
        </Grid>
        <Grid item xs={8}>
          <AvatarUpdator />
        </Grid>
        <Grid item xs={8}>
          <InfoUpdator setInfo={setInfo}/>
        </Grid>
        <Grid item xs={8}>
          <InfoCurrent info={info}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
