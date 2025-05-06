import Header from "../components/core.components/Header";
import Container from "@mui/material/Container";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import LightTextFieldWrapper from "../components/core.components/LightTextField";
import { Box, Typography, Switch, Stack } from "@mui/material";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const SignUp = ({ setAuthToken }) => {
  const [email, setEmail] = useState("");
  const [personalNum, setPersonalNum] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [institute, setInstitute] = useState("");
  const [office, setOffice] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState(true);

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

    const payloadRegister = {
      email,
      password,
      personalNum: personalNum,
      institute,
      secondName,
      office,
      phone,
      firstName,
      userType: status,
    };

    console.log("Logging in with", payloadRegister);

    try {
      const response = await fetch(`${API_URL}/api/user/signUp`, {
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
        setAuthToken(token);

        if (rememberMe) {
          localStorage.setItem("authToken", token);
        } else {
          sessionStorage.setItem("authToken", token);
        }
        toast.success("Login successful!");
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url(/homepage.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundBlendMode: "overlay",
        backgroundPosition: "center 70%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        className="light_gradient-background-animation"
        sx={{ minHeight: "100vh", display: "flex" }}
      >
        {/* <Header style={{ background: "transparent" }} /> */}

        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 2, sm: 4 },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              bgcolor: "rgba(0,0,0,0.1)",
              border: "2px solid rgba(223, 102, 144, 0.15)",
              borderRadius: 2,
              p: { xs: 2, sm: 4 },
              color: "white",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Zaregistrovať sa
            </Typography>

            {/* Teacher/Student toggle */}
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              mb={3}
            >
              <Typography>Učiteľ</Typography>
              <Switch checked={status} onChange={handleChange} />
              <Typography>Študent</Typography>
            </Stack>

            {/* Name / Surname row */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
              <Box flex={1}>
                <FormLabel sx={{ color: "white !important" }}>Meno</FormLabel>
                <LightTextFieldWrapper
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Zuzana"
                />
              </Box>
              <Box flex={1}>
                <FormLabel sx={{ color: "white !important" }}>
                  Priezvisko
                </FormLabel>
                <LightTextFieldWrapper
                  fullWidth
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                  placeholder="Novakova"
                />
              </Box>
            </Stack>

            {/* Email */}
            <Box mb={2}>
              <FormLabel sx={{ color: "white !important" }}>Email</FormLabel>
              <LightTextFieldWrapper
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@stud.uniza.sk"
              />
            </Box>

            {/* Teacher-only fields */}
            {!status && (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
                <Box flex={1}>
                  <FormLabel sx={{ color: "white !important" }}>
                    Pracovisko
                  </FormLabel>
                  <LightTextFieldWrapper
                    fullWidth
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    placeholder="Katedra informatiky"
                  />
                </Box>
                <Box flex={1}>
                  <FormLabel sx={{ color: "white !important" }}>
                    Kancelária
                  </FormLabel>
                  <LightTextFieldWrapper
                    fullWidth
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
                    placeholder="BD300"
                  />
                </Box>
                <Box flex={1}>
                  <FormLabel sx={{ color: "white !important" }}>
                    Telefónne číslo
                  </FormLabel>
                  <LightTextFieldWrapper
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+421 950 849 249"
                  />
                </Box>
              </Stack>
            )}

            {/* Student-only field */}
            {status && (
              <Box mb={2}>
                <FormLabel sx={{ color: "white !important" }}>
                  Osobné číslo
                </FormLabel>
                <LightTextFieldWrapper
                  fullWidth
                  value={personalNum}
                  onChange={(e) => setPersonalNum(e.target.value)}
                  placeholder="123456"
                  type="number"
                />
              </Box>
            )}

            {/* Passwords */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
              <Box flex={1}>
                <FormLabel sx={{ color: "white !important" }}>Heslo</FormLabel>
                <LightTextFieldWrapper
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </Box>
              <Box flex={1}>
                <FormLabel sx={{ color: "white !important" }}>
                  Zopakuj heslo
                </FormLabel>
                <LightTextFieldWrapper
                  fullWidth
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => setpasswordCheck(e.target.value)}
                  placeholder="••••••••"
                />
              </Box>
            </Stack>

            {/* Remember me */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{ color: "white" }}
                />
              }
              label="Zapamätať si ma"
              sx={{ color: "white", mb: 2 }}
            />

            {error && (
              <Typography color="error" mb={2}>
                {error}
              </Typography>
            )}

            <PrimaryBtn fullWidth type="submit" loading={loading}>
              Zaregistrovať sa
            </PrimaryBtn>

            <Box textAlign="center" mt={2}>
              <Link to="/SignIn">
                <Typography color="primary.main">
                  Už máte účet? Prihláste sa
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SignUp;
