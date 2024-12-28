import Header from "../components/header";
import Container from "@mui/material/Container";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import PrimaryBtn from "../components/PrimaryBtn";

const SignIn = () => {
  return (
    <>
      <Container
        sx={{ overflow: "hidden", height: "100%", backgroundColor: "black" }}
      >
        <Header />

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
            Sign in
          </Typography>
          <FormControl
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
              Školský meil
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
                  defaultChecked
                  sx={{ color: "white" }}
                />
              }
              label="Remember me"
              sx={{ color: "white" }}
            />
            <PrimaryBtn type="submit">Sign in</PrimaryBtn>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
