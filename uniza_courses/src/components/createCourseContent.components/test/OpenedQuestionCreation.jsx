import { TextField } from "@mui/material";
import { useState } from "react";

const OpenedQuestionCreation = ({ questionId }) => {
  const [answerText, setAnswerText] = useState("");

  return (
    <TextField
      fullWidth
      placeholder="Napíš spravnú odpoveď"
      label="Spravná odpoveď"
      value={answerText}
      onChange={(e) => {
        setAnswerText(e.target.value);
      }}
    />
  );
};

export default OpenedQuestionCreation;
