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

import { toast } from "react-toastify";
import PresentationViewer from "../../components/createCourseContent.components/presentation/PresentationViewer";

const API_URL = import.meta.env.VITE_API_URL;

const CreatePresentationStep = () => {
  const [searchParams] = useSearchParams();
  const subtopicId = searchParams.get("subtopicId");
  const subtopicTitle = searchParams.get("subtopicTitle");
  const [stepId, setStepId] = useState(searchParams.get("stepId") || null);

  console.log("Step ID: ", stepId);

  const [stepTitle, setStepTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (stepId) getStep();
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
      setFileUrl(data.content);
      console.log("Data: ", data);
    } catch (error) {
      console.error("Error getting fileUrl:", error);
    }
  };

  const saveContent = useCallback(async () => {
    console.log("Saving fileUrl...");
    console.log("FileUrl: ", fileUrl);
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
            content: fileUrl,
            stepTitle,
            stepId,
            type: "presentation",
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
      console.error("Error saving fileUrl:", error);
      toast.error("Nastala chyba pri ulozeni kontentu");
    }
  }, [stepId, subtopicId, stepTitle, fileUrl]);

  const handlePresentationUpload = async (e) => {
    const file = e.target.files[0];
    console.log("File: ", file);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/courseStructure/upload-file`, {
        method: "POST",
        headers: {
          "x-access-token":
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken"),
        },
        body: formData,
      });

      const data = await res.json();
      if (data.error || !res.ok) {
        toast.error(data.error);
        return;
      }

      console.log("Data: ", data);
      setFileUrl(data.fileUrl);
      toast.success("Prezentácia bola nahraná");
    } catch (err) {
      toast.error("Nepodarilo sa nahrať prezentáciu");
      console.error("Upload error:", err);
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
                  {stepId
                    ? "Editovať krok - prezentacia"
                    : "Vytvoriť nový krok - prezentacia"}
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

                <Box display={"flex"} gap={2} justifyContent={"end"}>
                  <SecundaryBtn onClick={saveContent} style={{ width: "auto" }}>
                    Uložiť
                  </SecundaryBtn>
                  <input
                    type="file"
                    accept=".pptx,.pdf"
                    style={{ display: "none" }}
                    id="upload-input"
                    onChange={(e) => handlePresentationUpload(e)}
                  />

                  <label htmlFor="upload-input">
                    <SecundaryBtn
                      component="span"
                      style={{ width: "auto", cursor: "pointer" }}
                    >
                      Nahrať prezentáciu
                    </SecundaryBtn>
                  </label>
                </Box>
              </Box>
            </Box>
            {fileUrl && fileUrl !== "" && (
              <>
                <Typography sx={{ mb: 2 }}>
                  Nahraná prezentácia: {fileUrl.split("/").pop()}
                </Typography>
              </>
            )}
            <PresentationViewer fileUrl={fileUrl} />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreatePresentationStep;
