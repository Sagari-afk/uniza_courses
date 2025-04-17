import { Checkbox, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { debounce } from "lodash";

const AnswerMultiple = ({
  answer,
  handleAnswerDelete,
  setQuestion,
  lastAnswerId,
  index,
  answerUpdate,
}) => {
  const [answerText, setAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerId, setAnswerId] = useState(index + 1);

  const debouncedAnswerUpdate = useCallback(
    debounce(
      (answerText, isCorrect, answerId) =>
        answerUpdate(answerText, isCorrect, answerId),
      1000
    ),
    [answerUpdate]
  );

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <TextField
        fullWidth
        placeholder="Napíš odpoveď"
        label={"Odpoveď č. " + answerId}
        value={answerText}
        onChange={(e) => {
          setAnswerText(e.target.value);
          debouncedAnswerUpdate(e.target.value, isCorrect, answer.id);
          answer.text = answerText;
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
      {/* <FileUploadIcon
        sx={{
          cursor: "pointer",
          color: "#888",
          "&:hover": {
            color: "secondary.main",
          },
        }}
      /> */}
      <Checkbox
        checked={isCorrect}
        onChange={(e) => {
          setIsCorrect(e.target.checked);
          debouncedAnswerUpdate(answerText, e.target.checked, answer.id);
          answer.isCorrect = isCorrect;
        }}
      />
    </Stack>
  );
};

export default AnswerMultiple;
