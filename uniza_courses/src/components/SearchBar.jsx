import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
} from "@mui/material";
import SecundaryBtn from "./SecundaryBtn";

const SearchBar = ({ restData, setFilteredData }) => {
  const [studOdbor, setStudOdbor] = useState("");
  const [rocnik, setRocnik] = useState("");
  const [searchBy, setSearchBy] = useState("");

  useEffect(() => {
    console.log(studOdbor);
    const filteredCourses = restData.filter(filterCourses);
    setFilteredData(filteredCourses);
  }, [studOdbor, rocnik]);

  const filterCourses = (course) => {
    return (
      (studOdbor === "all" || studOdbor === ""
        ? true
        : course.disciplines.some((d) => d.name === studOdbor)) &&
      (rocnik === "all" || rocnik === ""
        ? true
        : course.year === parseInt(rocnik))
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredCourses = restData.filter((course) =>
      course.name.toLowerCase().includes(searchBy.toLowerCase())
    );
    setFilteredData(filteredCourses);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { md: "row", xs: "column" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between" },
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="stud-odbor-label">Studijny odbor</InputLabel>
          <Select
            value={studOdbor}
            onChange={(e) => setStudOdbor(e.target.value)}
            displayEmpty
            autoWidth
            id="stud-odbor-select-autowidth"
            label="Studijny odbor"
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="all">Vsetky</MenuItem>
            <MenuItem value="Multimediálne technológie">
              Multimediálne technológie
            </MenuItem>
            <MenuItem value="Komunikačné a informačné technológie">
              Komunikačné a informačné technológie
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="rocnik-label">Rocnik</InputLabel>
          <Select
            value={rocnik}
            onChange={(e) => setRocnik(e.target.value)}
            displayEmpty
            labelId="rocnik-label"
            autoWidth
            id="rocnik-select-autowidth"
            label="Rocnik"
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="all">Vsetky</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: { xs: "50%" },
          justifyContent: { xs: "space-between" },
        }}
      >
        <FormControl
          sx={{
            m: 1,
            width: { xs: "100%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "1rem",
          }}
        >
          <TextField
            id="outlined-search"
            label="Vyhľadaj podľa nazovu kurzu..."
            type="search"
            variant="standard"
            sx={{ width: { xs: "100%" } }}
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          />
          <SecundaryBtn
            sxChildren={{
              width: { xs: "100%", md: "auto" },
            }}
            onClick={handleSearch}
          >
            Hľadať
          </SecundaryBtn>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SearchBar;
