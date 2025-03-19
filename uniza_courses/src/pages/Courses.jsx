import { Box, Icon, Typography } from "@mui/material";
import Header from "../components/core.components/Header";
import React, { useState, useEffect } from "react";
import SideMenu from "../components/core.components//SideMenu";
import SearchBar from "../components/courses.components/SearchBar";
import CoursesPagination from "../components/courses.components/CoursePagination";
import { toast } from "react-toastify";

const Courses = ({ handleLogout }) => {
  const [restData, setRestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/course/getAllCourses"
        );
        if (response.ok) {
          const responseData = await response.json();
          setRestData(responseData.records);
          setFilteredData(responseData.records);
        } else {
          throw new Error("Failed to fetch courses");
        }
      } catch (error) {
        setError(error.message);
        toast.error("Error loading courses: " + error.message);
      }
    };

    load();
  }, []);

  return (
    <>
      <Header />
      <SideMenu
        handleLogout={handleLogout}
        // sideElements={
        //   <Box
        //     sx={{
        //       display: "flex",
        //       flexDirection: "column",
        //       color: "primary.dark",
        //       gap: "2rem",
        //     }}
        //   >
        //     <Icon
        //       icon="material-symbols:menu-rounded"
        //       style={{
        //         fontSize: "2rem",
        //         opacity: isHovered ? 0.3 : 1, // Hide icon when hovered
        //       }}
        //     />

        //     <Box
        //       sx={{
        //         display: "flex",
        //         flexDirection: "column",
        //         color: "primary.dark",
        //         gap: "2rem",
        //         transition: "all 0.3s ease",
        //         width: isHovered ? "250px" : "60px",
        //       }}
        //     >
        //       {/* First box with icon and text */}
        //       <Box
        //         sx={{
        //           display: "flex",
        //           gap: "1rem",
        //           alignItems: "center",
        //           opacity: isHovered ? 1 : 0,
        //           transition: "opacity 0.3s ease",
        //         }}
        //       >
        //         <Icon
        //           icon="hugeicons:course"
        //           style={{
        //             fontSize: "2rem",
        //             transition: "transform 0.3s ease",
        //           }}
        //         />
        //         {isHovered && (
        //           <Typography
        //             sx={{ color: "white.dark", whiteSpace: "nowrap" }}
        //           >
        //             Robim teraz
        //           </Typography>
        //         )}
        //       </Box>

        //       {/* Second box with icon and text */}
        //       <Box
        //         sx={{
        //           display: "flex",
        //           gap: "1rem",
        //           alignItems: "center",
        //           opacity: isHovered ? 1 : 0,
        //           transition: "opacity 0.3s ease",
        //         }}
        //       >
        //         <Icon
        //           icon="tabler:clock"
        //           style={{
        //             fontSize: "2rem",
        //             transition: "transform 0.3s ease",
        //           }}
        //         />
        //         {isHovered && (
        //           <Typography
        //             sx={{ color: "white.dark", whiteSpace: "nowrap" }}
        //           >
        //             Chcem robiť
        //           </Typography>
        //         )}
        //       </Box>

        //       {/* Third box with icon and text */}
        //       <Box
        //         sx={{
        //           display: "flex",
        //           gap: "1rem",
        //           alignItems: "center",
        //           opacity: isHovered ? 1 : 0,
        //           transition: "opacity 0.3s ease",
        //         }}
        //       >
        //         <Icon
        //           icon="tabler:heart"
        //           style={{
        //             fontSize: "2rem",
        //             transition: "transform 0.3s ease",
        //           }}
        //         />
        //         {isHovered && (
        //           <Typography sx={{ color: "white.dark" }}>Obľubene</Typography>
        //         )}
        //       </Box>

        //       {/* Fourth box with icon and text */}
        //       <Box
        //         sx={{
        //           display: "flex",
        //           gap: "1rem",
        //           alignItems: "center",
        //           opacity: isHovered ? 1 : 0,
        //           transition: "opacity 0.3s ease",
        //         }}
        //       >
        //         <Icon
        //           icon="mage:archive"
        //           style={{
        //             fontSize: "2rem",
        //             transition: "transform 0.3s ease",
        //           }}
        //         />
        //         {isHovered && (
        //           <Typography sx={{ color: "white.dark" }}>Archiv</Typography>
        //         )}
        //       </Box>
        //     </Box>
        //     {isHovered && (
        //       <Typography
        //         sx={{
        //           color: "white.dark",
        //           whiteSpace: "nowrap",
        //           opacity: 0.3,
        //           cursor: "pointer",
        //           position: "absolute",
        //           bottom: "1rem",
        //         }}
        //         onClick={handleLogout}
        //       >
        //         Odhlasiť sa
        //       </Typography>
        //     )}
        //   </Box>
        // }
      >
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
        >
          <Box>
            <Typography variant="h3" sx={{ my: "1rem" }}>
              Kurzy podľa predmetov
            </Typography>
            <SearchBar restData={restData} setFilteredData={setFilteredData} />
          </Box>

          {error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <CoursesPagination courses={filteredData} />
          )}
        </Box>
      </SideMenu>
    </>
  );
};

export default Courses;
