import { Box } from "@mui/material";
import Header from "../components/core.components/Header";
import SideMenu from "../components/core.components/SideMenu";

const StudentCourseContent = () => {
  return (
    <>
      <Header />
      <SideMenu>
        <Box
          sx={{
            borderRadius: "42px 0px 0px 0px",
            backgroundColor: "white.main",
            minHeight: "100vh",
            py: "2rem",
            px: "4rem",
            marginTop: "1rem",
            color: "black.main",
            width: "100%",
          }}
          className="light_gradient-background-animation"
        ></Box>
      </SideMenu>
    </>
  );
};

export default StudentCourseContent;
