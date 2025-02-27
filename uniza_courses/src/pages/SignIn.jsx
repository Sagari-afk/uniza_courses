import Header from "../components/core.components/Header";
import Container from "@mui/material/Container";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Box, Typography, Alert, Snackbar } from "@mui/material";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecundaryBtn from "../components/core.components/SecundaryBtn";

const SignIn = ({ setAuthToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError(null);
    setLoading(true);

    const payload = {
      email,
      password,
    };

    console.log("Logging in with", payload);

    try {
      const response = await fetch("http://localhost:3000/api/user/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        const token = data.token;
        setAuthToken(token);

        if (rememberMe) {
          localStorage.setItem("authToken", token);
        } else {
          sessionStorage.setItem("authToken", token);
        }
        setSnackbarMessage("Login successful!");
        setOpenSnackbar(true);

        navigate("/Courses"); // Redirect to the Courses page
      } else {
        console.log("Login failed", data);
        setError(data || "Login failed");
      }
    } catch (err) {
      console.log(err);
      setError(err || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Header />
      <Container
        sx={{ overflow: "hidden", height: "100%", backgroundColor: "black" }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 6,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            paddingBottom: "10rem",
            color: "white",
            marginTop: "-2rem",
          }}
        >
          <Typography variant="h3" color="primary.main">
            Prihlasiť sa
          </Typography>
          <FormControl
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              gap: 2,
              width: "20rem",
              border: "solid rgba(255, 255, 255, 0.1)",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <FormLabel htmlFor="email" sx={{ color: "white.main" }}>
              Školský email
            </FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="your@stud.uniza.sk"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
            <FormLabel htmlFor="password" sx={{ color: "white.main" }}>
              Heslo
            </FormLabel>
            <TextField
              name="password"
              placeholder="•••••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} // Update the rememberMe state
                  sx={{ color: "white" }}
                />
              }
              label="Zapamatať si ma"
              sx={{ color: "white" }}
            />
            {error && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}
            <PrimaryBtn type="submit">Prihlasiť sa</PrimaryBtn>
            <Link to="/SignUp">
              <SecundaryBtn style={{ color: "#DF6690" }}>
                Vytvoriť nový učet
              </SecundaryBtn>
            </Link>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
