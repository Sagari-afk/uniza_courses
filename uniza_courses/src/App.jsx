import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import Course from "./pages/Course";
import { GlobalStyles } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ToastContainer, toast } from "react-toastify";

import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Courses from "./pages/Courses";
import EditCourse from "./pages/EditCourse/";
import EditIcon from "@mui/icons-material/Edit";
import AppsIcon from "@mui/icons-material/Apps";
import CreateCourseContent from "./pages/CreateCourseContent";

import CreateNewCourseBtn from "./components/core.components/CreateNewCourseBtn";
import CreateTextStep from "./pages/steps_creating.pages/CreateTextStep";
import AllTeachersCourses from "./pages/AllTeacherCourses";
import StudentCourseContent from "./pages/StudentCourseContent";
import PrimaryBtn from "./components/core.components/PrimaryBtn";

function App() {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("api-token")
  );
  const [userData, setUserData] = useState(() =>
    sessionStorage.getItem("userData")
  );
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

  const getUserData = useCallback(async (token) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/getUserData",
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        sessionStorage.setItem("userData", JSON.stringify(responseData.user));
        return responseData.user;
      } else {
        console.log(response);
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error loading user data");
    }
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
        const data = await getUserData(token);
        setUserData(data);
      }
    }
    fetchUserData();
  }, [getUserData]);

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
        fontWeight: 500, // Normal weight for h4
      },
      h5: {
        fontWeight: 400, // Lighter for h5
      },
      h6: {
        fontWeight: 400, // Even lighter for h6
      },
      h7: {
        fontWeight: 400, // Even lighter for h6
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
    setAuthToken(null);
    navigate("/");
    console.log("Logged out successfully");
  };

  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <Routes>
        {!authToken && <Route path="/" element={<HomePage />} />}
        {!authToken && (
          <Route
            path="signIn"
            element={<SignIn setAuthToken={setAuthToken} />}
          />
        )}
        {!authToken && (
          <Route
            path="signUp"
            element={<SignUp setAuthToken={setAuthToken} />}
          />
        )}
        <Route
          path="courses"
          element={<Courses handleLogout={handleLogout} />}
        />
        {authToken && <Route path="/Course/:courseName" element={<Course />} />}
        {authToken && userData.userRole === "teacher" && (
          <Route path="/editCourse" element={<EditCourse />} />
        )}
        {authToken && userData.userRole === "teacher" && (
          <Route
            path="/EditCourse/:courseName/content"
            element={<CreateCourseContent />}
          />
        )}
        {authToken && userData.userRole === "teacher" && (
          <Route
            path="/CourseContent/createStep/text"
            element={<CreateTextStep />}
          />
        )}
        {authToken && userData.userRole === "teacher" && (
          <Route path="/allCourses/teacher" element={<AllTeachersCourses />} />
        )}

        {authToken && (
          <Route
            path="StudenCourseContent/:courseName"
            element={<StudentCourseContent />}
          />
        )}
      </Routes>

      {authToken && userData.userRole === "teacher" && (
        <CreateNewCourseBtn
          actions={[
            {
              icon: <MenuBookIcon />,
              name: "Nový kurz",
              link: "/editCourse",
            },
            {
              icon: <AppsIcon />,
              name: "Moje kurzy",
              link: "/allCourses/teacher",
            },
          ]}
          icon={<EditIcon />}
          sx={{ position: "fixed", bottom: "2rem", right: "1rem" }}
        />
      )}
      <ToastContainer position="bottom-left" theme="colored" />
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
