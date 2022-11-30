import React from "react";
import { Button } from "@mui/material";

function UpdateButton() {
  return (
    <Button variant="contained" sx={{ mt: 3, mb: 2 }} component="label">
      Upload new picture
      <input type="file" hidden />
    </Button>
  );
}

export default UpdateButton;
