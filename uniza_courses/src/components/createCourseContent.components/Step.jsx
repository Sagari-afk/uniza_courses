import { Typography, Box, Grid2, TextField } from "@mui/material";
import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CSS } from "@dnd-kit/utilities";

import ModalCreate from "./ModalCreate";
import PrimaryBtn from "../core.components/PrimaryBtn";
import { useSortable } from "@dnd-kit/sortable";
import { toast } from "react-toastify";

const Step = ({ subtopic, step, id, load }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [stepTitle, setStepTitle] = React.useState(step.title);
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  console.log("Step: ", step);

  const handleSubmitDeleteStep = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/deleteStep/" + id,
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
        toast.success("Krok bol vymazan");
        load();
      } else {
        throw new Error("Failed to delete step");
      }
    } catch (error) {
      console.log(error);
      toast.error("Nastala chyba pri vymazavani kroku");
    }
  };

  // Steps DND doesn't work!!!!!!!!!!!!

  return (
    <Box
      sx={{ display: "flex", gap: 3, alignItems: "center", pl: 4 }}
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <Box {...listeners} sx={{ cursor: "grab" }}>
        <DragIndicatorIcon />
      </Box>
      <Typography fontSize={"1.3rem"}>{step.title}</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <EditIcon
          sx={{ color: "secondary.main", fontSize: "1.5rem" }}
          onClick={(e) => {
            const data = {
              subtopicId: subtopic.subtopicId,
              subtopicTitle: subtopic.title,
              stepId: step.id,
            };
            const queryParams = new URLSearchParams(data).toString();
            window.open(
              `/CourseContent/createStep/text?${queryParams}`,
              "_blank"
            );
          }}
        />

        <ModalCreate
          btn={
            <DeleteForeverIcon sx={{ color: "#ff7c7c", fontSize: "1.5rem" }} />
          }
        >
          <Typography variant="h4">Vymazat krok</Typography>
          <Typography variant="h6">
            Ste si isti že chcete vymazať krok {step.title}?
          </Typography>
          <PrimaryBtn onClick={(e) => handleSubmitDeleteStep(e)}>
            Vymazať krok
          </PrimaryBtn>
        </ModalCreate>
      </Box>
    </Box>
  );
};

export default Step;
