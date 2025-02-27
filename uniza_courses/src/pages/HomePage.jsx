import Header from "../components/core.components/Header";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import SecundaryBtn from "../components/core.components/SecundaryBtn";

const HomePage = () => {
  return (
    <>
      <Header />
      <Container sx={{ overflow: "hidden", height: "100%" }}>
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
              <SecundaryBtn style={{ color: "#DF6690" }}>Kurzy</SecundaryBtn>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
