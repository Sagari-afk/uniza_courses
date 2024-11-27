import SelectLanguage from "./SelectLanguage";
import logo from "../assets/logo_text.png";

const Header = () => {
  return (
    <header className="flex center space-between">
      <a href="">
        <img src={logo} style={{ height: "2.5rem", width: "auto" }} />
      </a>

      <SelectLanguage />
    </header>
  );
};

export default Header;
