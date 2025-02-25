import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DragAndDropCourse = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "theme") {
      const newThemes = reorder(data.themes, source.index, destination.index);
      setData({ themes: newThemes });
      return;
    }

    if (type === "subtheme") {
      const sourceThemeId = source.droppableId.split("::")[1];
      const destThemeId = destination.droppableId.split("::")[1];

      const sourceThemeIndex = data.themes.findIndex(
        (theme) => theme.id === sourceThemeId
      );
      const destThemeIndex = data.themes.findIndex(
        (theme) => theme.id === destThemeId
      );
      if (sourceThemeIndex === -1 || destThemeIndex === -1) return;

      const sourceTheme = data.themes[sourceThemeIndex];
      const destTheme = data.themes[destThemeIndex];

      if (sourceThemeId === destThemeId) {
        const newSubthemes = reorder(
          sourceTheme.subthemes,
          source.index,
          destination.index
        );
        const newThemes = data.themes.map((theme, idx) =>
          idx === sourceThemeIndex
            ? { ...theme, subthemes: newSubthemes }
            : theme
        );
        setData({ themes: newThemes });
      } else {
        const sourceSubthemes = Array.from(sourceTheme.subthemes);
        const [movedSubtheme] = sourceSubthemes.splice(source.index, 1);
        const destSubthemes = Array.from(destTheme.subthemes);
        destSubthemes.splice(destination.index, 0, movedSubtheme);

        const newThemes = data.themes.map((theme) => {
          if (theme.id === sourceThemeId)
            return { ...theme, subthemes: sourceSubthemes };
          if (theme.id === destThemeId)
            return { ...theme, subthemes: destSubthemes };
          return theme;
        });
        setData({ themes: newThemes });
      }
      return;
    }

    if (type === "step") {
      const sourceParts = source.droppableId.split("::");
      const destParts = destination.droppableId.split("::");
      const sourceThemeId = sourceParts[1];
      const sourceSubthemeId = sourceParts[2];
      const destThemeId = destParts[1];
      const destSubthemeId = destParts[2];

      const sourceThemeIndex = data.themes.findIndex(
        (theme) => theme.id === sourceThemeId
      );
      const destThemeIndex = data.themes.findIndex(
        (theme) => theme.id === destThemeId
      );
      if (sourceThemeIndex === -1 || destThemeIndex === -1) return;

      const sourceTheme = data.themes[sourceThemeIndex];
      const destTheme = data.themes[destThemeIndex];

      const sourceSubIndex = sourceTheme.subthemes.findIndex(
        (sub) => sub.id === sourceSubthemeId
      );
      const destSubIndex = destTheme.subthemes.findIndex(
        (sub) => sub.id === destSubthemeId
      );
      if (sourceSubIndex === -1 || destSubIndex === -1) return;

      const sourceSubtheme = sourceTheme.subthemes[sourceSubIndex];
      const destSubtheme = destTheme.subthemes[destSubIndex];

      if (source.droppableId === destination.droppableId) {
        const newSteps = reorder(
          sourceSubtheme.steps,
          source.index,
          destination.index
        );
        const newSubtheme = { ...sourceSubtheme, steps: newSteps };
        const newSubthemes = sourceTheme.subthemes.map((st, idx) =>
          idx === sourceSubIndex ? newSubtheme : st
        );
        const newThemes = data.themes.map((theme, idx) =>
          idx === sourceThemeIndex
            ? { ...theme, subthemes: newSubthemes }
            : theme
        );
        setData({ themes: newThemes });
      } else {
        const sourceSteps = Array.from(sourceSubtheme.steps);
        const [movedStep] = sourceSteps.splice(source.index, 1);
        const destSteps = Array.from(destSubtheme.steps);
        destSteps.splice(destination.index, 0, movedStep);

        const newSourceSubtheme = { ...sourceSubtheme, steps: sourceSteps };
        const newDestSubtheme = { ...destSubtheme, steps: destSteps };

        if (sourceThemeId === destThemeId) {
          const newSubthemes = sourceTheme.subthemes.map((st) => {
            if (st.id === sourceSubthemeId) return newSourceSubtheme;
            if (st.id === destSubthemeId) return newDestSubtheme;
            return st;
          });
          const newThemes = data.themes.map((theme) =>
            theme.id === sourceThemeId
              ? { ...theme, subthemes: newSubthemes }
              : theme
          );
          setData({ themes: newThemes });
        } else {
          const newSourceSubthemes = sourceTheme.subthemes.map((st) =>
            st.id === sourceSubthemeId ? newSourceSubtheme : st
          );
          const newDestSubthemes = destTheme.subthemes.map((st) =>
            st.id === destSubthemeId ? newDestSubtheme : st
          );

          const newThemes = data.themes.map((theme) => {
            if (theme.id === sourceThemeId) {
              return { ...theme, subthemes: newSourceSubthemes };
            }
            if (theme.id === destThemeId) {
              return { ...theme, subthemes: newDestSubthemes };
            }
            return theme;
          });
          setData({ themes: newThemes });
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="themes" type="theme">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {data.themes.map((theme, themeIndex) => (
              <Draggable
                key={theme.id}
                draggableId={theme.id}
                index={themeIndex}
              >
                {(provided) => (
                  <Accordion
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      {...provided.dragHandleProps}
                    >
                      <Typography variant="h5">{theme.title}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Droppable
                        droppableId={`subthemes::${theme.id}`}
                        type="subtheme"
                      >
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {theme.subthemes.map((subtheme, subIndex) => (
                              <Draggable
                                key={subtheme.id}
                                draggableId={subtheme.id}
                                index={subIndex}
                              >
                                {(provided) => (
                                  <Accordion
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      {...provided.dragHandleProps}
                                    >
                                      <Typography>{subtheme.title}</Typography>
                                    </AccordionSummary>
                                    {/* Droppable для Шагов в каждом Подтеме */}
                                    <AccordionDetails>
                                      <Droppable
                                        droppableId={`steps::${theme.id}::${subtheme.id}`}
                                        type="step"
                                      >
                                        {(provided) => (
                                          <Box
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                          >
                                            {subtheme.steps.map(
                                              (step, stepIndex) => (
                                                <Draggable
                                                  key={step.id}
                                                  draggableId={step.id}
                                                  index={stepIndex}
                                                >
                                                  {(provided) => (
                                                    <Box
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                    >
                                                      <CardContent>
                                                        <Typography
                                                          sx={{
                                                            borderBottom:
                                                              "1px solid ",
                                                          }}
                                                        >
                                                          {step.text}
                                                        </Typography>
                                                      </CardContent>
                                                    </Box>
                                                  )}
                                                </Draggable>
                                              )
                                            )}
                                            {provided.placeholder}
                                          </Box>
                                        )}
                                      </Droppable>
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropCourse;
