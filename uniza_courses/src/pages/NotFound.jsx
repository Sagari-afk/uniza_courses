import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box color={"white"} textAlign="center" mt={5}>
      <Typography mb={1} variant="h2">
        404 - Page Not Found
      </Typography>
      <Typography mb={5}>
        Sorry, the page you are looking for could not be found.
      </Typography>
      <img src={"/404NotFound.gif"} alt="404" height={400} />
    </Box>
  );
};

export default NotFound;
