import { Box, Grid2, Typography } from "@mui/material";

import noQuestions from "../../assets/NoQuestions.svg";
import { useState } from "react";
import QuestionsList from "./QuestionsList";
import QuestionEditorWindow from "./QuestionEditorWindow";

const QuestionsCreator = ({ creatingNewQuestion, questions }) => {
  return (
    <Grid2 my="2rem" textAlign={"center"} container spacing={2}>
      <Grid2
        item
        size={3}
        xs={12}
        sm={6}
        border={"2px solid #e7e7e7"}
        p={1}
        borderRadius={"1rem"}
      >
        <QuestionsList questions={questions} />
      </Grid2>
      <Grid2
        item
        size={9}
        xs={12}
        sm={6}
        borderRadius={"1rem"}
        // border={"2px solid #e7e7e7"}
        display={"flex"}
        alignItems={!creatingNewQuestion && "center"}
        justifyContent={!creatingNewQuestion && "center"}
      >
        {creatingNewQuestion ? (
          <QuestionEditorWindow></QuestionEditorWindow>
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
