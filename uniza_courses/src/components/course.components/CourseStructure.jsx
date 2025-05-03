import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CourseStructure = ({ restData }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h4" className="font-gradient">
        Štruktura kurzu
      </Typography>
      {restData.topics &&
      Array.isArray(restData.topics) &&
      restData.topics.length > 0 ? (
        <Box>
          {restData.topics.map((topic, topicIndex) => (
            <Accordion key={topicIndex}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{topic.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {topic.subtopics &&
                Array.isArray(topic.subtopics) &&
                topic.subtopics.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    {topic.subtopics.map((subtopic, subIndex) => (
                      <Typography key={subIndex}>- {subtopic.title}</Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2">Žiadne podtémy</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Typography>Žiadne temy</Typography>
      )}
    </Box>
  );
};

export default CourseStructure;
