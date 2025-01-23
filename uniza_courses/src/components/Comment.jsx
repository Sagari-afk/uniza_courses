import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const Comment = ({ rate, user, commentText, updatedAt }) => {
  // const jwt_decode = require("jwt-decode").default;

  // const getUserIdFromToken = () => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     try {
  //       const decoded = jwt_decode(token);
  //       return decoded.id;
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //       return null;
  //     }
  //   }
  //   return null;
  // };
  // userId = getUserIdFromToken();

  const date = new Date(updatedAt);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "15px 30px",
        border: "2px solid #E8E8E8",
        borderRadius: "17px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          {Array.from({ length: rate }, (_, index) => (
            <Icon
              style={{ fontSize: "1.5rem", color: "#FFC65A" }}
              key={index}
              icon="material-symbols:star"
            />
          ))}
        </Box>
        <Typography>{commentText}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography sx={{ textDecorationLine: "underline" }}>
            {user.firstName} {user.secondName}
          </Typography>
          <Typography sx={{ opacity: "0.5" }}>{date.toDateString()}</Typography>
        </Box>
        <Typography color="primary.main">{user.role}</Typography>
      </Box>
    </Box>
  );
};
export default Comment;
