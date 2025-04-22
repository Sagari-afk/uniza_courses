import { Checkbox, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { debounce } from "lodash";

const AnswerMultiple = ({
  answer,
  handleAnswerDelete,
  index,
  answerUpdate,
  openedQuestion,
}) => {
  const [answerText, setAnswerText] = useState(
    answer ? answer.contentFileName : ""
  );
  console.log("AnswerMultiple answerText", answer);
  const [isCorrect, setIsCorrect] = useState(
    openedQuestion || !!answer?.isCorrect
  );
  const [answerId, setAnswerId] = useState(index + 1);

  const debouncedAnswerUpdate = useCallback(
    debounce(
      (answerText, isCorrect, answerId) =>
        answerUpdate(answerText, openedQuestion ? true : isCorrect, answerId),
      1000
    ),
    [answerUpdate]
  );

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <TextField
        fullWidth
        placeholder="Napíš odpoveď"
        label={openedQuestion ? "Odpoveď" : "Odpoveď č. " + answerId}
        value={answerText}
        onChange={(e) => {
          setAnswerText(e.target.value);
          debouncedAnswerUpdate(e.target.value, isCorrect, answer.id);
          answer.text = answerText;
        }}
      />
      {!openedQuestion && (
        <>
          <DeleteForeverIcon
            sx={{
              cursor: "pointer",
              color: "#888",
              "&:hover": {
                color: "#f44336",
              },
            }}
            onClick={() => {
              console.log("Deleting answer with id: ", answer.id);
              handleAnswerDelete(answer.id);
            }}
          />

          <Checkbox
            checked={isCorrect}
            onChange={(e) => {
              setIsCorrect(e.target.checked);
              debouncedAnswerUpdate(answerText, e.target.checked, answer.id);
              answer.isCorrect = isCorrect;
            }}
          />
        </>
      )}
    </Stack>
  );
};

export default AnswerMultiple;
