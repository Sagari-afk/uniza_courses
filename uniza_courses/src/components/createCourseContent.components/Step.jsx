import { Typography, Box, Grid2, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CSS } from "@dnd-kit/utilities";

import ModalCreate from "./ModalCreate";
import { useSortable } from "@dnd-kit/sortable";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Step = ({ subtopic, step, id, load }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const [stepFull, setStepFull] = useState(step);

  const getStep = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/courseStructure/getStep/${step.id}`,
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
      if (!data || !res || data?.error || !res?.ok) {
        toast.error(data?.error);
        return;
      }
      setStepFull(data);
    } catch (error) {
      console.log("Error getting content:", error);
      toast.error("Error getting content");
    }
  };

  const handleSubmitDeleteStep = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/courseStructure/deleteStep/$id`,
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

  useEffect(() => {
    const fetchAll = async () => {
      getStep();
    };
    fetchAll();
  }, [id]);

  // Steps DND doesn't work!!!!!!!!!!!!

  return (
    <Box
      sx={{ display: "flex", gap: 3, alignItems: "center", pl: 4 }}
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      {/* <Box {...listeners} sx={{ cursor: "grab" }}>
        <DragIndicatorIcon />
      </Box> */}
      <Typography fontSize={"1.3rem"}>- {step.title}</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <EditIcon
          sx={{ color: "secondary.main", fontSize: "1.5rem" }}
          onClick={(e) => {
            const data = {
              subtopicId: subtopic.subtopicId,
              subtopicTitle: subtopic.title,
              stepId: step.id,
              stepTitle: step.title,
            };
            const queryParams = new URLSearchParams(data).toString();
            if (stepFull.type === "text") {
              window.open(
                `/CourseContent/createStep/text?${queryParams}`,
                "_blank"
              );
            } else if (stepFull.type === "test") {
              window.open(
                `/CourseContent/createStep/test?${queryParams}`,
                "_blank"
              );
            }
          }}
        />

        <ModalCreate
          btn={
            <DeleteForeverIcon sx={{ color: "#ff7c7c", fontSize: "1.5rem" }} />
          }
          handleSubmitModal={handleSubmitDeleteStep}
          submitBtnText="Vymazať krok"
        >
          <Typography variant="h4">Vymazat krok</Typography>
          <Typography variant="h6">
            Ste si isti že chcete vymazať krok {step.title}?
          </Typography>
        </ModalCreate>
      </Box>
    </Box>
  );
};

export default Step;
