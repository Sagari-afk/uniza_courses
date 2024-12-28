import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Courses from "./pages/Courses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#DF6690",
        dark: "#C04F77",
      },
      secondary: {
        main: "#FFC65A",
      },
      black: {
        main: "#161719",
      },
      white: {
        main: "#F2F2F2",
        dark: "#E8E8E8",
        light: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "Roboto",
      h1: {
        fontWeight: 700, // Bold for h1
      },
      h2: {
        fontWeight: 600, // Medium-bold for h2
      },
      h3: {
        fontWeight: 500, // Regular bold for h3
      },
      h4: {
        fontWeight: 400, // Normal weight for h4
      },
      h5: {
        fontWeight: 400, // Lighter for h5
      },
      h6: {
        fontWeight: 200, // Even lighter for h6
      },
      body1: {
        fontWeight: 400, // Normal weight for body text (equivalent to <p>)
      },
      body2: {
        fontWeight: 300, // Lighter body text
      },
    },
    // components: {
    //   MuiOutlinedInput: {
    //     styleOverrides: {
    //       root: {
    //         "& .MuiOutlinedInput-notchedOutline": {
    //           borderColor: "#E8E8E8", // Change the outline color to the light blue
    //         },
    //         "&:hover .MuiOutlinedInput-notchedOutline": {
    //           borderColor: "#FFC65A", // Change the outline color on hover
    //         },
    //         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //           borderColor: "#DF6690", // Keep the default primary color when focused
    //         },
    //       },
    //     },
    //   },
    // },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="signUp" element={<SignIn />} />
          <Route path="courses" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
