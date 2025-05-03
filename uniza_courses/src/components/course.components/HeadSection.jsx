import { Box, Container, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const HeadSection = ({ restData, averageRate, studentsCount, date }) => {
  return (
    <Box
      sx={{ py: { xs: 5, sm: 14 } }}
      className="dark-gradient-background-animation"
    >
      <Container>
        <Box
          flexDirection={{ xs: "column", sm: "row" }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            width={{ md: "70%", xs: "100%" }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  padding: "2px 19px",
                  backgroundColor: "primary.dark",
                  width: "fit-content",
                  borderRadius: "12px",
                }}
              >
                Course
              </Typography>
              <Typography variant="h2" className="font-gradient">
                {restData.name}
              </Typography>
            </Box>
            <Typography>{restData.description}</Typography>
          </Box>

          <Box
            component="img"
            src={restData.img_url}
            alt=""
            sx={{
              flexShrink: 0,
              borderRadius: "32px",
              border: "4px solid #FFF",
              mt: { xs: 4, sm: 0 },
              background: `url(${restData.img_url}) lightgray 50% / cover no-repeat`,
              width: { xs: "100%", sm: "23rem" },
              height: "auto",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 4,
            py: 4,
            fontSize: "2rem",
            color: "primary.dark",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography color="white.main">Hodnotenie {averageRate}</Typography>
            <Icon icon="material-symbols:star"></Icon>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography color="white.main">Už mali {studentsCount}</Typography>
            <Icon icon="material-symbols:person"></Icon>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography color="white.main">Trvá 1 h</Typography>
            <Icon icon="majesticons:clock"></Icon>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography color="white.main">Prídan {date}</Typography>
            <Icon icon="solar:calendar-bold"></Icon>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeadSection;
