import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Courses from "./pages/Courses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage theme={darkTheme} />}></Route>
        <Route path="signUp" element={<SignIn theme={darkTheme} />}></Route>
        <Route path="courses" element={<Courses theme={darkTheme} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
