import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";

import cardClasses from "../../styles/CourseCard.module.css";
import SecundaryBtn from "../core.components/SecundaryBtn";
import { useEffect, useState } from "react";

const CourseCard = ({ course, linkTo }) => {
  const navigate = useNavigate();

  let date = new Date(course.updatedAt);
  date = new Intl.DateTimeFormat("sk-SK", {
    dateStyle: "long",
  }).format(date);

  const values = course.CourseComments;
  const [averageRate, setAverageRate] = useState(
    values.length > 0
      ? Math.round(
          (values.reduce((sum, rating) => sum + rating.commentRate, 0) /
            values.length) *
            100
        ) / 100
      : 0
  );

  const [studentsCount, setStudentsCount] = useState(0);

  const getStudentsCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/course/getStudentsCount/${course.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStudentsCount(data);
      } else {
        console.error("Failed to fetch students count");
      }
    } catch (error) {
      console.error("Error fetching students count:", error);
    }
  };

  useEffect(() => {
    getStudentsCount();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className={`${cardClasses.courseCard}`}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "42px",
        }}
        className={`${cardClasses.courseHeader}`}
      >
        <Box className={cardClasses.courseTitle}>
          <Typography variant="h5" className={cardClasses.courseName}>
            {course.name}
          </Typography>
          <Typography
            className={cardClasses.courseDescription}
            sx={{ display: "inline" }}
          >
            {course.description.slice(0, 50)}
            <span>...</span>
          </Typography>
        </Box>
        <Badge
          badgeContent={
            <Box className={cardClasses.badge}>
              <Icon
                icon="tabler:heart"
                style={{
                  width: "12px",
                  height: "auto",
                }}
              ></Icon>
            </Box>
          }
          className="c-main-purple"
        >
          <img src={course.img_url} className={cardClasses.img} />
        </Badge>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className={`${cardClasses.courseFooter}`}
        >
          <Typography
            className={cardClasses.courseInstructor}
            sx={{ width: "50%" }}
          >
            {course.teachers
              .map((teacher, index) => teacher.user.secondName)
              .join(", ")}
          </Typography>
          <SecundaryBtn
            sxChildren={{
              width: "auto",
            }}
            onClick={() => navigate(linkTo, { state: { courseId: course.id } })}
          >
            Viac...
          </SecundaryBtn>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className={`${cardClasses.courseFooter}`}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography>
              <Icon
                icon="material-symbols:star"
                style={{ width: "12px", height: "12px" }}
              ></Icon>{" "}
              {values.length > 0 ? averageRate : "Žiadne"}
            </Typography>
            <Typography style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="material-symbols:person"
                style={{ width: "12px", height: "12px" }}
              ></Icon>{" "}
              {studentsCount}
            </Typography>
            <Typography style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="majesticons:clock"
                style={{ width: "12px", height: "12px" }}
              ></Icon>{" "}
              1 h
            </Typography>
          </Box>

          <Typography>{date}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseCard;
