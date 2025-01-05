import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import PrimaryBtn from "../components/PrimaryBtn";
import SecundaryBtn from "../components/SecundaryBtn";
import { useLocation } from "react-router-dom";
import Comment from "../components/Comment";

const Course = () => {
  const location = useLocation();
  const { courseId } = location.state || {};
  const [restData, setRestData] = useState([]);
  const [error, setError] = useState(null);
  const [averageRate, setAverageRate] = useState([]);
  const [newComment, setNewComment] = useState("");
  const date = new Date(restData.createdAt);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data || "Failed");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed");
    }
  };

  useEffect(() => {
    const load = async () => {
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
              ? values.reduce((sum, rating) => sum + rating.commentRate, 0) /
                  values.length
              : 0
          );
        } else {
          throw new Error("Failed to fetch courses");
        }
      } catch (error) {
        setError(error.message);
        alert("Error loading courses: " + error.message);
      }
    };

    load();
  }, []);

  return (
    <>
      <Header />
      {error ? (
        <Typography>Error: {error}</Typography>
      ) : (
        <Box sx={{ backgroundColor: "white.main", minHeight: "800px" }}>
          <Box sx={{ py: 14 }} className="gradient-background-animation">
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
                <Typography sx={{ lineHeight: "200%" }}>
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Vestibulum tortor quam,
                  feugiat vitae, ultricies eget, tempor sit amet, ante.
                  <br />
                  <br />
                  Donec eu libero sit amet quam egestas semper. Aenean ultricies
                  mi vitae est. Mauris placerat eleifend leo. Quisque sit amet
                  est et sapien ullamcorper pharetra. Vestibulum erat wisi,
                  condimentum sed, commodo vitae, ornare sit amet, wisi.
                  <br />
                  <br />
                  Aenean fermentum, elit eget tincidunt condimentum, eros ipsum
                  rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim
                  in turpis pulvinar facilisis. Ut felis. Praesent dapibus,
                  neque id cursus faucibus, tortor neque egestas augue, eu
                  vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui
                  mi, tincidunt quis, accumsan porttitor, facilisis luctus,
                  metus Pellentesque habitant morbi tristique senectus et netus
                  et malesuada fames ac turpis egestas. Vestibulum tortor quam,
                  feugiat vitae, ultricies eget, tempor sit amet, ante.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" className="font-gradient">
                    Pre koho je tento kurz
                  </Typography>
                  <Typography sx={{ lineHeight: "200%" }}>
                    Študenti Multymedialných technologií 1 ročník 1 semester
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h4" className="font-gradient">
                    Zakladné požiadavky
                  </Typography>
                  <Typography sx={{ lineHeight: "200%" }}>
                    požiadavka 1
                    <br />
                    požiadavka 2
                    <br />
                    požiadavka 3
                  </Typography>
                </Box>
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
                        user={comment.User.name}
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
                  onSubmit={handleSubmit}
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
                  <TextField
                    id="new-comment"
                    multiline
                    type="text"
                    name="new-comment"
                    required
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "2px solid #E8E8E8",
                          borderRadius: "17px",
                        },
                        "&:hover fieldset": {
                          border: "2px solid #E8E8E8",
                          borderRadius: "17px",
                        },
                        "&.Mui-focused fieldset": {
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
                      backgroundColor: "transperent",
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
                      color: "#DF6690",
                      backgroundColor: "rgba(255, 255, 255, 0.74)",
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
                      color: "#DF6690",
                      backgroundColor: "rgba(255, 255, 255, 0.74)",
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
