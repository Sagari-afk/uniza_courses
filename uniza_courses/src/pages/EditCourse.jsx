import {
  Box,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Header from "../components/core.components/Header";
import CheckboxSelect from "../components/editCourse.components/CheckboxSelect";
import IntegerCounter from "../components/editCourse.components/IntegerCounter";
import SecundaryBtn from "../components/core.components/SecundaryBtn";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import TeacherSelect from "../components/editCourse.components/TeacherSelect";
import CustomSnackbar from "../components/core.components/CustomSnackbar";

const EditCourse = () => {
  const location = useLocation();
  const { id, teacher } = location.state || {};

  const [courseName, setCourseName] = useState("");
  const [selectedOdbor, setSelectedOdbor] = useState([]);
  const [selectedRocnik, setSelectedRocnik] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [courseDescription, setCourseDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const [foto, setFoto] = useState(null);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [descriptionLength, setDescriptionLength] = useState();

  const [responseData, setResponseData] = useState("");

  const navigate = useNavigate();
  const quillRef = useRef(null);

  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");

  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/getTeachers",
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
        setTeacherOptions(data.records);
      } catch (error) {
        console.error(error);
      }
    };
    loadTeachers();
    if (id) loadCourseData();
  }, []);

  async function urlToFile(url, fileName, mimeType) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch the file from URL");
    }
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType || blob.type });
  }

  const loadCourseData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/getCourse/" + id
      );
      if (response.ok) {
        const responseData = await response.json();

        setCourseName(responseData.name);
        setCourseDescription(responseData.description);
        setDescriptionLength(courseDescription.length);
        setSelectedOdbor(responseData.disciplines.map((d) => d.name));
        setSelectedRocnik(responseData.year);
        setImagePreview(responseData.img_url);
        setSelectedTeachers(responseData.teachers);
        setLongDescription(responseData.long_description);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      setError(error.message);
      alert("Error loading courses: " + error.message);
    }
  };

  const handleSubmitCreateCourse = async (e) => {
    e.preventDefault();

    if (!courseName) {
      setOpenError(true);
      setError("Vyplňte názov kurzu!");
      return;
    }
    if (!selectedOdbor || selectedOdbor.length === 0) {
      setOpenError(true);
      setError("Vyberte odbor!");
      return;
    }
    if (!selectedRocnik) {
      setOpenError(true);
      setError("Vyberte ročník!");
      return;
    }
    if (!courseDescription) {
      setOpenError(true);
      setError("Vyplňte krátky popis kurzu!");
      return;
    }
    if (!foto && !id) {
      setOpenError(true);
      setError("Vyberte foto!");
      return;
    }
    if (!selectedTeachers) {
      setOpenError(true);
      setError("Vyberte učiteľov!");
      return;
    }
    if (!longDescription) {
      setOpenError(true);
      setError("Vyplňte dlhý popis kurzu!");
      return;
    }

    try {
      const formData = new FormData();
      const teachers = selectedTeachers.map((teacher) => teacher.id);

      if ((id && foto) || foto) formData.append("image", foto);
      formData.append("name", courseName);
      formData.append("description", courseDescription);
      formData.append("disciplines", JSON.stringify(selectedOdbor));
      formData.append("year", selectedRocnik);
      formData.append("teachers", JSON.stringify(teachers));

      const editor = quillRef.current.getEditor();
      const currentHtml = editor.root.innerHTML;
      formData.append("long_description", currentHtml);

      const response = await fetch(
        id
          ? "http://localhost:3000/api/course/editCourse/" + id
          : "http://localhost:3000/api/course/newCourse",
        {
          method: "POST",
          headers: {
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: formData,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setResponseData(responseData);
        setOpenSuccess(true);
        if (id) loadCourseData();
      } else {
        setOpenError(true);
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
      console.log(error);
      setOpenError(true);
    }
  };

  // Images edditing doesnt work!!!!!!!!!

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          backgroundColor: "white.main",
          minHeight: "100vh",
          py: "2rem",
          color: "black.main",
        }}
        className="light_gradient-background-animation"
      >
        <Container maxWidth="lg">
          <Paper sx={{ padding: 3, borderRadius: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <Typography variant="h3" className="font-gradient">
                {id ? "Upravovať existujuci kurz" : "Vytvoriť nový kurz"}
              </Typography>

              <Box sx={{ display: "flex", gap: "2rem" }}>
                <SecundaryBtn
                  onClick={() =>
                    navigate(`/NewCourse/${responseData.name}/content`, {
                      state: { responseData },
                    })
                  }
                >
                  Upravovať štrukturu
                </SecundaryBtn>
                <PrimaryBtn
                  style={{ width: "auto", color: "white" }}
                  onClick={handleSubmitCreateCourse}
                >
                  Uložiť
                </PrimaryBtn>
              </Box>
            </Box>

            <Typography
              variant="h5"
              sx={{ marginBottom: "2rem", color: "red" }}
            >
              {error}
            </Typography>

            <Grid2 container spacing={4}>
              {/* Názov kurzu */}
              <Grid2
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  id="course-name"
                  label="Názov kurzu"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Studiova technika"
                />
              </Grid2>

              {/* Odbor */}
              <Grid2 size={{ xs: 12, md: 4 }}>
                <CheckboxSelect
                  options={[
                    "Multimediálne technológie",
                    "Komunikačné a informačné technológie",
                  ]}
                  sx={{ width: "100%" }}
                  labelName="Odbor"
                  selectedItems={selectedOdbor}
                  setSelectedItems={setSelectedOdbor}
                />
              </Grid2>

              {/* Rocnik */}
              <Grid2
                size={{ xs: 12, md: 2 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IntegerCounter
                  labelName="Ročnik"
                  value={selectedRocnik}
                  setValue={setSelectedRocnik}
                />
              </Grid2>

              {/* Kratky popis */}
              <Grid2 size={{ xs: 12, md: 7 }}>
                <TextField
                  label="Kratký popis kurzu"
                  multiline
                  value={courseDescription}
                  onChange={(e) => {
                    setCourseDescription(e.target.value);
                    setDescriptionLength(e.target.value.length);
                  }}
                  minRows={3}
                  inputProps={{ maxLength: 254 }}
                  fullWidth
                  placeholder="Kurz je zamerany na..."
                />
                <Typography
                  sx={{ px: "1rem", fontSize: "0.8rem", color: "#999" }}
                >
                  Použite {descriptionLength} znakov z 254
                </Typography>
              </Grid2>
              {/* Upload foto */}
              <Grid2
                size={{ xs: 12, md: 2 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SecundaryBtn
                  component="label"
                  sx={{ width: "100%", textAlign: "center" }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <DriveFolderUploadIcon sx={{ mr: 1 }} />
                  Pridať foto
                </SecundaryBtn>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 3 }}>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Uploaded preview"
                    style={{
                      height: "auto",
                      width: "-webkit-fill-available",
                      borderRadius: "1rem",
                    }}
                  />
                )}
              </Grid2>
              {/* Vyber ucitelov */}
              <Grid2 size={{ xs: 12, md: 12 }}>
                <TeacherSelect
                  teacherOptions={teacherOptions}
                  selectedTeachers={selectedTeachers}
                  setSelectedTeachers={setSelectedTeachers}
                />{" "}
              </Grid2>
              {/* Editor */}
              <Grid2
                size={{ xs: 12, md: 12 }}
                sx={{
                  padding: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderRadius: "0.5rem",
                  minHeight: "300px",

                  "& .ql-toolbar": {
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderRadius: (theme) => theme.shape.borderRadius,
                  },
                  "& .ql-container": {
                    fontFamily: (theme) => theme.typography.fontFamily,
                    fontSize: "1rem",
                    fontWeight: "400",
                    height: "100%",
                    border: "none",
                    maxHeight: "300px",
                    overflow: "auto",
                    marginTop: "1rem",
                  },
                }}
              >
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={longDescription}
                  onChange={(content, delta, source, editor) =>
                    setLongDescription(content)
                  }
                  placeholder="Stručná osnova predmetu, odporúčaná literatúra atd..."
                />
              </Grid2>
            </Grid2>
          </Paper>
          <CustomSnackbar
            open={openError}
            setOpen={setOpenError}
            message={"Nastala chyba!"}
            severity={"error"}
          />
          <CustomSnackbar
            open={openSuccess}
            setOpen={setOpenSuccess}
            message={"Success!"}
            severity={"success"}
          />
        </Container>
      </Box>
    </>
  );
};
export default EditCourse;
