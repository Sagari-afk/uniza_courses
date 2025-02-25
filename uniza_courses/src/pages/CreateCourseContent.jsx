import { Box, Container, Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import DragAndDrop from "../components/DragAndDrop";

const CreateCourseContent = () => {
  const initialData = {
    themes: [
      {
        id: "theme-1",
        title: "Theme 1",
        subthemes: [
          {
            id: "subtheme-1",
            title: "Subtheme 1",
            steps: [
              { id: "step-1", text: "Step 1" },
              { id: "step-2", text: "Step 2" },
            ],
          },
          {
            id: "subtheme-2",
            title: "Subtheme 2",
            steps: [{ id: "step-3", text: "Step 3" }],
          },
        ],
      },
      {
        id: "theme-2",
        title: "Theme 2",
        subthemes: [
          {
            id: "subtheme-3",
            title: "Subtheme 3",
            steps: [{ id: "step-4", text: "Step 4" }],
          },
        ],
      },
    ],
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          py: "2rem",
          color: "black.main",

          backgroundColor: "white.main",
        }}
        className="light_gradient-background-animation"
      >
        <Container maxWidth="lg">
          <Typography variant="h3" className="font-gradient" sx={{ mb: 4 }}>
            Kontent kurzu
          </Typography>
          <DragAndDrop initialData={initialData} />
        </Container>
      </Box>
    </>
  );
};

export default CreateCourseContent;
