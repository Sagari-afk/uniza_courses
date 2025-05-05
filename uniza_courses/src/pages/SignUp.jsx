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
                width: "fit-content",
                border: "solid 2px rgba(223, 102, 144, 0.15)",
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
                  justifyContent: "space-between",
                }}
              >
                <FormLabel htmlFor="firstName" sx={{ color: "white.main" }}>
                  Meno
                </FormLabel>
                <LightTextFieldWrapper
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Zuzana"
                  required
                  fullWidth
                  autoFocus
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                <FormLabel htmlFor="secondName" sx={{ color: "white.main" }}>
                  Novakova
                </FormLabel>
                <LightTextFieldWrapper
                  id="secondName"
                  type="text"
                  name="secondName"
                  placeholder="Zuzana"
                  required
                  fullWidth
                  autoFocus
                  variant="outlined"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
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
                <LightTextFieldWrapper
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
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel htmlFor="institute" sx={{ color: "white.main" }}>
                    Pracovisko
                  </FormLabel>
                  <LightTextFieldWrapper
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
                  <FormLabel htmlFor="office" sx={{ color: "white.main" }}>
                    Kancelaria
                  </FormLabel>
                  <LightTextFieldWrapper
                    id="office"
                    type="text"
                    name="office"
                    placeholder="BD300"
                    required
                    fullWidth
                    variant="outlined"
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
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

                  <FormLabel htmlFor="phone" sx={{ color: "white.main" }}>
                    Telefonné číslo
                  </FormLabel>
                  <LightTextFieldWrapper
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="+421 950 849 2494"
                    required
                    fullWidth
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
              ) : null}

              {status ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel
                    htmlFor="personal_nam"
                    sx={{ color: "white.main" }}
                  >
                    Osobne číslo
                  </FormLabel>
                  <LightTextFieldWrapper
                    id="personal_nam"
                    type="number"
                    name="personal_nam"
                    placeholder="12345"
                    required
                    variant="outlined"
                    value={personalNum}
                    onChange={(e) => setPersonalNum(e.target.value)}
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{ style: { color: "white" } }}
                    sx={{
                      width: "80%",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Stack>
              ) : null}

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
                <LightTextFieldWrapper
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
      </Box>
    </Box>
  );
};

export default SignUp;
