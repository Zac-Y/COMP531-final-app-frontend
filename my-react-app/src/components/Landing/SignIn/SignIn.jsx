import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";

let theme = createTheme();
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountName: "",
      accountNameErrorText: "",
      password: "",
      passwordErrorText: "",
      isLoggedIn: false,
    };

    this.handleAccountName = this.handleAccountName.bind(this);
    this.validateAccountName = this.validateAccountName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit (event) {
  //   event.preventDefault();
  //   let data = new FormData(event.currentTarget);

  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       let loggedUser;
  //       json.forEach((user) => {
  //         let curAccount = data.get("account");
  //         let curPassword = data.get("password");
  //         if (
  //           user.username == curAccount &&
  //           user.address.street == curPassword
  //         ) {
  //           loggedUser = user;
  //           localStorage.setItem("userObject", JSON.stringify(loggedUser));
  //           // let navigate = useNavigate();
  //           // navigate("/main");
  //           this.setState({
  //             isLoggedIn: true
  //           })
  //         } else {
  //           this.setState({
  //             isLoggedIn: false
  //           })
  //         }
  //       });
  //     });
  // };

  handleSubmit(event) {
    event.preventDefault();
    const url = (path) => `http://localhost:3000${path}`;
    let data = new FormData(event.currentTarget);

    let loginedUser = {
      // needed for backend
      username: this.state.accountName,
      password: this.state.password,
    };

    let localLoginedUser = {
      // needed for original front end design
      username: this.state.accountName,
      address: {
        street: this.state.password,
      },
      company: {
        catchPhrase: "This is a status headline",
      },
    };

    fetch(url("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginedUser),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result === "failure-not-registered") {
          this.setState({
            isLoggedIn: false,
          });
          this.setState({ accountNameErrorText: "username does not exist" });
        }

        if (res.result === "failure-password-incorrect") {
          this.setState({
            isLoggedIn: false,
          });
          this.setState({ passwordErrorText: "password is incorrect" });
        }

        if (res.result === "success") {
          this.setState({
            isLoggedIn: true,
          });
          localStorage.setItem("userObject", JSON.stringify(localLoginedUser));
        }
      });
  }

  handleAccountName(event) {
    this.setState({
      accountName: event.target.value,
    });
  }

  validateAccountName(event) {
    let accountNameRegex = /^[a-zA-Z]+[a-zA-Z0-9]*$/;
    if (accountNameRegex.test(this.state.accountName)) {
      this.setState({
        accountNameErrorText: "",
      });
    } else if (this.state.accountName == "") {
      this.setState({
        accountNameErrorText: "required field",
      });
    } else {
      this.setState({
        accountNameErrorText: "invalid format",
      });
    }
  }

  handlePassword(event) {
    // this.setState({
    //   password: event.target.value
    // }, () => console.log(this.state.password))
    this.setState({
      password: event.target.value,
    });
  }

  validatePassword(event) {
    // console.log("validate: " + this.state.password)
    if (this.state.password == "") {
      this.setState({
        passwordErrorText: "required field",
      });
    } else {
      this.setState({
        passwordErrorText: "",
      });
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/main" />;
    } else {
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={(event) => this.handleSubmit(event)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="account"
                  label="Account Name"
                  name="account"
                  autoFocus
                  value={this.state.accountName}
                  onChange={(event) => this.handleAccountName(event)}
                  onBlur={(event) => this.validateAccountName(event)}
                  helperText={this.state.accountNameErrorText}
                  error={
                    this.state.accountNameErrorText == "invalid format" ||
                    this.state.accountNameErrorText == "required field" ||
                    this.state.accountNameErrorText == "username does not exist"
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={(event) => this.handlePassword(event)}
                  onBlur={(event) => this.validatePassword(event)}
                  helperText={this.state.passwordErrorText}
                  error={
                    this.state.passwordErrorText == "required field" ||
                    this.state.passwordErrorText == "password is incorrect"
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
    }
  }
}

export default SignIn;
