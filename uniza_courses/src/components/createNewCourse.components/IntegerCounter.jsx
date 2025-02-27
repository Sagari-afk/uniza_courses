import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const IntegerCounter = ({ labelName, value, setValue }) => {
  const handleIncrement = () => {
    if (value < 3) {
      if (value) {
        setValue((prev) => parseInt(prev) + 1);
      } else {
        setValue(1);
      }
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      setValue((prev) => parseInt(prev) - 1);
    }
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 1);
    if (!isNaN(newValue)) {
      const clampedValue = Math.min(Math.max(newValue, 1), 3);
      setValue(clampedValue);
    } else {
      setValue(1);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={handleDecrement}
        aria-label="decrement"
        disabled={value <= 1}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        label={labelName}
        type="number"
        value={value}
        onChange={handleChange}
        inputProps={{
          step: 1,
          min: 1,
          max: 3,
          style: { textAlign: "center" },
        }}
        variant="outlined"
        sx={{ width: "80px" }}
      />
      <IconButton
        onClick={handleIncrement}
        aria-label="increment"
        disabled={value >= 3}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default IntegerCounter;
