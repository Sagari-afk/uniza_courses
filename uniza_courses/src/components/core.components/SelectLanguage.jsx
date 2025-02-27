import React from "react";
import { Icon } from "@iconify/react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/system";

export default function CustomStyledSelect() {
  const [language, setLanguage] = React.useState("Slovenčina");

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const CustomSelect = styled(Select)({
    color: "#f1f1f1",
    borderRadius: "4px",
    "& .MuiSelect-icon": {
      color: "#f1f1f1",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline ": {
      borderColor: "black.main",
    },
  });

  const CustomMenuItem = styled(MenuItem)({
    backgroundColor: "primary.main",
    color: "#f1f1f1",
    "&:hover": {
      backgroundColor: "black.main",
    },
    "&.Mui-selected": {
      backgroundColor: "black.main",
    },
  });
  return (
    <FormControl
      fullWidth
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "fit-content",
      }}
    >
      <Icon
        icon="ion:language"
        style={{
          color: "#DF6690",
          marginRight: "4px",
          width: "1.375rem",
          height: "1.375rem",
        }}
      />
      <CustomSelect
        labelId="language-select-label"
        id="language-select"
        value={language}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              color: "#f1f1f1",
            },
          },
        }}
      >
        <CustomMenuItem value="Slovenčina">Slovenčina</CustomMenuItem>
        <CustomMenuItem value="English">Angličtina</CustomMenuItem>
        <CustomMenuItem value="Ukrajinčina">Ukrajinčina</CustomMenuItem>
      </CustomSelect>
    </FormControl>
  );
}
