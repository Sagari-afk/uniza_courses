import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Courses from "./pages/Courses";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import Course from "./pages/Course";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#DF6690",
        dark: "#e7407b",
      },
      secondary: {
        main: "#FFC65A",
      },
      black: {
        main: "#121212",
      },
      white: {
        main: "#F2F2F2",
        dark: "#E8E8E8",
        light: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "Roboto",
      h1: {
        fontWeight: 700, // Bold for h1
      },
      h2: {
        fontWeight: 600, // Medium-bold for h2
      },
      h3: {
        fontWeight: 500, // Regular bold for h3
      },
      h4: {
        fontWeight: 400, // Normal weight for h4
      },
      h5: {
        fontWeight: 400, // Lighter for h5
      },
      h6: {
        fontWeight: 200, // Even lighter for h6
      },
      body1: {
        fontWeight: 400, // Normal weight for body text (equivalent to <p>)
      },
      body2: {
        fontWeight: 300, // Lighter body text
      },
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/");
    console.log("Logged out successfully");
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {!authToken && <Route path="/" element={<HomePage />} />}
        {!authToken && <Route path="signIn" element={<SignIn />} />}
        {!authToken && <Route path="signUp" element={<SignUp />} />}
        <Route
          path="courses"
          element={<Courses handleLogout={handleLogout} />}
        />
        {authToken && <Route path="/Course/:courseName" element={<Course />} />}
      </Routes>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
