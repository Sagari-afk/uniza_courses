import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/header";
import Container from "@mui/material/Container";
import classes from "../styles/HomePage.module.css";
import Button from "@mui/material/Button";

const HomePage = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.Body}>
        <CssBaseline />
        <Header />

        <div className={`${classes.HomePage} page-center`}>
          <h1 className="c-white align-center">
            Uč sa rýchlo a<br /> efektívne.
          </h1>

          <div className="flex center gap-1-5">
            <Button variant="contained btn btn-with-bc">Prihlasiť</Button>
            <Button variant="outlined btn btn-without-bc">Kurzy</Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
