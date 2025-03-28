import { Box, Typography } from "@mui/material";

const QuestionInSideMenu = ({ question, index, onClick, selected }) => {
  return (
    <Box
      //   className="light_gradient-background-animation"
      sx={{
        cursor: "pointer",
        borderRadius: "1rem",
        padding: "0.5rem",
        background: selected
          ? "linear-gradient(94deg, #df6690 11.3%, #ffc65a 101.52%)"
          : "transparent",
        color: selected ? "#fff" : "#df6690",
        border: selected ? "none" : " 2px solid #df6690",

        display: "flex",
        // "&:hover": {
        //   color: "#007bff",
        // },
      }}
    >
      <Typography fontWeight={700}>Otázka {index + 1}</Typography>
    </Box>
  );
};

export default QuestionInSideMenu;
