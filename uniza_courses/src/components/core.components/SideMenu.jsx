import React, { useState, useEffect, Children } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import LinkWithIconBox from "../courses.components/LinkWIthIconBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SideMenu = ({
  handleLogout,
  sideMenuLinks,
  type,
  topics,
  children,
  courseTitle,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openedByClick, setOpenedByClick] = useState(
    type === "courseStructure" ? true : false
  );
  const [lastEndedSubtopic, setLastEndedSubtopic] = useState(5);
  const [progress, setProgress] = useState(20);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "3rem 1rem 0 2rem",
          minHeight: "550px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "primary.dark",
            gap: "2rem",
          }}
        >
          {type !== "courseStructure" && (
            <Icon
              icon="material-symbols:menu-rounded"
              style={{
                fontSize: "2rem",
                opacity: isHovered || openedByClick ? 0.3 : 1,
              }}
              onClick={() => setOpenedByClick(!openedByClick)}
            />
          )}
          {type === "courseStructure" && (
            <Box>
              <Typography variant="h6" color="white">
                {courseTitle}
              </Typography>
              <Typography color="white" fontSize={"0.8rem"}>
                Progres po kurzu {progress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  my: "0.5rem",
                  height: 5,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    background:
                      "linear-gradient(90deg, #C04F77 0%, #FFC65A 100%)",
                  },
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "primary.dark",
              gap: "2rem",
              transition: "all 0.3s ease",
              width: isHovered || openedByClick ? "250px" : "60px",
            }}
          >
            {type === "links" &&
              sideMenuLinks.map((el) => (
                <LinkWithIconBox
                  isHovered={isHovered || openedByClick}
                  text={el.text}
                  iconName={el.iconName}
                  key={el.iconName}
                />
              ))}

            <Box>
              {(isHovered || openedByClick) &&
                type === "courseStructure" &&
                topics.map((topic) => (
                  <Accordion
                    key={topic.id}
                    sx={{
                      backgroundColor: "transparent",
                      color: "#fff",
                      boxShadow: "none",
                      "&:before": {
                        display: "none",
                      },
                    }}
                    defaultExpanded={
                      topic.subtopics &&
                      topic.subtopics.some(
                        (subtopic) => subtopic.id === lastEndedSubtopic
                      )
                    }
                  >
                    <AccordionSummary
                      sx={{ fontSize: "1rem", p: 0 }}
                      expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                    >
                      {topic.order}. {topic.title}
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        ml: "1.2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      {topic.subtopics && topic.subtopics.length > 0 ? (
                        topic.subtopics.map((subtopic) => (
                          <Typography
                            key={subtopic.title}
                            sx={
                              lastEndedSubtopic === subtopic.id
                                ? {
                                    borderRadius: "0.25rem",
                                    padding: "0.3rem",
                                    background:
                                      "linear-gradient(90deg, #C04F77 0%, #FFC65A 100%)",
                                    color: "#fff",
                                  }
                                : { color: "primary.main" }
                            }
                          >
                            {topic.order}.{subtopic.order} {subtopic.title}
                          </Typography>
                        ))
                      ) : (
                        <Typography color="#ffffff47">
                          Žiadne podtemy
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
          </Box>
          {(isHovered || openedByClick) && type === "links" && (
            <Typography
              sx={{
                color: "white.dark",
                whiteSpace: "nowrap",
                opacity: 0.3,
                cursor: "pointer",
                position: "fixed",
                bottom: "1rem",
              }}
              onClick={handleLogout}
            >
              Odhlasiť sa
            </Typography>
          )}
        </Box>
      </Box>
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
        {children}
      </Box>
    </Box>
  );
};

export default SideMenu;
