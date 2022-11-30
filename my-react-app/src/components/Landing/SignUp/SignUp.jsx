import React, { Component } from "react";
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
import { Navigate } from "react-router-dom";

let theme = createTheme();
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { // error text set to null makes the fields required
      accountName: "",
      accountNameErrorText: null,
      birthDate: "",
      birthErrorText: null,
      email: "",
      emailErrorText: null,
      phone: "",
      phoneErrorText: null,
      zip: "",
      zipErrorText: null,
      password1: "",
      password1ErrorText: null,
      password2: "",
      password2ErrorText: null,
      isLoggedIn: false,
    };

    this.handleAccountName = this.handleAccountName.bind(this);
    this.validateAccountName = this.validateAccountName.bind(this);
    this.handleBirthdate = this.handleBirthdate.bind(this);
    this.validateBirthdate = this.validateBirthdate.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.validateZip = this.validateZip.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAccountName(event) {
    this.setState({ accountName: event.target.value });
  }

  validateAccountName(event) {
    let accountNameRegex = /^[a-zA-Z]+[a-zA-Z0-9]*$/;
    if (accountNameRegex.test(this.state.accountName)) {
      this.setState({ accountNameErrorText: "" });
    } else if (this.state.accountName == "") {
      this.setState({ accountNameErrorText: "required field" });
    } else {
      this.setState({ accountNameErrorText: "invalid format" });
    }
  }

  handleBirthdate(event) {
    this.setState({ birthDate: event.target.value });
  }

  validateBirthdate(event) {
    let birth = this.state.birthDate.split("-");
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
      this.setState({ birthErrorText: "" });
    } else {
      this.setState({ birthErrorText: "age under 18" });
    }
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  validateEmail(event) {
    let emailRegex = /(\w+\.?\w*)\+?\w*@\w+\.?\w*\.[a-z]+/;
    if (emailRegex.test(this.state.email)) {
      this.setState({ emailErrorText: "" });
    } else if (this.state.email == "") {
      this.setState({ emailErrorText: "required field" });
    } else {
      this.setState({ emailErrorText: "invalid format" });
    }
  }

  handlePhone(event) {
    this.setState({ phone: event.target.value });
  }

  validatePhone(event) {
    let phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    if (phoneRegex.test(this.state.phone)) {
      this.setState({ phoneErrorText: "" });
    } else if (this.state.phone == "") {
      this.setState({ phoneErrorText: "required field" });
    } else {
      this.setState({ phoneErrorText: "invalid format" });
    }
  }

  handleZip(event) {
    this.setState({ zip: event.target.value });
  }

  validateZip(event) {
    let zipRegex = /[0-9]{5}/;
    if (zipRegex.test(this.state.zip)) {
      this.setState({ zipErrorText: "" });
    } else if (this.state.zip == "") {
      this.setState({ zipErrorText: "required field" });
    } else {
      this.setState({ zipErrorText: "invalid format" });
    }
  }

  handlePassword(event) {
    event.target.id == "password1"
      ? this.setState({ password1: event.target.value })
      : this.setState({ password2: event.target.value });
  }

  validatePassword(event) {
    if (this.state.password1 == this.state.password2) {
      this.setState({
        password1ErrorText: "",
        password2ErrorText: "",
      });
    } else if (this.state.password1 == "") {
      this.setState({
        password1ErrorText: "required field",
      });
    } else if (this.state.password2 == "") {
      this.setState({
        password2ErrorText: "required field",
      });
    } else {
      this.setState({
        password2ErrorText: "password do not match",
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    // check if username already exists
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        json.forEach((user) => {
          if (user.username == this.state.accountName) {
            console.log("eeeee")
            this.setState({ accountNameErrorText: "username already exists" });
          }
        });
      });

    // const data = new FormData(event.currentTarget);
    if (
      this.state.accountNameErrorText == "" &&
      this.state.birthErrorText == "" &&
      this.state.emailErrorText == "" &&
      this.state.phoneErrorText == "" &&
      this.state.zipErrorText == "" &&
      this.state.password1ErrorText == "" &&
      this.state.password2ErrorText == ""
    ) {
      this.setState({
        isLoggedIn: true,
      });

      let registeredUser = {
        username: this.state.accountName,
        address: {
          street: this.state.password1,
        },
        company: {
          catchPhrase: "This is a status headline",
        },
      };
      localStorage.setItem("userObject", JSON.stringify(registeredUser));
    } else {
      this.setState({
        isLoggedIn: false,
      });
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/main" />;
    } else {
      return (
        <div>
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={(event) => this.handleSubmit(event)}
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
                        value={this.state.accountName}
                        onChange={(event) => this.handleAccountName(event)}
                        onBlur={(event) => this.validateAccountName(event)}
                        helperText={this.state.accountNameErrorText}
                        error={
                          this.state.accountNameErrorText == "invalid format" ||
                          this.state.accountNameErrorText == "required field" ||
                          this.state.accountNameErrorText == "username already exists"
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
                        value={this.state.birthDate}
                        onChange={(event) => this.handleBirthdate(event)}
                        onBlur={(event) => this.validateBirthdate(event)}
                        helperText={this.state.birthErrorText}
                        error={this.state.birthErrorText == "age under 18"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={(event) => this.handleEmail(event)}
                        onBlur={(event) => this.validateEmail(event)}
                        helperText={this.state.emailErrorText}
                        error={
                          this.state.emailErrorText == "invalid format" ||
                          this.state.emailErrorText == "required field"
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
                        value={this.state.phone}
                        onChange={(event) => this.handlePhone(event)}
                        onBlur={(event) => this.validatePhone(event)}
                        helperText={this.state.phoneErrorText}
                        error={
                          this.state.phoneErrorText == "invalid format" ||
                          this.state.phoneErrorText == "required field"
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
                        value={this.state.zip}
                        onChange={(event) => this.handleZip(event)}
                        onBlur={(event) => this.validateZip(event)}
                        helperText={this.state.zipErrorText}
                        error={
                          this.state.zipErrorText == "invalid format" ||
                          this.state.zipErrorText == "required field"
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
                        value={this.state.password1}
                        onChange={(event) => this.handlePassword(event)}
                        onBlur={(event) => this.validatePassword(event)}
                        helperText={this.state.password1ErrorText}
                        error={
                          this.state.password1ErrorText == "required field" ||
                          this.state.password2ErrorText ==
                            "password do not match"
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
                        value={this.state.password2}
                        onChange={(event) => this.handlePassword(event)}
                        onBlur={(event) => this.validatePassword(event)}
                        helperText={this.state.password2ErrorText}
                        error={
                          this.state.password2ErrorText ==
                            "password do not match" ||
                          this.state.password2ErrorText == "required field"
                        }
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      );
    }
  }
}

export default SignUp;
