import SelectLanguage from "./SelectLanguage";
import logo from "../assets/logo_text.png";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const Header = ({ theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className="flex center space-between">
        <Link to="/">
          <img src={logo} style={{ height: "2.5rem", width: "auto" }} />
        </Link>

        <SelectLanguage />
      </header>
    </ThemeProvider>
  );
};

export default Header;
