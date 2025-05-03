import { Box, Icon, Typography } from "@mui/material";
import PrimaryBtn from "../core.components/PrimaryBtn";
import SecundaryBtn from "../core.components/SecundaryBtn";

const SidePanel = ({ courseStarted, startCourse }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "20px",
        order: { xs: 1, md: 2 },
        mb: { xs: 4, md: 0 },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "7rem",
          height: "fit-content",
          display: "flex",
          gap: 4,
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <PrimaryBtn style={{ color: "white" }} onClick={startCourse}>
            {courseStarted ? "POKRAČOVAŤ" : " ZAčAť TERAZ"}
          </PrimaryBtn>

          <SecundaryBtn
            style={{
              border: "2px solid #E8E8E8",
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}
          >
            <Icon icon="tabler:clock" style={{ fontSize: "2rem" }}></Icon> Chem
            začať neskor
          </SecundaryBtn>

          <SecundaryBtn
            style={{
              border: "2px solid #E8E8E8",
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}
          >
            <Icon icon="tabler:heart" style={{ fontSize: "2rem" }}></Icon>{" "}
            pridať k obľubeným
          </SecundaryBtn>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: "15px 37px",
            border: "2px solid #E8E8E8",
            background: "rgba(255, 255, 255, 0.74)",
            borderRadius: "17px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Typography>
              <b>Kurz obsahuje</b>
            </Typography>{" "}
            <Box>
              <Typography>
                <b>12 </b>prednašok
              </Typography>
              <Typography>
                <b>12</b> testov
              </Typography>
              <Typography>
                <b>1</b> hodina <b>15</b> minut
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              color: "primary.main",
              textDecorationLine: "underline",
              cursor: "pointer",
            }}
          >
            Obsah kurzu
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SidePanel;
