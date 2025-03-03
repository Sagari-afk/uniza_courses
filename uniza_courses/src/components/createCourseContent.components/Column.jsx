import React from "react";
import { Box } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Topic from "./Topic";

const Column = ({ topics }) => {
  return (
    <Box>
      <SortableContext items={topics} strategy={verticalListSortingStrategy}>
        {topics.map((topic) => (
          <Topic id={topic.id} title={topic.title} key={topic.id} />
        ))}
      </SortableContext>
    </Box>
  );
};
export default Column;
