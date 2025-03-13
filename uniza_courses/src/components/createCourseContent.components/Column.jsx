import React from "react";
import { Box } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Topic from "./Topic";

const Column = ({ topics, load }) => {
  return (
    <Box>
      <SortableContext items={topics} strategy={verticalListSortingStrategy}>
        {topics.map((topic) => (
          <Topic id={topic.id} topic={topic} key={topic.id} load={load} />
        ))}
      </SortableContext>
    </Box>
  );
};
export default Column;
