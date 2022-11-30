import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Main from "../Main/Main";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function InfoUpdator(props) {
  const [accountName, setAccountName] = useState("");
  function handleAccountName(event) {
    setAccountName(event.target.value);
  }

  const [accountNameErrorText, setAccountNameErrorText] = useState();
  function validateAccountName(event) {
    let accountNameRegex = /^[a-zA-Z]+[a-zA-Z0-9]*$/;
    if (accountNameRegex.test(accountName)) {
      setAccountNameErrorText("");
    } else if (accountName == "") {
      setAccountNameErrorText("required field");
    } else {
      setAccountNameErrorText("invalid format");
    }
  }

  const [birthDate, setBirthDate] = useState("");
  function handleBirthdate(event) {
    setBirthDate(event.target.value);
  }

  const [birthErrorText, setBirthErrorText] = useState();
  function validateBirthdate(event) {
    let birth = birthDate.split("-");
    let year = birth[0];
    let month = birth[1];
    let day = birth[2];

    let today = new Date();
    let age = today.getFullYear() - parseInt(year);
    let m = today.getMonth() + 1 - parseInt(month); // Date.getMonth() starts from 0
    let d = today.getDate() - parseInt(day);

    if (m < 0 || (m === 0 && d < 0)) {
      age--;
    }

    if (age >= 18) {
      setBirthErrorText("");
    } else {
      setBirthErrorText("age under 18");
    }
  }

  const [email, setEmail] = useState("");
  function handleEmail(event) {
    setEmail(event.target.value);
  }

  const [emailErrorText, setEmailErrorText] = useState();
  function validateEmail(event) {
    let emailRegex = /(\w+\.?\w*)\+?\w*@\w+\.?\w*\.[a-z]+/;
    if (emailRegex.test(email)) {
      setEmailErrorText("");
    } else if (email == "") {
      setEmailErrorText("required field");
    } else {
      setEmailErrorText("invalid format");
    }
  }

  const [phone, setPhone] = useState("");
  function handlePhone(event) {
    setPhone(event.target.value);
  }

  const [phoneErrorText, setPhoneErrorText] = useState();
  function validatePhone(event) {
    let phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    if (phoneRegex.test(phone)) {
      setPhoneErrorText("");
    } else if (phone == "") {
      setPhoneErrorText("required field");
    } else {
      setPhoneErrorText("invalid format");
    }
  }

  const [zip, setZip] = useState("");
  function handleZip(event) {
    setZip(event.target.value);
  }

  const [zipErrorText, setZipErrorText] = useState();
  function validateZip(event) {
    let zipRegex = /[0-9]{5}/;
    if (zipRegex.test(zip)) {
      setZipErrorText("");
    } else if (zip == "") {
      setZipErrorText("required field");
    } else {
      setZipErrorText("invalid format");
    }
  }

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  function handlePassword(event) {
    event.target.id == "password1"
      ? setPassword1(event.target.value)
      : setPassword2(event.target.value);
  }

  const [password1ErrorText, setPassword1ErrorText] = useState();
  const [password2ErrorText, setPassword2ErrorText] = useState();
  function validatePassword(event) {
    if (password1 == password2) {
      setPassword1ErrorText("");
      setPassword2ErrorText("");
    } else if (password1 == "") {
      setPassword1ErrorText("required field");
    } else if (password2 == "") {
      setPassword2ErrorText("required field");
    } else {
      setPassword2ErrorText("password do not match");
    }
  }

  // const [dddd, setDDDD] = useState();
  let navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      accountNameErrorText == "" &&
      birthErrorText == "" &&
      emailErrorText == "" &&
      phoneErrorText == "" &&
      zipErrorText == "" &&
      password1ErrorText == "" &&
      password2ErrorText == ""
    ) {
      props.setInfo({
        name: accountName,
        email: email, 
        phone: phone,
        zip: zip
      });
      // navigate("/main");
    }
  }

  // const ctp = () => {
  //   setDDDD("This is data from Child Component to the Parent Component.");
  // }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update Info
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="accountName"
                  required
                  fullWidth
                  id="accountName"
                  label="Account Name"
                  onChange={handleAccountName}
                  onBlur={validateAccountName}
                  helperText={accountNameErrorText}
                  error={
                    accountNameErrorText == "invalid format" ||
                    accountNameErrorText == "required field"
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  name="displayNamee"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="date"
                  label="Birthday"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={birthDate}
                  onChange={handleBirthdate}
                  onBlur={validateBirthdate}
                  helperText={birthErrorText}
                  error={birthErrorText == "age under 18"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  onBlur={validateEmail}
                  helperText={emailErrorText}
                  error={
                    emailErrorText == "invalid format" ||
                    emailErrorText == "required field"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={handlePhone}
                  onBlur={validatePhone}
                  helperText={phoneErrorText}
                  error={
                    phoneErrorText == "invalid format" ||
                    phoneErrorText == "required field"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="zip"
                  label="Zipcode"
                  name="zip"
                  value={zip}
                  onChange={handleZip}
                  onBlur={validateZip}
                  helperText={zipErrorText}
                  error={
                    zipErrorText == "invalid format" ||
                    zipErrorText == "required field"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Password"
                  type="password"
                  id="password1"
                  value={password1}
                  onChange={handlePassword}
                  onBlur={validatePassword}
                  helperText={password1ErrorText}
                  error={
                    password1ErrorText == "required field" ||
                    password2ErrorText == "password do not match"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  value={password2}
                  onChange={handlePassword}
                  onBlur={validatePassword}
                  helperText={password2ErrorText}
                  error={
                    password2ErrorText == "password do not match" ||
                    password2ErrorText == "required field"
                  }
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // href={getLogIn() ? "main" : "profile"}
              // href={"main"}
            >
              Update
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
export default InfoUpdator;
