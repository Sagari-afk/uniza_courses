import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const LinkWithIconBox = ({ isHovered, text, iconName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {isHovered && (
        <>
          <Icon
            icon={iconName}
            style={{
              fontSize: "2rem",
              transition: "transform 0.3s ease",
            }}
          />

          <Typography sx={{ color: "white.dark", whiteSpace: "nowrap" }}>
            {text}
          </Typography>
        </>
      )}
    </Box>
  );
};
export default LinkWithIconBox;
