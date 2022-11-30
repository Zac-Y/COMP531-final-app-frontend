import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { Grid } from "@mui/material";
import Icon from "../Icon/Icon";

function Landing() {
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
