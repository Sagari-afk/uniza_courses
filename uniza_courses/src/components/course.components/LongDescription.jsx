import { Box, Typography } from "@mui/material";

const LongDescription = ({ restData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h4" className="font-gradient">
        O kurze
      </Typography>
      <Typography
        sx={{ lineHeight: "200%" }}
        dangerouslySetInnerHTML={{
          __html: restData.long_description,
        }}
      />
    </Box>
  );
};

export default LongDescription;
