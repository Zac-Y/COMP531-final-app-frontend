import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { Grid } from "@mui/material";
import Icon from "../Icon/Icon";

function Landing() {
  function checkConnection() {
    console.log("innnnnnnnnnnnn");
    fetch("http://localhost:3000/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((responese) => {
        return responese.json();
      })
      .then((data) => console.log(data));
  }

  checkConnection();

  return (
    <div>
      <Icon />
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={4} alignItems="center">
          <SignUp />
        </Grid>
        <Grid item xs={4} alignItems="center">
          <SignIn />
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
