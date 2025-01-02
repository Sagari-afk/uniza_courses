import { Box, Container, Typography } from "@mui/material";
import Header from "../components/Header";
import CourseCard from "../components/CourseCard";
import FormControl from "@mui/material/FormControl";
import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import SecundaryBtn from "../components/SecundaryBtn";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Courses = ({ handleLogout }) => {
  const [studOdbor, setStudOdbor] = React.useState("Vsetky");
  const [rocnik, setRocnik] = React.useState("Vsetky");
  const [isHovered, setIsHovered] = React.useState(false);
  const [restData, setRestData] = useState([]);
  const [error, setError] = useState(null);

  const handleChangeOdbor = (event) => {
    setStudOdbor(event.target.value);
  };
  const handleChangeRocnik = (event) => {
    setRocnik(event.target.value);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/course/getAllCourses"
        );
        if (response.ok) {
          const responseData = await response.json();
          setRestData(responseData.records);
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
    // <Container>
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "4rem 1rem 0 3rem",
            minHeight: "550px",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "primary.dark",
              gap: "2rem",
            }}
          >
            <Icon
              icon="material-symbols:menu-rounded"
              style={{
                fontSize: "2rem",
                opacity: isHovered ? 0.3 : 1, // Hide icon when hovered
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "primary.dark",
                gap: "2rem", // Ensure that content doesn't overflow when shrinking
                transition: "all 0.3s ease", // Smooth transition for size and padding
                width: isHovered ? "250px" : "60px", // Box width changes smoothly on hover
              }}
            >
              {/* First box with icon and text */}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  opacity: isHovered ? 1 : 0, // Fade-in text when hovered
                  transition: "opacity 0.3s ease", // Smooth opacity transition
                }}
              >
                <Icon
                  icon="hugeicons:course"
                  style={{
                    fontSize: "2rem",
                    transition: "transform 0.3s ease", // Smooth scaling transition for the icon
                  }}
                />
                {isHovered && (
                  <Typography
                    sx={{ color: "white.dark", whiteSpace: "nowrap" }}
                  >
                    Robim teraz
                  </Typography>
                )}
              </Box>

              {/* Second box with icon and text */}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  opacity: isHovered ? 1 : 0, // Fade-in text when hovered
                  transition: "opacity 0.3s ease", // Smooth opacity transition
                }}
              >
                <Icon
                  icon="tabler:clock"
                  style={{
                    fontSize: "2rem",
                    transition: "transform 0.3s ease", // Smooth scaling transition for the icon
                  }}
                />
                {isHovered && (
                  <Typography
                    sx={{ color: "white.dark", whiteSpace: "nowrap" }}
                  >
                    Chcem robiť
                  </Typography>
                )}
              </Box>

              {/* Third box with icon and text */}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  opacity: isHovered ? 1 : 0, // Fade-in text when hovered
                  transition: "opacity 0.3s ease", // Smooth opacity transition
                }}
              >
                <Icon
                  icon="tabler:heart"
                  style={{
                    fontSize: "2rem",
                    transition: "transform 0.3s ease", // Smooth scaling transition for the icon
                  }}
                />
                {isHovered && (
                  <Typography sx={{ color: "white.dark" }}>Obľubene</Typography>
                )}
              </Box>

              {/* Fourth box with icon and text */}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  opacity: isHovered ? 1 : 0, // Fade-in text when hovered
                  transition: "opacity 0.3s ease", // Smooth opacity transition
                }}
              >
                <Icon
                  icon="mage:archive"
                  style={{
                    fontSize: "2rem",
                    transition: "transform 0.3s ease", // Smooth scaling transition for the icon
                  }}
                />
                {isHovered && (
                  <Typography sx={{ color: "white.dark" }}>Archiv</Typography>
                )}
              </Box>
            </Box>
          </Box>
          {isHovered && (
            <Typography
              sx={{
                color: "white.dark",
                whiteSpace: "nowrap",
                opacity: 0.3,
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Odhlasiť sa
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            borderRadius: "42px 0px 0px 0px",
            backgroundColor: "white.main",
            minHeight: "100vh",
            py: "2rem",
            px: "4rem",
            marginTop: "1rem",
            color: "black.main",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ my: "1rem" }}>
              Kurzy podľa predmetov
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "space-between" },
                }}
              >
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                  <InputLabel id="stud-odbor-label">Studijny odbor</InputLabel>
                  <Select
                    value={studOdbor}
                    onChange={handleChangeOdbor}
                    displayEmpty
                    labelId="stud-odbor-label"
                    autoWidth
                    id="stud-odbor-select-autowidth"
                    label="Studijny odbor"
                  >
                    <MenuItem value="Vsetky">Vsetky</MenuItem>
                    <MenuItem value="Multimedia">Multimedia</MenuItem>
                    <MenuItem value="Komunikacne">Komunikacne</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                  <InputLabel id="rocnik-label">Rocnik</InputLabel>
                  <Select
                    value={rocnik}
                    onChange={handleChangeRocnik}
                    displayEmpty
                    labelId="rocnik-label"
                    autoWidth
                    id="rocnik-select-autowidth"
                    label="Rocnik"
                  >
                    <MenuItem value="Vsetky">Vsetky</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "space-between" },
                }}
              >
                <FormControl sx={{ m: 1 }}>
                  <TextField
                    id="outlined-search"
                    label="Nazov kurzu, predmetu alebo temy..."
                    type="search"
                    variant="standard"
                    sx={{ width: { xs: "100%" } }}
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <SecundaryBtn
                    sxChildren={{
                      color: "black.main",
                      backgroundColor: "white.main",
                    }}
                  >
                    Hladat
                  </SecundaryBtn>
                </FormControl>
              </Box>
            </Box>
          </Box>

          <section>
            {error ? (
              <Typography>Error: {error}</Typography>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px",
                  padding: "20px",
                }}
              >
                {restData.length > 0 ? (
                  restData.map((course, index) => (
                    <CourseCard
                      key={index} // Уникальный ключ для каждого элемента
                      name={course.name} // Передаем параметры
                      img_url={course.img_url}
                      teacher={course.teacher}
                      updatedAt={course.updatedAt}
                      description={course.description}
                      linkTo={`/Course/${course.name}`}
                    />
                  ))
                ) : (
                  <Typography>Loading...</Typography> // Показываем, пока данные не загружены
                )}
              </Box>
            )}
          </section>
        </Box>
      </Box>
    </>
    // </Container>
  );
};

export default Courses;
