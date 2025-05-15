import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

const CreateNewCourseBtn = ({ actions, icon, sx, direction, sx_actions }) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial openIcon"
      sx={{ ...sx }}
      icon={<SpeedDialIcon openIcon={icon} />}
      direction={direction}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          component="a"
          href={action.link}
          sx={{ ...sx_actions }}
        />
      ))}
    </SpeedDial>
  );
};
export default CreateNewCourseBtn;
