import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid2,
  TextField,
} from "@mui/material";
import React from "react";
import {
  arrayMove,
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
import SubTopic from "./SubTopic";
import { closestCorners, DndContext } from "@dnd-kit/core";

const Topic = ({ id, topic, load }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [topicTitle, setTopicTitle] = React.useState(topic.title); // for editing topic title
  const [subtopicTitle, setSubtopicTitle] = React.useState(""); // for creating new subtopic
  const [subtopics, setSubtopics] = React.useState(
    topic.subtopics
      .map((subtopic) => ({
        id: subtopic.order,
        subtopicId: subtopic.id,
        title: subtopic.title,
        steps: subtopic.steps,
      }))
      .sort((a, b) => a.id - b.id)
  ); // for dnd
  const [subtopicOrderEdditing, setSubtopicOrderEdditing] =
    React.useState(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleSubmitCreateSubTopic = async (e, subtopicTitle, topicId) => {
    e.preventDefault();

    try {
      const payload = {
        title: subtopicTitle,
        topicId: topicId,
      };
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/newSubtopic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Podtema bola úspešne vytvorena");
        "Subtopic created", data;
      } else {
        alert("Nastala chyba pri vytváraní podtemy");
      }
      load();
    } catch (error) {
      error;
      alert("Nastala chyba pri vytváraní podtemy");
    }
  };

  const handleSubmitEditTopic = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/editTopic/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            topicId: topic.topicId,
            title: topicTitle,
          }),
        }
      );
      if (response.ok) {
        alert("Tema bola upravena");
        load();
      } else {
        alert("Nastala chyba");
      }
    } catch (error) {
      error;
      alert("Nastala chyba");
    }
  };

  const handleSubmitDeleteTopic = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/deleteTopic/" +
          topic.topicId,
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
        alert("Tema bola vymazana");
        load();
      } else {
        alert("Nastala chyba");
      }
    } catch (error) {
      error;
      alert("Nastala chyba");
    }
  };

  const handleEditSubtopicPos = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/editSubtopicOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            subtopics: subtopics,
          }),
        }
      );
      if (response.ok) {
        alert("Podtema bola tosunuta");
      } else {
        alert("Nastala chyba");
      }
    } catch (error) {
      error;
      alert("Nastala chyba");
    }
  };

  React.useEffect(() => {
    setSubtopics(
      topic.subtopics
        .map((subtopic) => ({
          id: subtopic.order,
          subtopicId: subtopic.id,
          title: subtopic.title,
          steps: subtopic.steps,
        }))
        .sort((a, b) => a.id - b.id)
    );
  }, [topic]);

  React.useEffect(() => {
    if (subtopicOrderEdditing) {
      handleEditSubtopicPos();
      setSubtopicOrderEdditing(false);
    }
  }, [subtopics]);

  const getTopicPos = (id) =>
    subtopics.findIndex((subtopic) => subtopic.id === id);

  const handleDragEnd = ({ active, over }) => {
    "Drag end", active.id, over.id;
    if (!over || !active || active.id === over.id) {
      return;
    }
    setSubtopics((subtopics) => {
      const oldIndex = getTopicPos(active.id);
      const newIndex = getTopicPos(over.id);

      return arrayMove(subtopics, oldIndex, newIndex);
    });
    setSubtopicOrderEdditing(true);
  };

  return (
    <Accordion ref={setNodeRef} {...attributes} style={style} key={topic.id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          {/* Dedicated drag handle */}
          <Box {...listeners} sx={{ cursor: "grab" }}>
            <DragIndicatorIcon />
          </Box>
          <Typography variant="h5">{topic.title}</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* CREATE NEW SUBTOPIC */}
            <ModalCreate
              btn={
                <CreateNewFolderIcon
                  sx={{ color: "#9cdb93", fontSize: "2rem" }}
                />
              }
            >
              <Typography variant="h4">Nová podtema</Typography>
              <Typography variant="h6">Pre temu {topic.title}</Typography>

              <Grid2
                size={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  fullWidth
                  id="course-name"
                  label="Nazov"
                  value={subtopicTitle}
                  onChange={(e) => setSubtopicTitle(e.target.value)}
                />
              </Grid2>
              <PrimaryBtn
                onClick={(e) => {
                  handleSubmitCreateSubTopic(e, subtopicTitle, topic.topicId);
                }}
              >
                Vytvoriť
              </PrimaryBtn>
            </ModalCreate>

            <ModalCreate
              btn={
                <EditIcon sx={{ color: "secondary.main", fontSize: "2rem" }} />
              }
            >
              <Typography variant="h4">Upravit temu</Typography>
              <Typography variant="h6">Pre temu {topic.title}</Typography>
              <TextField
                fullWidth
                id="course-name"
                label="Nazov"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
              <PrimaryBtn
                onClick={(e) => {
                  handleSubmitEditTopic(e, topicTitle, topic.topicId);
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
                Ste si isti že chcete vymazať temu {topic.title}?
              </Typography>
              <PrimaryBtn onClick={(e) => handleSubmitDeleteTopic(e)}>
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
          <SortableContext
            items={subtopics}
            strategy={verticalListSortingStrategy}
          >
            {subtopics?.length ? (
              subtopics.map((subtopic) => (
                <SubTopic
                  id={subtopic.id}
                  subtopic={subtopic}
                  key={subtopic.id}
                  load={load}
                />
              ))
            ) : (
              <Typography variant="h6">Žiadne podtemy</Typography>
            )}
          </SortableContext>
        </DndContext>
      </AccordionDetails>
    </Accordion>
  );
};

export default Topic;
