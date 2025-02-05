import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Courses from "./pages/Courses";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import Course from "./pages/Course";
import { GlobalStyles } from "@mui/material";
import CreateNewCourseBtn from "./components/CreateNewCourseBtn";
import CreateNewCourse from "./pages/CreateNewCourse";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  const globalStyles = (
    <GlobalStyles
      styles={{
        /* Webkit (Chrome, Edge, Safari) */
        "*::-webkit-scrollbar": {
          padding: "0.5rem", // doesnt work
        },
        "*::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "16px",
          border: "2px solid #f1f1f1",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
        /* Firefox */
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
        },
      }}
    />
  );

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
      {globalStyles}
      <Routes>
        {!authToken && <Route path="/" element={<HomePage />} />}
        {!authToken && <Route path="signIn" element={<SignIn />} />}
        {!authToken && <Route path="signUp" element={<SignUp />} />}
        <Route
          path="courses"
          element={<Courses handleLogout={handleLogout} />}
        />
        {authToken && <Route path="/Course/:courseName" element={<Course />} />}
        {authToken && (
          <Route path="/createNewCourse" element={<CreateNewCourse />} />
        )}
      </Routes>

      {window.location.pathname !== "/createNewCourse" && (
        <CreateNewCourseBtn />
      )}
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
