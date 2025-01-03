import Header from "../components/Header";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PrimaryBtn from "../components/PrimaryBtn";
import SecundaryBtn from "../components/SecundaryBtn";

const HomePage = () => {
  return (
    <Container sx={{ overflow: "hidden", height: "100%" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          paddingBottom: "10rem",
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
            <PrimaryBtn>Prihlásiť</PrimaryBtn>
          </Link>
          <Link to="/Courses">
            <SecundaryBtn>Kurzy</SecundaryBtn>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
