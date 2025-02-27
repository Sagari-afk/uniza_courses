import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid2,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ModalCreate from "./ModalCreate";
import PrimaryBtn from "../core.components/PrimaryBtn";

const CourseStructure = ({ data, handleSubmitCreateSubTopic }) => {
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      {data.topics
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((topic) => (
          <Accordion key={topic.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Typography variant="h5">{topic.title}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {/* CREATE NEW SUBTOPIC */}
                  <ModalCreate
                    btn=<CreateNewFolderIcon
                      sx={{ color: "#9cdb93", fontSize: "2rem" }}
                    />
                  >
                    <Typography variant="h4">Nova podtema</Typography>
                    <Typography variant="h6">Pre temu {topic.title}</Typography>

                    <Grid2
                      size={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TextField
                        fullWidth
                        id="course-name"
                        width="100%"
                        label="Nazov"
                      />
                    </Grid2>
                    <PrimaryBtn
                      onClick={(e) => {
                        handleSubmitCreateSubTopic(e);
                      }}
                    >
                      Vytvoriť
                    </PrimaryBtn>
                  </ModalCreate>

                  <EditIcon
                    sx={{ color: "secondary.main", fontSize: "2rem" }}
                  />
                  <DeleteForeverIcon
                    sx={{ color: "#ff7c7c", fontSize: "2rem" }}
                  />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {topic.subtopics && topic.subtopics.length > 0 ? (
                topic.subtopics
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((subtopic) => (
                    <Accordion key={subtopic.id} sx={{ marginBottom: 1 }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: "flex", gap: 3 }}>
                          <Typography variant="h6">{subtopic.title}</Typography>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <CreateNewFolderIcon
                              sx={{ color: "#9cdb93", fontSize: "1.8rem" }}
                            />
                            <EditIcon
                              sx={{
                                color: "secondary.main",
                                fontSize: "1.8rem",
                              }}
                            />
                            <DeleteForeverIcon
                              sx={{ color: "#ff7c7c", fontSize: "1.8rem" }}
                            />
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {subtopic.steps && subtopic.steps.length > 0 ? (
                          <List>
                            {subtopic.steps
                              .slice()
                              .sort((a, b) => a.order - b.order)
                              .map((step) => (
                                <ListItem key={step.id}>
                                  <Box sx={{ display: "flex", gap: 3 }}>
                                    <Typography variant="h7">
                                      {topic.title}
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                      <EditIcon
                                        sx={{
                                          color: "#9cdb93",
                                          fontSize: "1.5rem",
                                        }}
                                      />
                                      <DeleteForeverIcon
                                        sx={{
                                          color: "#ff7c7c",
                                          fontSize: "1.5rem",
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </ListItem>
                              ))}
                          </List>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Нет шагов
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))
              ) : (
                <Typography color="text.secondary">Nie su podtemy</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

export default CourseStructure;
