import cardClasses from "../styles/CourseCard.module.css";

import testImg from "../assets/testImg.png";
import Badge from "@mui/material/Badge";
import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";

const CourseCard = ({ name, img_url, description, updatedAt }) => {
  const date = new Date(updatedAt);

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
            {name}
          </Typography>
          <Typography
            className={cardClasses.courseDescription}
            sx={{ display: "inline" }}
          >
            {description.slice(0, 50)}
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
          <img src={img_url} className={cardClasses.img} />
        </Badge>
      </Box>
      <Box>
        <Typography className={cardClasses.courseInstructor}>
          Meno a prizvisko ucitela
        </Typography>
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
              5
            </Typography>
            <Typography style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="material-symbols:person"
                style={{ width: "12px", height: "12px" }}
              ></Icon>{" "}
              10
            </Typography>
            <Typography style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="majesticons:clock"
                style={{ width: "12px", height: "12px" }}
              ></Icon>{" "}
              1 h
            </Typography>
          </Box>

          <Typography>{date.toDateString()}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseCard;
