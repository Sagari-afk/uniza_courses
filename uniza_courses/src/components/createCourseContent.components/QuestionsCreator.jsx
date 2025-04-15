import { Box, Grid2, Typography } from "@mui/material";

import noQuestions from "../../assets/NoQuestions.svg";
import QuestionsList from "./QuestionsList";
import QuestionEditorWindow from "./QuestionEditorWindow";
const QuestionsCreator = ({
  edditingQuestion,
  questions,
  activeQuestion,
  setActiveQuestion,
  getQuestions,
}) => {
  return (
    <Grid2 my="2rem" textAlign={"center"} container spacing={2}>
      <Grid2 size={3} border={"2px solid #e7e7e7"} p={1} borderRadius={"1rem"}>
        <QuestionsList
          questions={questions}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
        />
      </Grid2>
      <Grid2
        size={9}
        borderRadius={"1rem"}
        display={"flex"}
        alignItems={!edditingQuestion && "center"}
        justifyContent={!edditingQuestion && "center"}
      >
        {edditingQuestion ? (
          <QuestionEditorWindow
            question={activeQuestion}
            setQuestion={setActiveQuestion}
            getQuestions={getQuestions}
          ></QuestionEditorWindow>
        ) : (
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            <Typography color={"#888"} textAlign={"center"}>
              Žiadná otázka nebola vybraná
            </Typography>
            <img
              src={noQuestions}
              style={{
                height: "8rem",
                width: "auto",
              }}
            />
          </Box>
        )}
      </Grid2>
    </Grid2>
  );
};

export default QuestionsCreator;
