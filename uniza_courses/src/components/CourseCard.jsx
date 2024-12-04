import cardClasses from "../styles/CourseCard.module.css";

import testImg from "../assets/testImg.png";
import Badge from "@mui/material/Badge";
import { Icon } from "@iconify/react";

const CourseCard = ({ name, img_url, description, updatedAt }) => {
  const date = new Date(updatedAt);

  return (
    <div className={`${cardClasses.courseCard} flex flex-column space-between`}>
      <div
        className={`flex space-between ${cardClasses.courseHeader}`}
        style={{ gap: "42px" }}
      >
        <div className={cardClasses.courseTitle}>
          <p className={cardClasses.courseName}>{name}</p>
          <p
            className={cardClasses.courseDescription}
            style={{ display: "inline" }}
          >
            {description.slice(0, 50)}
            <span>...</span>
          </p>
        </div>
        <Badge
          badgeContent={
            <div className={cardClasses.badge}>
              <Icon
                icon="tabler:heart"
                style={{
                  width: "12px",
                  height: "auto",
                }}
              ></Icon>
            </div>
          }
          className="c-main-purple"
        >
          <img src={img_url} className={cardClasses.img} />
        </Badge>
      </div>
      <div>
        <p className={cardClasses.courseInstructor}>Meno a prizvisko ucitela</p>
        <div className={`${cardClasses.courseFooter} flex space-between`}>
          <div className="flex gap-4">
            <p>
              <Icon
                icon="material-symbols:star"
                style={{ width: "12px", height: "12px" }}
              ></Icon>{" "}
              5
            </p>
            <p style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="material-symbols:person"
                style={{ width: "12px", height: "12px" }}
              ></Icon>{" "}
              10
            </p>
            <p style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon="majesticons:clock"
                style={{ width: "12px", height: "12px" }}
              ></Icon>{" "}
              1 h
            </p>
          </div>

          <p>{date.toDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
