import { Box, Typography } from "@mui/material";

const CourseIsFor = ({ restData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h4" className="font-gradient">
        Pre koho je tento kurz
      </Typography>
      <Typography sx={{ lineHeight: "200%" }}>
        Študenti {restData.disciplines && restData.disciplines[0].name}
        {restData.disciplines &&
          restData.disciplines.length > 1 &&
          " a " + restData.disciplines[1].name}
        {" " + restData.year} ročníku
      </Typography>
    </Box>
  );
};

export default CourseIsFor;
