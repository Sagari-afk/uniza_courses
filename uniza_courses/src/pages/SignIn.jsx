import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/header";
import Container from "@mui/material/Container";
import classes from "../styles/HomePage.module.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const SignIn = ({ theme }) => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container className={classes.Body}>
          <CssBaseline />
          <Header theme={theme} />

          <Container className={`${classes.HomePage} page-center`}>
            <FormControl className="flex gap-16" style={{ width: "20rem" }}>
              <FormLabel htmlFor="email">Školský meil</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@stud.uniza.sk"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
              <FormLabel htmlFor="password">Heslo</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="•••••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained btn btn-with-bc border-radius-075"
              >
                Sign in
              </Button>
            </FormControl>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignIn;
