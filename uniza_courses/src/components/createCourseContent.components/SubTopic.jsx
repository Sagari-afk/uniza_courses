import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid2,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import ModalCreate from "./ModalCreate";
import PrimaryBtn from "../core.components/PrimaryBtn";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Step from "./Step";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const SubTopic = ({ id, subtopic, load }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [subtopicTitle, setSubtopicTitle] = React.useState(subtopic.title); // for editing subtopic title
  const [steps, setSteps] = React.useState(
    subtopic.steps
      .map((step) => ({
        id: step.order,
        subtopicId: step.id,
        title: step.title,
        type: step.type,
      }))
      .sort((a, b) => a.id - b.id)
  ); // for dnd
  const [stepOrderEdditing, setStepOrderEdditing] = React.useState(false);
  const [stepType, setStepType] = React.useState("text");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  React.useEffect(() => {
    setSteps(
      steps
        .map((step) => ({
          id: step.order,
          subtopicId: step.id,
          title: step.title,
          type: step.type,
        }))
        .sort((a, b) => a.id - b.id)
    );
  }, [subtopic]);

  const handleSubmitEditSubtopic = async (e) => {
    try {
      const response = await fetch(
        `${API_URL}/api/courseStructure/editSubtopic/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            subtopicId: subtopic.subtopicId,
            title: subtopicTitle,
          }),
        }
      );
      if (response.ok) {
        toast.success("Podtema bola upravena");
        load();
      } else {
        throw new Error("Failed to edit subtopic");
      }
    } catch (error) {
      console.log(error);
      toast.error("Nastala chyba pri redagovani podtemy");
    }
  };

  const handleSubmitDeleteSubtopic = async (e) => {
    try {
      const response = await fetch(
        `${API_URL}/api/courseStructure/deleteSubtopic/${subtopic.subtopicId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      if (response.ok) {
        toast.success("Podtema bola vymazana");
        load();
      } else {
        throw new Error("Failed to delete subtopic");
      }
    } catch (error) {
      console.log(error);
      toast.error("Nastala chyba pri vymazavani podtemy");
    }
  };

  React.useEffect(() => {
    if (stepOrderEdditing) {
      handleEditStepPos();
      setStepOrderEdditing(false);
    }
  }, [steps]);

  const getTopicPos = (id) => steps.findIndex((step) => step.id === id);

  const handleDragEnd = ({ active, over }) => {
    console.log("Drag end", active, over);
    if (!over || !active || active.id === over.id) {
      return;
    }
    setSteps((steps) => {
      const oldIndex = getTopicPos(active.id);
      const newIndex = getTopicPos(over.id);

      return arrayMove(steps, oldIndex, newIndex);
    });
    setStepOrderEdditing(true);
  };

  return (
    <Accordion ref={setNodeRef} {...attributes} style={style} key={id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {" "}
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          {/* Dedicated drag handle */}
          <Box {...listeners} sx={{ cursor: "grab" }}>
            <DragIndicatorIcon />
          </Box>
          <Typography variant="h5">{subtopic.title}</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* CREATE NEW SUBTOPIC */}
            <ModalCreate
              btn={
                <CreateNewFolderIcon
                  sx={{ color: "#9cdb93", fontSize: "2rem" }}
                />
              }
              handleSubmitModal={() => {
                const data = {
                  subtopicId: subtopic.subtopicId,
                  subtopicTitle: subtopic.title,
                };
                const queryParams = new URLSearchParams(data).toString();
                window.open(
                  stepType === "pdf"
                    ? `/CourseContent/createStep/presentation?${queryParams}`
                    : stepType === "text"
                    ? `/CourseContent/createStep/text?${queryParams}`
                    : `/CourseContent/createStep/test?${queryParams}`,
                  "_blank"
                );
              }}
              submitBtnText="Vytvoriť"
            >
              <Typography variant="h4">Nový krok</Typography>
              <Typography variant="h6">Pre podtemu {subtopic.title}</Typography>

              <Grid2
                size={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Typ kroku
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={stepType}
                    onChange={(e) => setStepType(e.target.value)}
                  >
                    <Box>
                      <FormControlLabel
                        value="text"
                        control={<Radio />}
                        label="Text"
                      />
                      {/* <FormControlLabel
                        value="video"
                        control={<Radio />}
                        label="Video"
                        />
                        <FormControlLabel
                          value="pdf"
                          control={<Radio />}
                          label="Prezentacia"
                        />
                    </Box>
                    <Box>
                      <FormControlLabel
                        value="pptx"
                        control={<Radio />}
                        label="Prezentacia pptx"
                      /> */}
                      <FormControlLabel
                        value="test"
                        control={<Radio />}
                        label="Test"
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Grid2>
            </ModalCreate>

            <ModalCreate
              btn={
                <EditIcon sx={{ color: "secondary.main", fontSize: "2rem" }} />
              }
              handleSubmitModal={handleSubmitEditSubtopic}
              submitBtnText="Upraviť"
              submitModalFuncParams={[subtopicTitle, subtopic.subtopicId]}
            >
              <Typography variant="h4">Upravit podtemu</Typography>
              <Typography variant="h6">Pre podtemu {subtopic.title}</Typography>
              <TextField
                fullWidth
                id="course-name"
                label="Nazov"
                value={subtopicTitle}
                onChange={(e) => setSubtopicTitle(e.target.value)}
              />
            </ModalCreate>

            <ModalCreate
              btn={
                <DeleteForeverIcon
                  sx={{ color: "#ff7c7c", fontSize: "2rem" }}
                />
              }
              handleSubmitModal={handleSubmitDeleteSubtopic}
              submitBtnText="Vymazať"
            >
              <Typography variant="h4">Vymazať podtemu</Typography>
              <Typography variant="h6">
                Ste si isti že chcete vymazať podtemu {subtopic.title}?
              </Typography>
            </ModalCreate>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <SortableContext items={steps} strategy={verticalListSortingStrategy}>
            {subtopic.steps?.length ? (
              subtopic.steps.map((step) => (
                <Step
                  subtopic={subtopic}
                  step={step}
                  key={step.id}
                  id={step.id}
                  load={load}
                />
              ))
            ) : (
              <Typography variant="h6">Žiadne kroky</Typography>
            )}
          </SortableContext>
        </DndContext>
      </AccordionDetails>
    </Accordion>
  );
};

export default SubTopic;
