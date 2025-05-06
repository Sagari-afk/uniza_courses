import Header from "../components/core.components/Header";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import SecundaryBtn from "../components/core.components/SecundaryBtn";

const HomePage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url(/homepage.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.2)",
        backgroundBlendMode: "overlay",
        backgroundPosition: "center 70%",
      }}
    >
      <Box
        className="light_gradient-background-animation"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header style={{ background: "transparent" }} />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            gap: 3,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            color="white"
            sx={{
              textAlign: "center",
            }}
          >
            Uč sa rýchlo a<br /> efektívne.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            <Link to="/SignIn">
              <PrimaryBtn style={{ color: "#000" }}>Prihlásiť</PrimaryBtn>
            </Link>
            <Link to="/Courses">
              <SecundaryBtn style={{ color: "#DF6690" }}>Kurzy</SecundaryBtn>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
