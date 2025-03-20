import { Box, Fab, Stack } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";

const StepsContainer = ({ subtopicId, stepIdActive, style }) => {
  return (
    <Stack direction={"row"} gap={2} style={style}>
      <Fab color={"primary"} size="small" sx={{ mt: "1rem" }}>
        <AssignmentIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
      </Fab>
      <Fab color={"primary"} size="small">
        <AssignmentIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
      </Fab>
      <Fab color={"primary"} size="small">
        <AssignmentIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
      </Fab>
      <Fab color={"primary"} size="small">
        <QuizIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
      </Fab>
    </Stack>
  );
};

export default StepsContainer;
