import React from "react";
import { CardContent, Grid, Typography } from "@mui/material";

function InfoCurrent(props) {
    return (
        <div>
            <Grid container s="center" justifyContent="center">
            <CardContent>
              <Typography sx={{ fontSize: 30 }} color="text.first">
                Current Info
              </Typography>
              <Typography sx={{ fontSize: 25 }} color="text.secondary">
                {props.info.name}
              </Typography>
              <Typography sx={{ fontSize: 25 }} color="text.secondary">
                {/* Email: {this.state.email} */}
                {props.info.email}
              </Typography>
              <Typography sx={{ fontSize: 25 }} color="text.secondary">
                {/* Phone: {this.state.phone} */}
                {props.info.phone}
              </Typography>
              <Typography sx={{ fontSize: 25 }} color="text.secondary">
                {/* Zipcode: {this.state.zipcode} */}
                {props.info.zip}
              </Typography>
            </CardContent>
          </Grid>
        </div>
    )
}

export default InfoCurrent;