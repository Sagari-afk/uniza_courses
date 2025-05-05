import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

// A custom "light" text field matching specified design tokens
const LightTextField = styled(InputBase)(({ theme }) => ({
  display: "flex",
  padding: "0.625rem",
  alignItems: "center",
  gap: "0.625rem",
  alignSelf: "stretch",

  borderRadius: "0.5625rem",
  border: "1px solid #DF6690",

  //   color: "rgba(255, 255, 255, 0.88)",
  fontFamily: "Roboto, sans-serif",
  fontSize: "1rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",

  backgroundColor: "transparent",

  "& .MuiInputBase-input": {
    color: "#fff",
    font: "inherit",
    padding: 0,
    margin: 0,
  },

  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255, 255, 255, 0.88)",
  },
}));

export default function LightTextFieldWrapper(props) {
  return <LightTextField {...props} />;
}
