import React, { useState } from "react";
import { Pagination, Box, Stack, Typography } from "@mui/material";
import CourseCard from "./CourseCard";

const CoursesPagination = ({ courses, teacher }) => {
  const coursesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
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
          padding: "20px",
        }}
      >
        {currentCourses.length > 0 ? (
          currentCourses.map((course, index) => (
            <CourseCard
              key={index}
              id={course.id}
              name={course.name}
              img_url={course.img_url}
              teachers={course.teachers}
              updatedAt={course.updatedAt}
              description={course.description}
              linkTo={`/Course/${course.name}`}
              courseId={course.id}
              disciplines={course.disciplines}
              year={course.year}
              teacher={teacher}
              courseLongDescription={course.long_description}
            />
          ))
        ) : (
          <Typography>Nenasiel sa ziaden kurz</Typography>
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
