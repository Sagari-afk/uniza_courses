import { Box, Typography } from "@mui/material";
import Header from "../components/core.components/Header";
import CoursesPagination from "../components/courses.components/CoursePagination";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const CoursesInProgress = () => {
  const [courses, setCourses] = useState([]);
  const [userData] = useState(
    JSON.parse(sessionStorage.getItem("userData")) ||
      JSON.parse(localStorage.getItem("userData"))
  );

  const getCoursess = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/userProgress/coursessInProgress/${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCourses(data.courses);
    } catch (error) {
      console.log(error.message);
      toast.error("Error loading courses");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCoursess();
      if (courses) {
        console.log(courses);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box
        sx={{
          borderRadius: { md: "42px 0px 0px 0px", xs: "0px" },

          py: "2rem",
          flex: 1,
          overflow: "auto",

          backgroundColor: "white.main",
          color: "black.main",
          width: "100%",
        }}
        className="light_gradient-background-animation"
      >
        <Box>
          <Typography
            variant="h3"
            textAlign={{ xs: "center", md: "left" }}
            fontSize={{ xs: "2rem", md: "3rem" }}
            sx={{ mb: 4, mx: 4 }}
          >
            Robim teraz...
          </Typography>
          <CoursesPagination courses={courses} typeOfPage={"inProgress"} />
        </Box>
      </Box>
    </Box>
  );
};

export default CoursesInProgress;
