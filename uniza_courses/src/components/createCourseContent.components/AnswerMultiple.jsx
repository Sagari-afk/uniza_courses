import { Checkbox, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AnswerMultiple = ({
  answer,
  handleAnswerDelete,
  setQuestion,
  lastAnswerId,
  index,
}) => {
  const [answerText, setAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerId, setAnswerId] = useState(index + 1);

  // Dorobit delete answer!!!!

  useEffect(() => {
    answer.text = answerText;
    answer.isCorrect = isCorrect;
  }, [answerText, isCorrect]);

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <TextField
        fullWidth
        placeholder="Napíš odpoveď"
        label={"Odpoveď č. " + answerId}
        value={answerText}
        onChange={(e) => {
          setAnswerText(e.target.value);
        }}
      />
      <DeleteForeverIcon
        sx={{
          cursor: "pointer",
          color: "#888",
          "&:hover": {
            color: "#f44336",
          },
        }}
        onClick={() => {
          console.log("Deleting answer with id: ", answerId);
          handleAnswerDelete(answer.id);
        }}
      />
      <FileUploadIcon
        sx={{
          cursor: "pointer",
          color: "#888",
          "&:hover": {
            color: "secondary.main",
          },
        }}
      />
      <Checkbox
        checked={isCorrect}
        onChange={() => {
          setIsCorrect(!isCorrect);
        }}
      />
    </Stack>
  );
};

export default AnswerMultiple;
