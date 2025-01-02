import SelectLanguage from "./SelectLanguage";
import logo from "../assets/logo_text.png";
import profile_pic from "../assets/profile_pic.jpg";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", px: 4 }}>
      <Link
        to={
          localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken")
            ? "/Courses"
            : "/"
        }
      >
        <img src={logo} style={{ height: "2.5rem", width: "auto" }} />
      </Link>

      <Box sx={{ display: "flex", gap: 2 }}>
        <SelectLanguage />
        <Link>
          <img
            src={profile_pic}
            style={{
              height: "2.5rem",
              width: "auto",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
