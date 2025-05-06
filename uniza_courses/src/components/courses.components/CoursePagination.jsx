import { useState } from "react";
import { Pagination, Box, Stack, Typography } from "@mui/material";

import CourseCard from "./CourseCard";

const CoursesPagination = ({ courses, load, teacher, typeOfPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 9;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
          px: { md: 4, xs: 1 },
        }}
      >
        {currentCourses.length > 0 ? (
          currentCourses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              linkTo={`/Course/${course.name}`}
              load={load}
              teacher={teacher}
              teachers={course.teachers}
            />
          ))
        ) : (
          <Typography>Nenašiel sa žiaden kurz</Typography>
        )}
      </Box>

      <Stack spacing={2} alignItems="center" sx={{ marginTop: "20px" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
        />
      </Stack>
    </>
  );
};

export default CoursesPagination;
