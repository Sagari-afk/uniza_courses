import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Link,
  Stack,
} from "@mui/material";
import Header from "../components/core.components/Header";
import SideMenu from "../components/studentCourseContent.components/SideMenu";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TextContentViewer from "../components/studentCourseContent.components/TextContentViewer";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import AnimatedNextIcon from "../components/studentCourseContent.components/AnimatedNextIcon";

const StudentCourseContent = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const location = useLocation();
  const [courseId, setCourseId] = useState(location.state.courseId || {});
  const [topics, setTopics] = useState([]);
  const [course, setCourse] = useState([]);

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  const [currentTopic, setCurrentTopic] = useState(0);
  const [currentSubtopic, setCurrentSubtopic] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsCount, setStepsCount] = useState(0);
  const [allStepsCount, setAllStepsCount] = useState(0);

  const loadCourse = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/getCourse/" + courseId
      );
      if (response.ok) {
        const responseData = await response.json();
        setTopics(responseData.topics);
        setCourse(responseData);
        setCourseId(responseData.id);
        setAllStepsCount(
          responseData.topics.reduce((topicAcc, topic) => {
            return (
              topicAcc +
              (topic.subtopics || []).reduce((subAcc, subtopic) => {
                return subAcc + (subtopic.steps?.length || 0);
              }, 0)
            );
          }, 0)
        );
        console.log(responseData);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      toast.error("Error loading courses: " + error.message);
      console.log(error);
    }
  };

  const loadUserLastProgress = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/userProgress/getLastUserProgress/" +
          courseId +
          "/" +
          userData.userId,
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
        var responseData = await response.json();
        console.log(responseData);
        responseData = responseData.records;
        setCurrentTopic(responseData.dataValues.topicId);
        setCurrentSubtopic(responseData.dataValues.subtopicId);
        setCurrentStep(responseData.dataValues.stepId);
        setStepsCount(responseData.stepsCount);
        setCompleted(responseData.dataValues.completed);
      } else if (response.message) {
        setError(response.message);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      toast.error("Error loading courses: " + error.message);
      console.log(error);
    }
  };

  const handleClickCompleted = async () => {
    if (loading || completed) return; // avoid double triggers
    setLoading(true);
    console.log("Completing...");

    try {
      const response = await fetch(
        `http://localhost:3000/api/userProgress/setStepCompleted/${currentStep}/${userData.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // If the response has content, parse it; otherwise, skip parsing
      let result = null;
      if (response.status !== 204) {
        result = await response.json();
      }
      console.log("Step marked as completed:", result.message);
      setStepsCount(result.stepsCount);
      console.log("Steps count: ", stepsCount);

      setCompleted(true);
    } catch (error) {
      console.error("Error completing step:", error);
      toast.error("Error completing step: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateNextStep = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/userProgress/nextStep",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            userId: userData.userId,
            courseId: courseId,
            topicId: currentTopic,
            subtopicId: currentSubtopic,
            stepId: currentStep,
          }),
        }
      );
      if (response.ok) {
        var responseData = await response.json();
        if (responseData.message == "No further steps available.")
          return toast.warning("No further steps available.");
        responseData = responseData.record;
        console.log(responseData);
        setCurrentTopic(responseData.topicId);
        setCurrentSubtopic(responseData.subtopicId);
        setCurrentStep(responseData.stepId);
        setCompleted(false);
      } else {
        console.log(response);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error navigating next step:", error);
      toast.error("Error navigating next step: " + error.message);
    }
  };

  const changeSubtopic = async (subtopicId) => {
    console.log(subtopicId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/userProgress/changeSubtopic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            userId: userData.userId,
            courseId: course.id,
            subtopicId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      if (response.status !== 204) {
        var responseData = await response.json();
        console.log(responseData);
        responseData = responseData.progress;
        setCurrentTopic(responseData.dataValues.topicId);
        setCurrentSubtopic(responseData.dataValues.subtopicId);
        setCurrentStep(responseData.dataValues.stepId);
        setStepsCount(responseData.stepsCount);
        setCompleted(responseData.dataValues.completed);
      }
    } catch (error) {
      console.error("Error completing step:", error);
      toast.error("Error completing step: " + error.message);
    }
  };

  const fetchCompletedStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/userProgress/getCompletedStatus/${currentStep}/${userData.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      if (response.status !== 204) {
        var responseData = await response.json();
        console.log(responseData);
        setCompleted(responseData.completed);
      }
    } catch (error) {
      console.error("Error getting status:", error);
      toast.error("Error getting status: " + error.message);
    }
  };

  useEffect(() => {
    console.log("✅ Completed state:", completed);
  }, [completed]);

  useEffect(() => {
    fetchCompletedStatus();
  }, [currentStep]);

  useEffect(() => {
    const fetchAll = async () => {
      await loadCourse();
      await loadUserLastProgress();
      setReady(true);
    };

    fetchAll();
  }, []);

  return (
    <>
      <Header />

      {ready && !error ? (
        <SideMenu
          type={"courseStructure"}
          topics={topics}
          courseTitle={course.name}
          currentTopic={currentTopic}
          currentSubtopic={currentSubtopic}
          currentStep={currentStep}
          stepsCount={stepsCount}
          allStepsCount={allStepsCount}
          changeSubtopic={changeSubtopic}
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

              <Stack direction={"row"} alignItems={"end"} gap={2}>
                <Button
                  onClick={handleClickCompleted}
                  variant="contained"
                  sx={{
                    width: 200,
                    height: 50,
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                  disabled={completed || loading}
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
                </Button>

                <AnimatedNextIcon
                  show={completed}
                  navigateNextStep={navigateNextStep}
                />
              </Stack>
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
