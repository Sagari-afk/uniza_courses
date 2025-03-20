import { Box, Typography } from "@mui/material";
import Header from "../components/core.components/Header";
import SideMenu from "../components/studentCourseContent.components/SideMenu";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const StudentCourseContent = () => {
  const location = useLocation();
  const { courseId } = location.state || {};
  const [topics, setTopics] = useState([]);
  const [course, setCourse] = useState([]);

  const [currentTopic, setCurrentTopic] = useState();
  const [currentSubtopic, setCurrentSubtopic] = useState();
  const [currentStep, setCurrentStep] = useState();

  const loadCourse = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/getCourse/" + courseId
      );
      if (response.ok) {
        const responseData = await response.json();
        setTopics(responseData.topics);
        setCourse(responseData);
        console.log(responseData);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      toast.error("Error loading courses: " + error.message);
    }
  };

  useEffect(() => {
    loadCourse();
  }, []);

  return (
    <>
      <Header />

      {topics.length > 0 ? (
        <SideMenu
          type={"courseStructure"}
          topics={topics}
          courseTitle={course.name}
        ></SideMenu>
      ) : (
        <Box p={5}>
          <Typography variant="h4">Kurz nemá žiaden kontent...</Typography>
          <Typography variant="5">
            Počkajte kým učiteľ prída prvú temu...
          </Typography>
        </Box>
      )}
    </>
  );
};

export default StudentCourseContent;
