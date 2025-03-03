import { Box } from "@mui/material";
import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Topic = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Box ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {title}
    </Box>
  );
};

export default Topic;
