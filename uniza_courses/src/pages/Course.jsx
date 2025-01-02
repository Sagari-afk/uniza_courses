import React from "react";
import Header from "../components/Header";
import { Box, Container, Typography } from "@mui/material";
import img_url from "../assets/testImg.png";

const Course = () => {
  const courseName = "Course Name";
  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: "white.main", minHeight: "800px" }}>
        <Box sx={{ py: 14 }} className="gradient-background-animation">
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    padding: "2px 19px",
                    backgroundColor: "primary.dark",
                    width: "fit-content",
                    borderRadius: "12px",
                  }}
                >
                  Course
                </Typography>
                <Typography variant="h2" className="font-gradient">
                  {courseName}
                </Typography>
              </Box>
              <Typography>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Vestibulum tortor quam,
                feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                libero sit amet quam egestas semper. Aenean ultricies mi vitae
                est. Mauris placerat eleifend leo. Quisque sit amet est et
                sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
                sed, commodo vitae, ornare sit amet, wisi.
              </Typography>
            </Box>
            <img
              src={img_url}
              style={{
                width: "200px",
                height: "200px",
                flexShrink: "0",
                borderRadius: "32px",
                border: "4px solid #FFF",
                background:
                  " url(<path-to-image>) lightgray 50% / cover no-repeat",
              }}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default Course;
