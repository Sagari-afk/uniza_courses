import { Box, Grid2, Typography } from "@mui/material";

import noQuestions from "../../assets/NoQuestions.svg";
import { useState } from "react";

const QuestionsCreator = ({}) => {
  return (
    <Grid2 my="2rem" textAlign={"center"} container spacing={2}>
      <Grid2
        item
        size={3}
        xs={12}
        sm={6}
        border={"2px solid #e7e7e7"}
        p={2}
        borderRadius={"1rem"}
      ></Grid2>
      <Grid2 item size={9} xs={12} sm={6} p={2} borderRadius={"1rem"}>
        <Box display={"flex"} flexDirection={"column"} gap={3} py={8}>
          <Typography color={"#888"} textAlign={"center"}>
            Žiadne otazky
          </Typography>
          <img
            src={noQuestions}
            style={{
              height: "8rem",
              width: "auto",
            }}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default QuestionsCreator;
