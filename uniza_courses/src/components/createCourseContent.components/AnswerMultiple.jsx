import { Checkbox, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

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
  const [isCorrect, setIsCorrect] = useState(
    openedQuestion || !!answer?.correctAnswer
  );
  const [answerIndex, setAnswerIndex] = useState(index + 1);

  const debouncedAnswerUpdate = useCallback(
    debounce(
      (answerText, isCorrect, answerId) =>
        answerUpdate(answerText, openedQuestion ? true : isCorrect, answerId),
      1000
    ),
    [answerUpdate]
  );

  useEffect(() => {
    if (answer) {
      setAnswerText(answer ? answer.contentFileName : "");
      setIsCorrect(openedQuestion || !!answer?.correctAnswer);
    }
  }, [answer]);

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <TextField
        fullWidth
        placeholder="Napíš odpoveď"
        label={openedQuestion ? "Odpoveď" : "Odpoveď č. " + answerIndex}
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
              answer.correctAnswer = isCorrect;
            }}
          />
        </>
      )}
    </Stack>
  );
};

export default AnswerMultiple;
