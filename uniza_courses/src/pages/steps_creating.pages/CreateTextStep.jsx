import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid2,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/core.components/Header";
import SecundaryBtn from "../../components/core.components/SecundaryBtn";
import { useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";

const CreateTextStep = () => {
  const [searchParams] = useSearchParams();
  const subtopicId = searchParams.get("subtopicId");
  const subtopicTitle = searchParams.get("subtopicTitle");
  const [stepTitle, setStepTitle] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState(
    localStorage.getItem("editorContent") || ""
  );

  // нужно брать с юэкэнда по айдишнику инфо о шаге

  const config = {
    imageUploadURL: "http://localhost:3000/api/courseStructure/upload-image",
    videoUploadURL: "http://localhost:3000/api/courseStructure/upload-video",
    fileUploadURL: "http://localhost:3000/api/courseStructure/upload-file", // file doesn't work
    imageUploadMethod: "POST",
    imageAllowedTypes: ["jpeg", "jpg", "png"],
    fileAllowedTypes: ["*"],
    fileUploadMethod: "POST",
    videoUploadMethod: "POST",
  };

  useEffect(() => {
    localStorage.setItem("editorContent", content); //нужно что бы дописывало айдишник шага и по нему потом доставать
  }, [content]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (content) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [content]);

  const saveContent = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/courseStructure/save-content",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({ subtopicId, content, stepTitle }),
        }
      );
      const data = await res.json();
      if (data.error || !res.ok) {
        alert(data.error);
        return;
      }
      alert("Content saved successfully");
    } catch (error) {
      console.error("Error saving content:", error);
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
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Typography variant="h3" className="font-gradient">
                  Vytvoriť nový krok - text
                </Typography>
                <TextField
                  label="Názov kroku"
                  variant="outlined"
                  value={stepTitle}
                  onChange={(e) => setStepTitle(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Pre podtemu {subtopicTitle}</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isPreview}
                      onChange={(e) => setIsPreview(e.target.checked)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Preview"
                />
                <SecundaryBtn onClick={saveContent}>Uložiť</SecundaryBtn>
              </Box>
            </Box>

            {isPreview ? (
              <Box
                className="fr-view"
                border={(theme) => `1px solid ${theme.palette.divider}`}
                borderRadius={(theme) => theme.shape.borderRadius}
                padding={2}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <Box>
                <FroalaEditorComponent
                  tag="textarea"
                  model={content}
                  config={config}
                  onModelChange={(newContent) => setContent(newContent)}
                />
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreateTextStep;
