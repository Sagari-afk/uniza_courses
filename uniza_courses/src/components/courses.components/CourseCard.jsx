import cardClasses from "../../styles/CourseCard.module.css";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { Icon } from "@iconify/react";
import { Box, Stack, Typography } from "@mui/material";
import SecundaryBtn from "../core.components/SecundaryBtn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalCreate from "../createCourseContent.components/ModalCreate";
import PrimaryBtn from "../core.components/PrimaryBtn";
import { toast } from "react-toastify";

const CourseCard = ({
  id,
  name,
  img_url,
  description,
  updatedAt,
  linkTo,
  courseId,
  teachers,
  disciplines,
  year,
  teacher,
  courseLongDescription,
  load,
}) => {
  const date = new Date(updatedAt);
  const navigate = useNavigate();

  const handleSubmitDeleteCourse = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/deleteCourse/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      if (response.ok) {
        toast.success("Kurz bol vymazan");
      } else {
        throw new Error("Failed to delete course");
      }
      load();
    } catch (error) {
      console.log(error);
      toast.error("Nastala chyba pri vymazavani kurzu");
    }
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className={`${cardClasses.courseFooter}`}
        >
          {teacher ? (
            <Stack gap={1}>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/editCourse", {
                    state: {
                      id,
                      name,
                      img_url,
                      description,
                      updatedAt,
                      linkTo,
                      courseId,
                      teachers,
                      disciplines,
                      teacher,
                      year,
                      courseLongDescription,
                    },
                  })
                }
              >
                <EditIcon
                  sx={{
                    fontSize: "1rem",
                    cursor: "pointer",
                    px: "4px",
                  }}
                />
                Upravovať zaklad...
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/EditCourse/${name}/content`, {
                    state: {
                      id,
                    },
                  })
                }
              >
                <EditIcon
                  sx={{
                    fontSize: "1rem",
                    cursor: "pointer",
                    px: "4px",
                  }}
                />
                Upravovať štrukturu...
              </Typography>
              <ModalCreate
                btn={
                  <Typography sx={{ cursor: "pointer" }}>
                    <DeleteForeverIcon
                      sx={{
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        px: "4px",
                      }}
                    />
                    Vymazať navždy?
                  </Typography>
                }
                handleSubmitModal={handleSubmitDeleteCourse}
                submitBtnText="Vymazať"
              >
                <Typography variant="h4">Vymazať kurz</Typography>
                <Typography variant="h6">
                  Ste si isti že chcete vymazať kurz {name}
                </Typography>
              </ModalCreate>
            </Stack>
          ) : (
            <Typography
              className={cardClasses.courseInstructor}
              sx={{ width: "50%" }}
            >
              {teachers
                .map((teacher, index) => teacher.user.secondName)
                .join(", ")}
            </Typography>
          )}

          <SecundaryBtn
            sxChildren={{
              width: "auto",
            }}
            onClick={() => navigate(linkTo, { state: { courseId } })}
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
