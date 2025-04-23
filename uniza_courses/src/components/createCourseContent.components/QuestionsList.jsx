import { Box, Typography } from "@mui/material";
import QuestionInSideMenu from "./QuestionInSideMenu";

const QuestionsList = ({
  questions,
  setCreatingNewQuestion,
  activeQuestion,
  setActiveQuestion,
  handleQuestionDelete,
}) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      p={1}
      maxHeight={"60vh"}
      overflow={"auto"}
    >
      {questions && questions.length > 0 ? (
        questions.map((question, index) => (
          <QuestionInSideMenu
            question={question}
            index={index}
            key={question.id}
            selected={question?.id === activeQuestion?.id}
            handleQuestionDelete={handleQuestionDelete}
            onClick={() => {
              console.log("Question clicked: ", question);
              setActiveQuestion(question);
            }}
          />
        ))
      ) : (
        <Typography color={"#888"}>Nie sú otázky</Typography>
      )}
    </Box>
  );
};

export default QuestionsList;
