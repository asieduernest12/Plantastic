import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../src/App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Copyright from "../components/Copyright";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
    validatePassword: "",
  });
  const [disabled, setDisabled] = useState(true);

  const [createUser, { loading }] = useMutation(ADD_USER, {
    onError: (e) => {
      /* TO DO: add error handling */
      console.error(e.message);
    },
    onCompleted: ({ userdata }) => {
      console.log({ userdata, user: userdata.user, token: userdata.token });
      Auth.login(userdata.token);
      navigate("/");
    },
  });

  useEffect(() => {
    // Checks user password input against regex, returns boolean
    function isValidPassword(password) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{6,}$/;
      return passwordRegex.test(password);
    }
    // Checks user email input against regex, returns boolean
    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }

    /* If password meets regex, and email meets regex, and pass === validate pass return true, else false  */
    const valid =
      signUpForm.username.length > 0 &&
      isValidPassword(signUpForm.password) &&
      signUpForm.password === signUpForm.validatePassword &&
      isValidEmail(signUpForm.email);
    /* sets state value to disable button */
    setDisabled(!valid);
  }, [signUpForm]);

  function handleChange(event) {
    return setSignUpForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit() {
    createUser({ variables: { ...signUpForm } });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {!loading && (
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
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="validatePassword"
                    label="Retype Password"
                    type="password"
                    id="validatePassword"
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                disabled={disabled}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "darkgreen" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/login" variant="body2">
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        {loading && (
          <div>
            <i className="fa-solid fa-seedling fa-bounce"></i>Loading...
          </div>
        )}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

// const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
