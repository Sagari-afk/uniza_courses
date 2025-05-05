import SelectLanguage from "./SelectLanguage";
import logo from "../../assets/logo_text.png";
import profile_pic from "../../assets/profile_pic.jpg";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Header = ({ style }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [userData, setUserData] = useState(() =>
    JSON.parse(sessionStorage.getItem("userData"))
  );

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

  useEffect(() => {
    setUserData(
      JSON.parse(sessionStorage.getItem("userData")) ||
        JSON.parse(localStorage.getItem("userData"))
    );
  }, [localStorage.getItem("authToken")]);

  return (
    <Box
      id="header"
      mb={{ xs: 1, md: 0 }}
      px={{ xs: 2, md: 5 }}
      sx={{
        display: "flex",
        justifyContent: "space-between",

        py: 2,

        alignItems: "center",

        position: isSticky ? "fixed" : "relative",
        // top: isSticky ? 0 : "auto",
        width: "-webkit-fill-available",
        zIndex: 1000,
        backgroundColor: "black.main",
      }}
      style={{ ...style }}
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
        {/* <SelectLanguage /> */}
        {localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken") ? (
          <Link to={"/Profile"}>
            <img
              src={userData?.profile_img_url || profile_pic}
              style={{
                height: "2.5rem",
                width: "2.5rem",
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
