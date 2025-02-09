import {
  Box,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import CheckboxSelect from "../components/CheckboxSelect";
import IntegerCounter from "../components/IntegerCounter";
import SecundaryBtn from "../components/SecundaryBtn";
import PrimaryBtn from "../components/PrimaryBtn";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6, for the "snow" theme
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import StairsIcon from "@mui/icons-material/Stairs";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import TeacherSelect from "../components/TeacherSelect";
import CreateNewCourseBtn from "../components/CreateNewCourseBtn";
import { useNavigate } from "react-router-dom";

const CreateNewCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [selectedOdbor, setSelectedOdbor] = useState([]);
  const [selectedRocnik, setSelectedRocnik] = useState("");
  const [foto, setFoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [courseDescription, setCourseDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const navigate = useNavigate();

  const quillRef = useRef(null);

  // const actions = [
  //   {
  //     icon: <CollectionsBookmarkIcon />,
  //     name: "Nová tema",
  //     link: "/createNewCourse",
  //   },
  //   {
  //     icon: <DynamicFeedIcon />,
  //     name: "Nová podtema",
  //     link: "/createNewCourse",
  //   },
  //   { icon: <StairsIcon />, name: "Nový krok", link: "/createNewCourse" },
  // ];

  useEffect(() => {
    const load = async () => {
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
    load();
  }, []);

  const handleSubmitCreateCourse = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const teachers = selectedTeachers.map((teacher) => teacher.id);

      formData.append("image", foto);
      formData.append("name", courseName);
      formData.append("description", courseDescription);
      formData.append("disciplines", JSON.stringify(selectedOdbor)); // if it's an array or object, stringify it
      formData.append("year", selectedRocnik);
      formData.append("teachers", JSON.stringify(teachers)); // similarly stringify if needed

      const editor = quillRef.current.getEditor();
      const currentHtml = editor.root.innerHTML;
      formData.append("long_description", currentHtml);

      const response = await fetch(
        "http://localhost:3000/api/course/newCourse",
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
        alert("Kurz bol úspešne vytvorený");
        const responseData = await response.json();
        navigate(`/NewCourse/${responseData.name}/content`, {
          state: { responseData },
        });
      } else {
        alert("Nastala chyba pri vytváraní kurzu");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                Vytvoriť nový kurz
              </Typography>

              <Box sx={{ display: "flex", gap: "2rem" }}>
                {/* <CreateNewCourseBtn
                  actions={actions}
                  icon={<AddCircleOutlineIcon />}
                  direction="left"
                  sx={{
                    zIndex: "unset",
                    "& .MuiSpeedDial-fab": {
                      zIndex: "unset",
                    },
                  }}
                  sx_actions={{ zIndex: "unset" }}
                /> */}
                <PrimaryBtn
                  style={{ width: "auto", color: "white" }}
                  onClick={handleSubmitCreateCourse}
                >
                  Uložiť kurz
                </PrimaryBtn>
              </Box>
            </Box>

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
                    "Multimedialne technologie",
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
                  onChange={(e) => setCourseDescription(e.target.value)}
                  minRows={3}
                  fullWidth
                  placeholder="Kurz je zamerany na..."
                />
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
        </Container>
      </Box>
    </>
  );
};
export default CreateNewCourse;
