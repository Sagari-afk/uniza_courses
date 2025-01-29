import SelectLanguage from "./SelectLanguage";
import logo from "../assets/logo_text.png";
import profile_pic from "../assets/profile_pic.jpg";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (window.pageYOffset > header.offsetTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      id="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 4,
        py: 1,
        marginTop: -2,
        alignItems: "center",

        position: isSticky ? "fixed" : "relative",
        // top: isSticky ? 0 : "auto",
        width: "-webkit-fill-available",
        zIndex: 1000,
        backgroundColor: "black.main",
      }}
    >
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
        {localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken") ? (
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
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Header;
