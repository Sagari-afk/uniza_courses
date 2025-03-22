import { Box, Typography } from "@mui/material";
import Header from "../components/core.components/Header";
import SearchBar from "../components/courses.components/SearchBar";
import CoursesPagination from "../components/courses.components/CoursePagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllTeachersCourses = () => {
  const [restData, setRestData] = useState([]);
  const [error, setError] = useState(null);
  const teacherData = sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null;

  const load = async () => {
    console.log("teacherData", teacherData);
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/getAllTeachersCourses/" +
          teacherData.userId,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setRestData(responseData.records);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error loading courses: " + error.message);
    }
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          borderRadius: "42px 42px 0 0 ",
          backgroundColor: "white.main",
          minHeight: "100vh",
          py: "2rem",

          marginTop: "1rem",
          color: "black.main",
          width: "100%",
        }}
        className="light_gradient-background-animation"
      >
        <Box sx={{ px: "4rem" }}>
          <Box>
            <Typography
              variant="h3"
              sx={{ my: "1rem" }}
              className="font-gradient"
            >
              Moje kurzy
            </Typography>
          </Box>

          {error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <CoursesPagination
              courses={restData}
              teacher={teacherData}
              load={load}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
export default AllTeachersCourses;
