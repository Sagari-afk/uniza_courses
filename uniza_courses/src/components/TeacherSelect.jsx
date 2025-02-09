import React, { useState } from "react";
import { Autocomplete, TextField, Chip, Box } from "@mui/material";

function TeacherSelect({
  teacherOptions,
  selectedTeachers,
  setSelectedTeachers,
}) {
  const handleChange = (event, newValue) => {
    setSelectedTeachers(newValue);
  };

  return (
    <Box>
      <Autocomplete
        multiple
        id="teacher-select"
        options={teacherOptions}
        getOptionLabel={(option) =>
          option.user.firstName + " " + option.user.secondName
        }
        filterSelectedOptions
        value={selectedTeachers}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Zoznam učiteľov"
            placeholder="Vyhladat ucitela"
          />
        )}
      />
    </Box>
  );
}

export default TeacherSelect;
