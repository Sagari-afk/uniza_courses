import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

const absd = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const Question = ({ question, index, value, onChange, results }) => {
  return (
    <Box
      key={index}
      padding={1}
      border={(theme) => `1px solid ${theme.palette.divider}`}
      borderRadius={(theme) => theme.shape.borderRadius}
      bgcolor={"#fff"}
      marginBottom={2}
    >
      <Box
        padding={2}
        dangerouslySetInnerHTML={{ __html: `${question?.questionText}` }}
      />
      <FormControl fullWidth>
        <Box p={2}>
          {!question?.opened ? (
            <>
              {question?.Answers?.map((answer, index) => (
                <RadioGroup
                  key={index}
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={value ?? ""}
                  onChange={(e) => onChange(e.target.value)}
                >
                  <FormControlLabel
                    value={answer?.id}
                    control={<Radio />}
                    label={`${absd[index]}) ${answer?.contentFileName}`}
                  />
                </RadioGroup>
              ))}
            </>
          ) : (
            <TextField
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              required
              fullWidth
              placeholder="Tu napiš svoju odpoeď..."
              variant="outlined"
            />
          )}
        </Box>
      </FormControl>

      {results.length > 0 && (
        <>
          {!results.find((a) => a.questionId == question.id)?.isCorrect ? (
            <Typography color="primary.main" padding={1}>
              {question?.opened ? "Odpoveď" : "Správna odpoveď"}:{" "}
              {question?.Answers?.find((a) => a.correctAnswer)?.contentFileName}
            </Typography>
          ) : (
            <Typography color="#178b31" padding={1}>
              Správna odpoveď!
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Question;
