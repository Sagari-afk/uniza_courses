import { Box, Container, Typography } from "@mui/material";
import Header from "../components/header";
import CourseCard from "../components/CourseCard";
import FormControl from "@mui/material/FormControl";
import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import SecundaryBtn from "../components/SecundaryBtn";

const Courses = () => {
  const [studOdbor, setStudOdbor] = React.useState("Vsetky");
  const [rocnik, setRocnik] = React.useState("Vsetky");
  const handleChangeOdbor = (event) => {
    setStudOdbor(event.target.value);
  };
  const handleChangeRocnik = (event) => {
    setRocnik(event.target.value);
  };

  const [restData, setRestData] = useState([]);
  const [error, setError] = useState(null);

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
    <Container>
      <Header />
      <Box
        sx={{
          borderRadius: "42px 42px 0px 0px",
          backgroundColor: "white.main",
          minHeight: "100vh",
          padding: "2rem",
          marginTop: "1rem",
          color: "black.main",
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ my: "1rem" }}>
            Kurzy podľa predmetov
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
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
            <div className="flex">
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <TextField
                  id="outlined-search"
                  label="Nazov kurzu, predmetu alebo temy..."
                  type="search"
                  variant="standard"
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <SecundaryBtn
                  sxChildren={{
                    color: "black.main",
                    backgroundColor: "white.main",
                  }}
                >
                  Hladat
                </SecundaryBtn>
              </FormControl>
            </div>
          </Box>
        </Box>

        <section>
          {error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
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
                  />
                ))
              ) : (
                <Typography>Loading...</Typography> // Показываем, пока данные не загружены
              )}
            </Box>
          )}
        </section>
      </Box>
    </Container>
  );
};

export default Courses;
