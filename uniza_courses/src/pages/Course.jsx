import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  FormControl,
  FormLabel,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Header from "../components/core.components/Header";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import SecundaryBtn from "../components/core.components/SecundaryBtn";
import Comment from "../components/course.components/Comment";
import TeacherCard from "../components/course.components/TeacherCard";

const Course = () => {
  const location = useLocation();
  const { courseId } = location.state || {};
  const [restData, setRestData] = useState([]);
  const [error, setError] = useState(null);
  const [averageRate, setAverageRate] = useState([]);
  const [newComment, setNewComment] = useState("");
  const date = new Date(restData.createdAt);

  const [rate, setRate] = React.useState(2);

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
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      setError(error.message);
      alert("Error loading courses: " + error.message);
    }
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/comment/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token":
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          commentText: newComment,
          courseId,
          commentRate: rate,
        }),
      });
      setNewComment("");
      const data = await response.json();

      load();

      if (!response.ok) {
        console.log(data);
        setError(data || "Failed");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Header />
      {error ? (
        <Typography>Error: {error}</Typography>
      ) : (
        <Box sx={{ backgroundColor: "white.main", minHeight: "800px" }}>
          <Box sx={{ py: 14 }} className="dark-gradient-background-animation">
            <Container>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "70%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        padding: "2px 19px",
                        backgroundColor: "primary.dark",
                        width: "fit-content",
                        borderRadius: "12px",
                      }}
                    >
                      Course
                    </Typography>
                    <Typography variant="h2" className="font-gradient">
                      {restData.name}
                    </Typography>
                  </Box>
                  <Typography>{restData.description}</Typography>
                </Box>
                <img
                  src={restData.img_url}
                  style={{
                    width: "auto",
                    height: "200px",
                    flexShrink: "0",
                    borderRadius: "32px",
                    border: "4px solid #FFF",
                    background:
                      " url(<path-to-image>) lightgray 50% / cover no-repeat",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  py: 4,
                  fontSize: "2rem",
                  color: "primary.dark",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography color="white.main">
                    Hodnotenie {averageRate}
                  </Typography>
                  <Icon icon="material-symbols:star"></Icon>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography color="white.main">Už mali 10</Typography>
                  <Icon icon="material-symbols:person"></Icon>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography color="white.main">Trvá 1 h</Typography>
                  <Icon icon="majesticons:clock"></Icon>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography color="white.main">
                    Prídan {date.toDateString()}
                  </Typography>
                  <Icon icon="solar:calendar-bold"></Icon>
                </Box>
              </Box>
            </Container>
          </Box>

          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 8,
              color: "black.main",
            }}
          >
            <Box
              sx={{
                width: "65%",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <Typography variant="h4" className="font-gradient">
                  O kurze
                </Typography>
                <Typography
                  sx={{ lineHeight: "200%" }}
                  dangerouslySetInnerHTML={{
                    __html: restData.long_description,
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <Typography variant="h4" className="font-gradient">
                  Pre koho je tento kurz
                </Typography>
                <Typography sx={{ lineHeight: "200%" }}>
                  Študenti{" "}
                  {restData.disciplines && restData.disciplines[0].name}
                  {restData.disciplines &&
                    restData.disciplines.length > 1 &&
                    " a " + restData.disciplines[1].name}
                  {" " + restData.year} ročníku
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Typography variant="h4" className="font-gradient">
                  Štruktura kurzu
                </Typography>
                {restData.topics &&
                Array.isArray(restData.topics) &&
                restData.topics.length > 0 ? (
                  <Box>
                    {restData.topics.map((topic, topicIndex) => (
                      <Accordion key={topicIndex}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h5">{topic.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {topic.subtopics &&
                          Array.isArray(topic.subtopics) &&
                          topic.subtopics.length > 0 ? (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              {topic.subtopics.map((subtopic, subIndex) => (
                                <Typography key={subIndex}>
                                  {subtopic.title}
                                </Typography>
                              ))}
                            </Box>
                          ) : (
                            <Typography variant="body2">
                              Žiadne podtémy
                            </Typography>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                ) : (
                  <Typography>Žiadne temy</Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Typography variant="h4" className="font-gradient">
                  Učitelia
                </Typography>
                {restData.teachers &&
                Array.isArray(restData.teachers) &&
                restData.teachers.length > 0 ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    {restData.teachers.map((teacher, index) => (
                      <TeacherCard key={index} teacher={teacher} />
                    ))}
                  </Box>
                ) : (
                  <Typography>Žiadne učitelia</Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Typography variant="h4" className="font-gradient">
                  Hodnotenia
                </Typography>
                {restData.CourseComments &&
                Array.isArray(restData.CourseComments) &&
                restData.CourseComments.length > 0 ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    {restData.CourseComments.map((comment, index) => (
                      <Comment
                        key={index}
                        rate={comment.commentRate}
                        user={comment.user}
                        commentText={comment.commentText}
                        updatedAt={comment.updatedAt}
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography>Zatial ešte nie sú žiadné hodnotenia</Typography>
                )}

                <FormControl
                  component="form"
                  onSubmit={handleSubmitComment}
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: "auto",
                  }}
                >
                  <FormLabel
                    htmlFor="new-comment"
                    sx={{ fontSize: "24px", color: "primary.main" }}
                  >
                    Pridať komentar
                  </FormLabel>
                  <Rating
                    name="simple-controlled"
                    value={rate}
                    onChange={(event, newValue) => {
                      setRate(newValue);
                    }}
                  />
                  <TextField
                    id="new-comment"
                    multiline
                    type="text"
                    name="new-comment"
                    required
                    fullWidth
                    placeholder="Tu napiš svoj komentar..."
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "2px solid #E8E8E8",
                          borderRadius: "17px",
                        },
                      },
                    }}
                  />

                  <SecundaryBtn
                    type="submit"
                    sxChildren={{
                      width: "20%",
                      alignSelf: "end",
                    }}
                  >
                    Odoslať
                  </SecundaryBtn>
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: "7rem",
                  height: "fit-content",
                  display: "flex",
                  gap: 4,
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <PrimaryBtn style={{ color: "white" }}>
                    ZAčAť TERAZ
                  </PrimaryBtn>

                  <SecundaryBtn
                    style={{
                      border: "2px solid #E8E8E8",
                      display: "flex",
                      gap: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      icon="tabler:clock"
                      style={{ fontSize: "2rem" }}
                    ></Icon>{" "}
                    Chem začať neskor
                  </SecundaryBtn>

                  <SecundaryBtn
                    style={{
                      border: "2px solid #E8E8E8",
                      display: "flex",
                      gap: 3,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      icon="tabler:heart"
                      style={{ fontSize: "2rem" }}
                    ></Icon>{" "}
                    pridať k obľubeným
                  </SecundaryBtn>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    padding: "15px 37px",
                    border: "2px solid #E8E8E8",
                    background: "rgba(255, 255, 255, 0.74)",
                    borderRadius: "17px",
                  }}
                >
                  <Box display={"flex"} flexDirection={"column"} gap={2}>
                    <Typography>
                      <b>Kurz obsahuje</b>
                    </Typography>{" "}
                    <Box>
                      <Typography>
                        <b>12 </b>prednašok
                      </Typography>
                      <Typography>
                        <b>12</b> testov
                      </Typography>
                      <Typography>
                        <b>1</b> hodina <b>15</b> minut
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      color: "primary.main",
                      textDecorationLine: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Obsah kurzu
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};
export default Course;
