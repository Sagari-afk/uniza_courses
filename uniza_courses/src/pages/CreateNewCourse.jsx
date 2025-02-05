import {
  Box,
  Container,
  Grid,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import CheckboxSelect from "../components/CheckboxSelect";
import IntegerCounter from "../components/IntegerCounter";
import SecundaryBtn from "../components/SecundaryBtn";
import PrimaryBtn from "../components/PrimaryBtn";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6, for the "snow" theme
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CreateNewCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [selectedOdbor, setSelectedOdbor] = useState([]);
  const [selectedRocnik, setSelectedRocnik] = useState("");
  const [foto, setFoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
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
      >
        <Container maxWidth="lg">
          <Paper sx={{ padding: 3, marginTop: 3, borderRadius: "1rem" }}>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Typography variant="h3" gutterBottom className="font-gradient">
                Vytvoriť nový kurz
              </Typography>

              <AddCircleOutlineIcon
                sx={{ fontSize: "3rem", color: "primary.dark" }}
              />
            </Box>

            <Grid2 container spacing={4}>
              {/* Názov kurzu */}
              <Grid2
                size={{ xs: 12, md: 5 }}
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
                    "Komunikacne technologie",
                  ]}
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
                  labelName="Rocnik"
                  value={selectedRocnik}
                  setValue={setSelectedRocnik}
                />
              </Grid2>

              {/* Kratky popis */}
              <Grid2 size={{ xs: 12, md: 7 }}>
                <TextField
                  label="Kratky popis kurzu"
                  multiline
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
                  theme="snow"
                  value={editorContent}
                  onChange={setEditorContent}
                  placeholder="Stručná osnova predmetu, odporúčaná literatúra atd..."
                />
              </Grid2>
              <PrimaryBtn style={{ width: "auto", color: "white" }}>
                Uložiť kurz
              </PrimaryBtn>
            </Grid2>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
export default CreateNewCourse;
