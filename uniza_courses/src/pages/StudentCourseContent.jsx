import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../components/core.components/Header";
import SideMenu from "../components/studentCourseContent.components/SideMenu";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TextContentViewer from "../components/studentCourseContent.components/TextContentViewer";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";

const StudentCourseContent = () => {
  const location = useLocation();
  const { courseId } = location.state || {};
  const [topics, setTopics] = useState([]);
  const [course, setCourse] = useState([]);

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [currentTopic, setCurrentTopic] = useState(6);
  const [currentSubtopic, setCurrentSubtopic] = useState(5);
  const [currentStep, setCurrentStep] = useState(10);

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
      ``;
    }
  };

  const handleClickComplited = () => {
    setLoading(true);
    // Simulate an asynchronous action
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 1000);
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
          currentTopic={currentTopic}
          currentSubtopic={currentSubtopic}
          currentStep={currentStep}
        >
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h5">
                {topics.find((t) => t.id === currentTopic)?.order}.
                {
                  topics
                    .find((t) => t.id === currentTopic)
                    ?.subtopics.find((s) => s.id === currentSubtopic)?.order
                }{" "}
                Podtema. Krok "
                {
                  topics
                    .find((t) => t.id === currentTopic)
                    ?.subtopics.find((s) => s.id === currentSubtopic)
                    ?.steps.find((st) => st.id === currentStep)?.title
                }
                "
              </Typography>

              <LoadingButton
                onClick={handleClickComplited}
                loading={loading}
                loadingIndicator="Loading…"
                variant="contained"
                sx={{ width: 200, height: 50, transition: "all 0.3s ease" }}
              >
                {completed ? (
                  <CheckIcon sx={{ fontSize: "1.5rem" }} />
                ) : (
                  "Complete"
                )}
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "primary.main",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </LoadingButton>
            </Box>
            <TextContentViewer stepId={currentStep} />
          </Box>
        </SideMenu>
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
