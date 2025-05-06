import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

import Header from "../components/core.components/Header";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import SecundaryBtn from "../components/core.components/SecundaryBtn";
import Comment from "../components/course.components/Comment";
import TeacherCard from "../components/course.components/TeacherCard";
import HeadSection from "../components/course.components/HeadSection";
import LongDescription from "../components/course.components/LongDescription";
import CourseIsFor from "../components/course.components/CourseIsFor";
import CourseStructure from "../components/course.components/CourseStructure";
import Teachers from "../components/course.components/Teachers";
import Comments from "../components/course.components/Comments";
import SidePanel from "../components/course.components/SidePanel";

const Course = () => {
  const location = useLocation();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  const { courseId } = location.state || {};
  const [restData, setRestData] = useState([]);
  const [error, setError] = useState(null);
  const [averageRate, setAverageRate] = useState([]);
  const [date, setDate] = useState();

  const [courseStarted, setCourseStarted] = useState(false);
  const [studentsCount, setStudentsCount] = useState(0);

  const getStudentsCount = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/course/getStudentsCount/${courseId}`,
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
      if (response.ok) {
        const data = await response.json();
        setStudentsCount(data);
      } else {
        console.error("Failed to fetch students count");
      }
    } catch (error) {
      console.error("Error fetching students count:", error);
    }
  };

  const load = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/getCourse/" + courseId
      );
      if (response.ok) {
        const responseData = await response.json();
        setRestData(responseData);

        const values = Object.values(responseData.CourseComments);

        setAverageRate(
          values.length > 0
            ? Math.round(
                (values.reduce((sum, rating) => sum + rating.commentRate, 0) /
                  values.length) *
                  100
              ) / 100
            : 0
        );
        setDate(
          new Intl.DateTimeFormat("sk-SK", {
            dateStyle: "long",
          }).format(new Date(responseData.updatedAt))
        );
        getStudentsCount(responseData.id);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error loading courses: " + error.message);
    }
  }, []);

  const startCourse = async () => {
    navigate(`/StudenCourseContent/${restData.name}`, { state: { courseId } });
  };

  const getIfCourseStarted = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/userProgress/getIsStarted/${courseId}/${userData.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch course status");
      }
      setCourseStarted(data.started);
      console.log("Kurz bol zacaty: ", data.started);
    } catch (error) {
      console.log("error: ", error);
      setError(error.message);
      toast.error("Error loading courses: " + error.message);
    }
  };

  useEffect(() => {
    load();
    getIfCourseStarted();
  }, []);

  return (
    <>
      <Header />
      {error ? (
        <Typography>Error: {error}</Typography>
      ) : (
        <Box sx={{ backgroundColor: "white.main", minHeight: "800px" }}>
          <HeadSection
            restData={restData}
            averageRate={averageRate}
            studentsCount={studentsCount}
            date={date}
          />

          <Container
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              py: 8,
              color: "black.main",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                order: { xs: 2, md: 1 },
                width: { xs: "100%", md: "65%" },
              }}
            >
              <LongDescription restData={restData} />

              <CourseIsFor restData={restData} />

              <CourseStructure restData={restData} />

              <Teachers restData={restData} />

              <Comments restData={restData} />
            </Box>

            <SidePanel
              courseStarted={courseStarted}
              startCourse={startCourse}
            />
          </Container>
        </Box>
      )}
    </>
  );
};
export default Course;
