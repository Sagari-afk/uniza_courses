import React, { useState, useEffect, Children } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import LinkWithIconBox from "../courses.components/LinkWIthIconBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SideMenu = ({ handleLogout, sideMenuLinks, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openedByClick, setOpenedByClick] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box>
      <Box display={"flex"}>
        <Box
          display={{ md: "flex", xs: "none" }}
          sx={{
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "3rem 1rem 0 2rem",
            minHeight: "550px",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "primary.dark",
              gap: "2rem",
            }}
          >
            <Icon
              icon="material-symbols:menu-rounded"
              style={{
                fontSize: "2rem",
                opacity: isHovered || openedByClick ? 0.3 : 1,
              }}
              onClick={() => setOpenedByClick(!openedByClick)}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "primary.dark",
                gap: "2rem",
                transition: "all 0.3s ease",
                width: isHovered || openedByClick ? "250px" : "60px",
              }}
            >
              {sideMenuLinks.map((el) => (
                <LinkWithIconBox
                  isHovered={isHovered || openedByClick}
                  text={el.text}
                  iconName={el.iconName}
                  key={el.iconName}
                />
              ))}
            </Box>
            {(isHovered || openedByClick) && (
              <Typography
                sx={{
                  color: "white.dark",
                  whiteSpace: "nowrap",
                  opacity: 0.3,
                  cursor: "pointer",
                  position: "fixed",
                  bottom: "1rem",
                }}
                onClick={handleLogout}
              >
                Odhlasiť sa
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          borderRadius={{ md: "42px 0px 0px 0px", xs: "0px" }}
          px={{ md: "4rem", xs: "1rem" }}
          sx={{
            backgroundColor: "white.main",
            minHeight: "100vh",
            py: "2rem",
            marginTop: "1rem",
            color: "black.main",
            width: "100%",
          }}
          className="light_gradient-background-animation"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SideMenu;
