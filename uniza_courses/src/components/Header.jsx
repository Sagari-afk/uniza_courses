import SelectLanguage from "./SelectLanguage";
import logo from "../assets/logo_text.png";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Link to="/">
        <img src={logo} style={{ height: "2.5rem", width: "auto" }} />
      </Link>

      <SelectLanguage />
    </Box>
  );
};

export default Header;
