import { Box, Fab, Stack, Zoom } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";

const StepsContainer = ({ steps, stepIdActive, style }) => {
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
          <Fab
            color={"primary"}
            size="small"
            sx={{ mt: step.id === stepIdActive ? "1rem" : 0 }}
            key={step.title}
          >
            <AssignmentIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
          </Fab>
        </Tooltip>
      ))}

      <Fab color={"primary"} size="small">
        <QuizIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} />
      </Fab>
    </Stack>
  );
};

export default StepsContainer;
