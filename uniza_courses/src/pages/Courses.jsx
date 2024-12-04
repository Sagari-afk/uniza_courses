import { Container } from "@mui/material";
import Header from "../components/header";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import classes from "../styles/Courses.module.css";
import CourseCard from "../components/CourseCard";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

const Courses = ({ theme }) => {
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
      <Header theme={theme} />
      <div className={`${classes.bodyCourses} c-black`}>
        <div>
          <h2>Kurzy podľa predmetov</h2>
          <div className="flex space-between">
            <div className="flex">
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
            </div>
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
                <Button variant="outlined btn btn-without-bc border-radius-20 c-black">
                  Hladat
                </Button>
              </FormControl>
            </div>
          </div>
        </div>

        <section>
          {/* {error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid">
              {restData.length > 0 ? (
                restData.map((course, index) => (
                  <div key={index} className="course-card">
                    <h3>{course.name}</h3>
                    <p>{course.img_url}</p>
                    <p>{course.description}</p>
                    <p>Date: {course.updatedAt}</p>
                  </div>
                ))
              ) : (
                <p>Loading...</p> // Показываем, пока данные не загружены
              )}
            </div>
          )} */}

          {error ? (
            <p>Error: {error}</p>
          ) : (
            <div className={classes.grid}>
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
                <p>Loading...</p> // Показываем, пока данные не загружены
              )}
            </div>
          )}
        </section>
      </div>
    </Container>
  );
};

export default Courses;
