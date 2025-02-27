import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const SideMenu = ({ handleLogout, children }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "4rem 1rem 0 3rem",
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
              opacity: isHovered ? 0.3 : 1, // Hide icon when hovered
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "primary.dark",
              gap: "2rem", // Ensure that content doesn't overflow when shrinking
              transition: "all 0.3s ease", // Smooth transition for size and padding
              width: isHovered ? "250px" : "60px", // Box width changes smoothly on hover
            }}
          >
            {/* First box with icon and text */}
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                opacity: isHovered ? 1 : 0, // Fade-in text when hovered
                transition: "opacity 0.3s ease", // Smooth opacity transition
              }}
            >
              <Icon
                icon="hugeicons:course"
                style={{
                  fontSize: "2rem",
                  transition: "transform 0.3s ease", // Smooth scaling transition for the icon
                }}
              />
              {isHovered && (
                <Typography sx={{ color: "white.dark", whiteSpace: "nowrap" }}>
                  Robim teraz
                </Typography>
              )}
            </Box>

            {/* Second box with icon and text */}
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                opacity: isHovered ? 1 : 0, // Fade-in text when hovered
                transition: "opacity 0.3s ease", // Smooth opacity transition
              }}
            >
              <Icon
                icon="tabler:clock"
                style={{
                  fontSize: "2rem",
                  transition: "transform 0.3s ease", // Smooth scaling transition for the icon
                }}
              />
              {isHovered && (
                <Typography sx={{ color: "white.dark", whiteSpace: "nowrap" }}>
                  Chcem robiť
                </Typography>
              )}
            </Box>

            {/* Third box with icon and text */}
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                opacity: isHovered ? 1 : 0, // Fade-in text when hovered
                transition: "opacity 0.3s ease", // Smooth opacity transition
              }}
            >
              <Icon
                icon="tabler:heart"
                style={{
                  fontSize: "2rem",
                  transition: "transform 0.3s ease", // Smooth scaling transition for the icon
                }}
              />
              {isHovered && (
                <Typography sx={{ color: "white.dark" }}>Obľubene</Typography>
              )}
            </Box>

            {/* Fourth box with icon and text */}
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                opacity: isHovered ? 1 : 0, // Fade-in text when hovered
                transition: "opacity 0.3s ease", // Smooth opacity transition
              }}
            >
              <Icon
                icon="mage:archive"
                style={{
                  fontSize: "2rem",
                  transition: "transform 0.3s ease", // Smooth scaling transition for the icon
                }}
              />
              {isHovered && (
                <Typography sx={{ color: "white.dark" }}>Archiv</Typography>
              )}
            </Box>
          </Box>
          {isHovered && (
            <Typography
              sx={{
                color: "white.dark",
                whiteSpace: "nowrap",
                opacity: 0.3,
                cursor: "pointer",
                position: "absolute",
                bottom: "1rem",
              }}
              onClick={handleLogout}
            >
              Odhlasiť sa
            </Typography>
          )}
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default SideMenu;
