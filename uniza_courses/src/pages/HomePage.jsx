import Header from "../components/header";
import Container from "@mui/material/Container";
import classes from "../styles/HomePage.module.css";
import Button from "@mui/material/Button";
import { Outlet, Link } from "react-router-dom";

const HomePage = ({ theme }) => {
  return (
    <Container className={classes.Body}>
      <Header theme={theme} />

      <div className={`${classes.HomePage} page-center`}>
        <h1 className="c-white align-center">
          Uč sa rýchlo a<br /> efektívne.
        </h1>

        <div className="flex center gap-1-5">
          <Link to="/SignUp">
            <Button variant="contained btn btn-with-bc uppercase border-radius-075">
              Prihlasiť
            </Button>
          </Link>
          <Link to="/Courses">
            <Button variant="outlined btn btn-without-bc c-white uppercase border-radius-075">
              Kurzy
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
