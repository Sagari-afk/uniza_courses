import {
  Box,
  CircularProgress,
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

import React, { useCallback, useEffect, useRef, useState } from "react";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";

import "froala-editor/js/froala_editor.pkgd.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { toast } from "react-toastify";
import { set } from "lodash";

import FroalaTextEditor from "../../components/createCourseContent.components/FroalaTextEditor";
const CreateTextStep = () => {
  const [searchParams] = useSearchParams();
  const subtopicId = searchParams.get("subtopicId");
  const subtopicTitle = searchParams.get("subtopicTitle");
  const [stepId, setStepId] = useState(searchParams.get("stepId") || null);

  const [stepTitle, setStepTitle] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState(" ");
  const editorRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

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
    if (stepId) getStep();
    setIsMounted(true);
  }, []);

  const getStep = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/courseStructure/getStep/" + stepId,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      const data = await res.json();
      if (data.error || !res.ok) {
        toast.error(data.error);
        return;
      }
      setStepTitle(data.title);
      setContent(data.content);

      // const resFile = await fetch(
      //   "http://localhost:3000/api/courseStructure/getHtmlContent/" +
      //     data.fileName,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-access-token":
      //         localStorage.getItem("authToken") ||
      //         sessionStorage.getItem("authToken"),
      //     },
      //   }
      // );
      // const file = await resFile.json();
      // if (file.error || !resFile.ok) {
      //   toast.error(file.error);
      //   return;
      // }
      // console.log(file.content);
      // setContent(file.content);
    } catch (error) {
      console.error("Error getting content:", error);
    }
  };

  useEffect(() => {
    console.log("Content changed: ", content);
    sessionStorage.setItem("editorContent" + subtopicId, content);
    console.log("Meh: ", content);
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
  }, []);

  const saveContent = useCallback(async () => {
    console.log("Saving content...");
    console.log("Content: ", content);
    try {
      const res = await fetch(
        stepId
          ? "http://localhost:3000/api/courseStructure/update-content"
          : "http://localhost:3000/api/courseStructure/save-content",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            subtopicId,
            content,
            stepTitle,
            stepId,
            type: "text",
          }),
        }
      );
      const data = await res.json();
      setStepId(data.id);
      console.log("data: ", data);
      if (data.error || !res.ok) {
        toast.error(data.error);
        return;
      }
      toast.success("Content saved successfully");
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Nastala chyba pri ulozeni kontentu");
    }
  }, [stepId, subtopicId, stepTitle, content]);

  useEffect(() => {
    if (editorRef.current) {
      console.log(editorRef.current);
    } else {
      console.warn("Editor not yet initialized.");
    }
  }, [editorRef.current]);

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
                {isMounted && content && (
                  <FroalaEditorComponent
                    tag="textarea"
                    model={content}
                    config={config}
                    onModelChange={(newContent) => setContent(newContent)}
                    onInitialized={(editorInstance) => {
                      editorRef.current = editorInstance;
                    }}
                  />
                )}
                {/* <FroalaTextEditor
                  content={content}
                  setContent={setContent}
                  sendContent={saveContent}
                  config={config}
                  type="text"
                /> */}
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreateTextStep;
