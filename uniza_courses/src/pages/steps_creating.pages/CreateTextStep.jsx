import {
  Box,
  Container,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/core.components/Header";
import SecundaryBtn from "../../components/core.components/SecundaryBtn";
import { useSearchParams } from "react-router-dom";

import React, { useCallback, useEffect, useRef, useState } from "react";

import TipTap from "../../components/createCourseContent.components/tiptap/TipTap";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const CreateTextStep = () => {
  const [searchParams] = useSearchParams();
  const subtopicId = searchParams.get("subtopicId");
  const subtopicTitle = searchParams.get("subtopicTitle");
  const [stepId, setStepId] = useState(searchParams.get("stepId") || null);

  console.log("Step ID: ", stepId);

  const [stepTitle, setStepTitle] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState(" ");

  const [isMounted, setIsMounted] = useState(false);

  // const config = {
  //   imageUploadURL: "${API_URL}/api/courseStructure/upload-image",
  //   videoUploadURL: "${API_URL}/api/courseStructure/upload-video",
  //   fileUploadURL: "${API_URL}/api/courseStructure/upload-file", // file doesn't work
  //   imageUploadMethod: "POST",
  //   imageAllowedTypes: ["jpeg", "jpg", "png"],
  //   fileAllowedTypes: ["*"],
  //   fileUploadMethod: "POST",
  //   videoUploadMethod: "POST",
  // };

  useEffect(() => {
    if (stepId) getStep();
    setIsMounted(true);
  }, []);

  const getStep = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/courseStructure/getStep/${stepId}`,
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
      console.log("Data: ", data);
    } catch (error) {
      console.error("Error getting content:", error);
    }
  };

  const saveContent = useCallback(async () => {
    console.log("Saving content...");
    console.log("Content: ", content);
    try {
      const res = await fetch(
        stepId
          ? `${API_URL}/api/courseStructure/update-content`
          : `${API_URL}/api/courseStructure/save-content`,
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
                  {stepId
                    ? "Editovať krok - text"
                    : "Vytvoriť nový krok - text"}
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
                <TipTap content={content} setContent={setContent} />
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreateTextStep;
