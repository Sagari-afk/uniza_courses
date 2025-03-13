import React, { useState } from "react";
import { Autocomplete, TextField, Chip, Box, Checkbox } from "@mui/material";

function TeacherSelect({
  teacherOptions,
  selectedTeachers,
  setSelectedTeachers,
}) {
  const handleChange = (event, newValue) => {
    setSelectedTeachers(newValue);
  };
  console.log(teacherOptions, selectedTeachers);

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
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.user.firstName + " " + option.user.secondName}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Zoznam učiteľov"
            placeholder="Vyhľadať učiteľa"
          />
        )}
      />
    </Box>
  );
}

export default TeacherSelect;
