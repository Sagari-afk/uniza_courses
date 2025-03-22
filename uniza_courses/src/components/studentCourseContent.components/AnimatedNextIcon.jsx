import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedNextIcon = ({ show, navigateNextStep }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
      onClick={navigateNextStep}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            key="next"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <NavigateNextIcon sx={{ fontSize: "2rem", color: "#C04F77" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AnimatedNextIcon;
