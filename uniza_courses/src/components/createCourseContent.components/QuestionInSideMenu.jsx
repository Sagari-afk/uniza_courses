import { Box, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalCreate from "./ModalCreate";

const QuestionInSideMenu = ({
  question,
  index,
  onClick,
  selected,
  handleQuestionDelete,
}) => {
  console.log("QuestionInSideMenu question: ", question);
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        cursor: "pointer",
        borderRadius: "1rem",
        padding: "0.5rem",
        background: selected
          ? "linear-gradient(94deg, #df6690 11.3%, #ffc65a 101.52%)"
          : "transparent",
        color: selected ? "#fff" : "#df6690",
        border: selected ? "none" : " 2px solid #df6690",

        "&:hover": {
          background: selected
            ? "linear-gradient(94deg,rgb(214, 91, 134) 11.3%,rgb(228, 172, 69) 101.52%)"
            : "#FCF7F9",
        },
      }}
    >
      <Typography fontWeight={700}>Otázka {index + 1}</Typography>
      <ModalCreate
        btn={
          <DeleteForeverIcon
            sx={{
              cursor: "pointer",
              color: selected ? "#f44336" : "#df6690",
              display: "flex",
              "&:hover": {
                color: "#f44336",
              },
            }}
          />
        }
        handleSubmitModal={handleQuestionDelete}
        submitBtnText="Vymazať"
        submitModalFuncParams={[question?.id]}
      >
        <Typography variant="h4">Vymazat otázku</Typography>
        <Typography variant="h6">
          Ste si isti že chcete vymazať otázku č. {index + 1}?
        </Typography>
      </ModalCreate>
    </Box>
  );
};

export default QuestionInSideMenu;
