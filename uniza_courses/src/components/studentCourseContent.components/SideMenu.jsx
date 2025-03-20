import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import StepsContainer from "./StepsContainer";

const SideMenu = ({
  topics,
  children,
  courseTitle,
  currentTopic,
  currentSubtopic,
  currentStep,
}) => {
  const [lastEndedSubtopic, setLastEndedSubtopic] = useState(5);
  const [progress, setProgress] = useState(20);

  const [opened, setOpened] = useState(true);

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
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "primary.dark",
            gap: "2rem",
            width: opened ? "17rem" : "2rem",
            transition: "all 0.3s ease",
          }}
        >
          <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              {opened && (
                <Typography variant="h6" color="white">
                  {courseTitle}
                </Typography>
              )}
              {opened ? (
                <KeyboardDoubleArrowLeftIcon
                  sx={{ color: "#ffffff47", cursor: "pointer" }}
                  onClick={() => setOpened(false)}
                />
              ) : (
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "#9e9e9e", cursor: "pointer" }}
                  onClick={() => setOpened(true)}
                />
              )}
            </Box>
            {opened && (
              <>
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
              </>
            )}
          </Box>

          {opened && (
            <Box>
              {topics.map((topic) => (
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
                  defaultExpanded={topic.subtopics && topic.id === currentTopic}
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
                      <Typography color="#ffffff47">Žiadne podtemy</Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Box width={"100%"}>
        <StepsContainer
          style={{
            marginLeft: opened ? "6rem" : "10rem",
            marginTop: "-3.5rem",
            marginBottom: "1rem",
            transition: "all 0.3s ease",
          }}
          steps={
            topics
              .find((t) => t.id === currentTopic)
              ?.subtopics.find((s) => s.id === currentSubtopic)?.steps
          }
          stepIdActive={currentStep}
        />
        <Box
          sx={{
            borderRadius: "42px 0px 0px 0px",
            backgroundColor: "white.main",
            minHeight: "100vh",
            py: "2rem",
            px: "4rem",
            // marginTop: "1rem",
            color: "black.main",
          }}
          className="light_gradient-background-animation"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SideMenu;
