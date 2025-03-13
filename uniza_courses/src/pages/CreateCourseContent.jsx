import { Box, Container, Grid2, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/core.components/Header";
import ModalCreate from "../components/createCourseContent.components/ModalCreate";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import SecundaryBtn from "../components/core.components/SecundaryBtn";
import CourseStructureDND from "../components/createCourseContent.components/CourseStructureDND";

const CreateCourseContent = () => {
  const location = useLocation();
  const restData = location.state.responseData || {};
  const [course, setCourse] = useState(restData || []);

  const [topicName, setTopicName] = useState("");

  const handleSubmitCreateTopic = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: topicName,
        courseId: restData.id,
      };
      console.log(payload);
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/newTopic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        load();
        alert("Tema bola úspešne vytvorena");
      } else {
        alert("Nastala chyba pri vytváraní temy");
      }
    } catch (error) {
      console.log(error);
      alert("Nastala chyba pri vytváraní temy");
    }
  };

  const load = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/getCourse/" + course.id,
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
      setCourse(data);
      console.log("Loading data", data);
    } catch (error) {
      console.error(error);
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
          minHeight: "100vh",
          py: "2rem",
          color: "black.main",

          backgroundColor: "white.main",
        }}
        className="light_gradient-background-animation"
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
            <Typography variant="h3" className="font-gradient">
              {course.name}
            </Typography>
            <ModalCreate btn=<SecundaryBtn>Nova tema</SecundaryBtn>>
              <Typography variant="h4">Nova tema</Typography>

              <Grid2
                size={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  id="course-name"
                  width="100%"
                  label="Nazov"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                />
              </Grid2>
              <PrimaryBtn
                onClick={(e) => {
                  handleSubmitCreateTopic(e);
                }}
              >
                Vytvoriť
              </PrimaryBtn>
            </ModalCreate>
          </Box>
          <Typography variant="h5" padding={2}>
            Temy kurzu
          </Typography>
          {course?.topics?.length > 0 ? (
            <CourseStructureDND data={course} load={load} />
          ) : (
            <Typography variant="h4">Žiadne témy</Typography>
          )}
        </Container>
      </Box>
    </>
  );
};

export default CreateCourseContent;
