import { Box, Fab, Stack, Zoom } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";

const StepsContainer = ({ steps, stepIdActive, style, changeStepSubmit }) => {
  console.log("steps", steps);
  return (
    <Stack direction={"row"} gap={2} style={style}>
      {steps?.map((step) => (
        <Tooltip
          title={step.title}
          key={step.title + step.id}
          slots={{
            transition: Zoom,
          }}
          slotProps={{
            popper: {
              sx: {
                [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                  {
                    marginTop: "20px",
                  },
              },
            },
          }}
        >
          {step.type == "test" ? (
            <Fab
              color={"primary"}
              size="small"
              sx={{ mt: step.id === stepIdActive ? "1rem" : 0 }}
              key={step.title}
              onClick={() => changeStepSubmit(step.id)}
            >
              <QuizIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
            </Fab>
          ) : (
            <Fab
              color={"primary"}
              size="small"
              sx={{ mt: step.id === stepIdActive ? "1rem" : 0 }}
              key={step.title}
              onClick={() => changeStepSubmit(step.id)}
            >
              <AssignmentIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
            </Fab>
          )}
        </Tooltip>
      ))}
    </Stack>
  );
};

export default StepsContainer;
