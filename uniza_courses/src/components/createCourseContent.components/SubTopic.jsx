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
      }))
      .sort((a, b) => a.id - b.id)
  ); // for dnd
  const [stepOrderEdditing, setStepOrderEdditing] = React.useState(false);
  const [stepType, setStepType] = React.useState("text");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const navigate = useNavigate();
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
        }))
        .sort((a, b) => a.id - b.id)
    );
  }, [subtopic]);

  const handleSubmitEditSubtopic = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/editSubtopic/",
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
        alert("Podtema bola upravena");
        load();
      } else {
        alert("Nastala chyba");
      }
    } catch (error) {
      console.log(error);
      alert("Nastala chyba");
    }
  };

  const handleSubmitDeleteSubtopic = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/deleteSubtopic/" +
          subtopic.subtopicId,
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
        alert("Podtema bola vymazana");
        load();
      } else {
        alert("Nastala chyba");
      }
    } catch (error) {
      console.log(error);
      alert("Nastala chyba");
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
                        label="Dokument pdf"
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
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                  accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                />
              </Grid2>
              {/* For text */}
              {stepType === "text" && (
                <PrimaryBtn
                  onClick={(e) => {
                    const data = {
                      subtopicId: subtopic.subtopicId,
                      subtopicTitle: subtopic.title,
                    };
                    const queryParams = new URLSearchParams(data).toString();
                    window.open(
                      `/CourseContent/createStep/text?${queryParams}`,
                      "_blank"
                    );
                  }}
                >
                  Presmerovať na vytvorenie textu
                </PrimaryBtn>
              )}
              {/* For video*/}
              {stepType === "video" && (
                <PrimaryBtn>
                  Vybrať video súbor
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                    accept="video/*"
                  />
                </PrimaryBtn>
              )}
              {/* For pdf */}
              {stepType === "pdf" && (
                <PrimaryBtn>
                  Vybrať pdf súbor
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                    accept="application/pdf"
                  />
                </PrimaryBtn>
              )}
              {/* For pptx */}
              {stepType === "pptx" && (
                <PrimaryBtn>
                  Vybrať pptx súbor
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                    accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  />
                </PrimaryBtn>
              )}
              {/* For test */}
              {stepType === "test" && (
                <PrimaryBtn
                  onClick={(e) => {
                    navigate(linkTo, {
                      state: {
                        subtopicId: subtopic.subtopicId,
                        stepType: "test",
                      },
                    });
                  }}
                >
                  Presmerovať na vytvorenie testu
                </PrimaryBtn>
              )}
            </ModalCreate>

            <ModalCreate
              btn={
                <EditIcon sx={{ color: "secondary.main", fontSize: "2rem" }} />
              }
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
              <PrimaryBtn
                onClick={(e) => {
                  handleSubmitEditSubtopic(
                    e,
                    subtopicTitle,
                    subtopic.subtopicId
                  );
                }}
              >
                Upraviť
              </PrimaryBtn>
            </ModalCreate>

            <ModalCreate
              btn={
                <DeleteForeverIcon
                  sx={{ color: "#ff7c7c", fontSize: "2rem" }}
                />
              }
            >
              <Typography variant="h4">Vymazat temu</Typography>
              <Typography variant="h6">
                Ste si isti že chcete vymazať podtemu {subtopic.title}?
              </Typography>
              <PrimaryBtn onClick={(e) => handleSubmitDeleteSubtopic(e)}>
                Vymazať temu
              </PrimaryBtn>
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
