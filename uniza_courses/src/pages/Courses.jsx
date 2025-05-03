import { Box, Typography } from "@mui/material";
import Header from "../components/core.components/Header";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import SideMenu from "../components/core.components//SideMenu";
import SearchBar from "../components/courses.components/SearchBar";
import CoursesPagination from "../components/courses.components/CoursePagination";

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
        sideMenuLinks={[
          { text: "Robim teraz", iconName: "hugeicons:course", link: "" },
          // { text: "Chcem robiť", iconName: "tabler:clock", link: "" },
          // { text: "Obľubene", iconName: "tabler:heart", link: "" },
          { text: "Archiv", iconName: "mage:archive", link: "" },
        ]}
        type="links"
      >
        <Box>
          <Typography
            variant="h3"
            textAlign={{ xs: "center", md: "left" }}
            fontSize={{ xs: "2rem", md: "3rem" }}
            sx={{ my: "1rem" }}
          >
            Kurzy podľa predmetov
          </Typography>
          <SearchBar restData={restData} setFilteredData={setFilteredData} />
        </Box>

        {error ? (
          <Typography>Chyba: {error}</Typography>
        ) : (
          <CoursesPagination courses={filteredData} />
        )}
      </SideMenu>
    </>
  );
};

export default Courses;
