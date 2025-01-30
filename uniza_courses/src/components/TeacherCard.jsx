import { Box, Typography } from "@mui/material";

const TeacherCard = ({ teacher }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 6,
      }}
    >
      <img
        src={teacher.user.profile_img_url}
        alt={teacher.user.name}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "100px",
          objectFit: "cover",
          backgroundImage: "linear-gradient(90deg, #e7407b 0%, #d49210 100%)",
          padding: "3px",
        }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h5">
          <b>
            {teacher.user.firstName} {teacher.user.secondName}
          </b>
        </Typography>
        <Box>
          <Typography>
            <b>Pracovisko:</b> {teacher.institute}
          </Typography>
          <Typography>
            <b>Miestnosť:</b> {teacher.office}
          </Typography>
          <Typography>
            <b>Telefón:</b> {teacher.phone}
          </Typography>
          <Typography>
            <b>E-mail:</b> {teacher.user.email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherCard;
