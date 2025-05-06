import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const LinkWithIconBox = ({ isHovered, text, iconName, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        "&:hover": {
          border: "#fff solid 1px",
          borderRadius: "1rem",
          transform: "scale(1.02)",
          transition: "transform 0.3s ease",
        },
      }}
      onClick={onClick}
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
