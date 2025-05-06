import Header from "../components/core.components/Header";
import Container from "@mui/material/Container";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Box, Typography } from "@mui/material";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecundaryBtn from "../components/core.components/SecundaryBtn";
import { toast } from "react-toastify";
import LightTextFieldWrapper from "../components/core.components/LightTextField";

const API_URL = import.meta.env.VITE_API_URL;

const SignIn = ({ setAuthToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();

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
      const response = await fetch(`${API_URL}/api/user/logIn`, {
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
        toast.success("Prihlasovanie uspesne");

        navigate("/Courses"); // Redirect to the Courses page
      } else {
        console.log("Login failed", data);
        setError(data || "Login failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Nastala chyba pri prihlasovani");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url(/homepage.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundBlendMode: "overlay",
        backgroundPosition: "center 70%",
      }}
    >
      <Box
        className="light_gradient-background-animation"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header style={{ background: "transparent" }} />
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 2, sm: 4 },
            mt: -2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 6,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",

              // bgcolor: "rgba(0,0,0,0.2)",
              // border: "2px solid rgba(223, 102, 144, 0.15)",
              borderRadius: 2,
              p: { xs: 2, sm: 4 },
            }}
          >
            <Typography variant="h3" color="primary.main">
              Prihlasiť sa
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: "20rem",
                border: "solid 2px rgba(223, 102, 144, 0.15)",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <FormLabel htmlFor="email" sx={{ color: "white.main" }}>
                Školský email
              </FormLabel>
              <LightTextFieldWrapper
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
              <LightTextFieldWrapper
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
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SignIn;
