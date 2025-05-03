import { Box, Typography } from "@mui/material";
import TeacherCard from "./TeacherCard";

const Teachers = ({ restData }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h4" className="font-gradient">
        Učitelia
      </Typography>
      {restData.teachers &&
      Array.isArray(restData.teachers) &&
      restData.teachers.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {restData.teachers.map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} />
          ))}
        </Box>
      ) : (
        <Typography>Žiadne učitelia</Typography>
      )}
    </Box>
  );
};

export default Teachers;
