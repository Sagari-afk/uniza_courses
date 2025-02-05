import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";

import MenuBookIcon from "@mui/icons-material/MenuBook";

const CreateNewCourseBtn = () => {
  const actions = [
    { icon: <MenuBookIcon />, name: "Nový kurz", link: "/createNewCourse" },
  ];

  const location = window.location.pathname;
  console.log("Current location: " + location);

  return (
    <SpeedDial
      ariaLabel="SpeedDial openIcon example"
      sx={{ position: "fixed", bottom: "2rem", right: "1rem" }}
      icon={<SpeedDialIcon openIcon={<EditIcon />} />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          component="a"
          href={action.link}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};
export default CreateNewCourseBtn;
