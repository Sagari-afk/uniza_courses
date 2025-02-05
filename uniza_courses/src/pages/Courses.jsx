import { Box, Pagination, Typography } from "@mui/material";
import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import SideMenu from "../components/SideMenu";
import SearchBar from "../components/SearchBar";
import CoursesPagination from "../components/CoursePagination";

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
        alert("Error loading courses: " + error.message);
      }
    };

    load();
  }, []);

  return (
    <>
      <Header />
      <SideMenu handleLogout={handleLogout}>
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
