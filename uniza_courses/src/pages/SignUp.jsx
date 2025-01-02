import Header from "../components/Header";
import Container from "@mui/material/Container";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Box, Typography, Alert, Snackbar, Switch, Stack } from "@mui/material";
import PrimaryBtn from "../components/PrimaryBtn";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecundaryBtn from "../components/SecundaryBtn";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [personalNum, setPersonalNum] = useState("");
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState(true);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError(null);
    setLoading(true);

    if (password !== passwordCheck) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    let st;
    status ? (st = 1) : (st = 2);
    console.log(st);

    const payloadRegister = {
      email,
      password,
      personal_num: personalNum,
      institute,
      name,
      type_id: st,
    };

    console.log("Logging in with", payloadRegister);

    try {
      const response = await fetch("http://localhost:3000/api/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadRegister),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        const token = data.token;

        if (rememberMe) {
          localStorage.setItem("authToken", token);
        } else {
          sessionStorage.setItem("authToken", token);
        }
        setSnackbarMessage("Login successful!");
        setOpenSnackbar(true);

        navigate("/Courses"); // Redirect to the Courses page
      } else {
        setError(data || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Registration failed");
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
            marginTop: "-3rem",
          }}
        >
          <Typography variant="h3" color="primary.main">
            Zaregistrovať sa
          </Typography>
          <FormControl
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              gap: 2,
              width: "30rem",
              border: "solid rgba(255, 255, 255, 0.1)",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>Učiteľ</Typography>
              <Switch checked={status} onChange={handleChange} />
              <Typography>Študent</Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormLabel htmlFor="name" sx={{ color: "white.main" }}>
                Meno
              </FormLabel>
              <TextField
                id="name"
                type="text"
                name="name"
                placeholder="Zuzana Nováková"
                required
                fullWidth
                autoFocus
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

              <FormLabel htmlFor="email" sx={{ color: "white.main" }}>
                Email
              </FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@stud.uniza.sk"
                autoComplete="email"
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
            </Stack>

            {!status ? (
              <>
                <FormLabel htmlFor="institute" sx={{ color: "white.main" }}>
                  Pracovisko
                </FormLabel>
                <TextField
                  id="institute"
                  type="text"
                  name="institute"
                  placeholder="Katedra informatiky"
                  required
                  fullWidth
                  variant="outlined"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
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
              </>
            ) : null}

            {status ? (
              <>
                <FormLabel htmlFor="personal_nam" sx={{ color: "white.main" }}>
                  Osobne číslo
                </FormLabel>
                <TextField
                  id="personal_nam"
                  type="number"
                  name="personal_nam"
                  placeholder="12345"
                  required
                  fullWidth
                  variant="outlined"
                  value={personalNum}
                  onChange={(e) => setPersonalNum(e.target.value)}
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
              </>
            ) : null}

            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
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

              <FormLabel htmlFor="passwordCheck" sx={{ color: "white.main" }}>
                Zopakuj heslo
              </FormLabel>
              <TextField
                name="passwordCheck"
                placeholder="•••••••••"
                type="password"
                id="passwordCheck"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                value={passwordCheck}
                onChange={(e) => setpasswordCheck(e.target.value)}
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
            </Stack>

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
            <PrimaryBtn type="submit">Zaregistrovať sa</PrimaryBtn>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
