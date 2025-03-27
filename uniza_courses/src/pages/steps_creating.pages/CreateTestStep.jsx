import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  RadioGroup,
  Radio,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/core.components/Header";
import ModalCreate from "../../components/createCourseContent.components/ModalCreate";
import SecundaryBtn from "../../components/core.components/SecundaryBtn";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionsCreator from "../../components/createCourseContent.components/QuestionsCreator";
import PrimaryBtn from "../../components/core.components/PrimaryBtn";

const CreateTestStep = ({}) => {
  const [searchParams] = useSearchParams();
  const subtopicId = searchParams.get("subtopicId");
  const subtopicTitle = searchParams.get("subtopicTitle");

  const [stepTitle, setStepTitle] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [disabledBtnCreate, setDisabledBtnCreate] = useState(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (stepTitle.length > 0) {
      setDisabledBtnCreate(false);
    } else {
      setDisabledBtnCreate(true);
    }
  }, [stepTitle]);

  return (
    <>
      <Header />

      <Box
        sx={{
          backgroundColor: "white.main",
          minHeight: "100vh",
          py: "2rem",
          color: "black.main",
        }}
        className="light_gradient-background-animation"
      >
        <Container maxWidth="lg">
          <Paper sx={{ padding: 3, borderRadius: "1rem" }}>
            <Typography variant="h3" className="font-gradient" mb={2}>
              Vytvoriť nový test
            </Typography>
            <Typography color={"#888"} mb={4}>
              Pre podtemu {subtopicTitle}
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {/* Step 1: Create Step Title */}
              <Step>
                <StepLabel>Nazov testu</StepLabel>
                <StepContent>
                  <Box
                    sx={{
                      mb: 2,
                      width: "60%",
                    }}
                  >
                    {/* Left side: Title and input */}
                    <TextField
                      label="Názov kroku"
                      variant="outlined"
                      value={stepTitle}
                      onChange={(e) => setStepTitle(e.target.value)}
                      fullWidth
                    />
                  </Box>

                  <Box mb={2}>
                    <PrimaryBtn
                      disabled={disabledBtnCreate}
                      onClick={handleNext}
                      style={{ width: "auto" }}
                    >
                      Vytvoriť
                    </PrimaryBtn>
                  </Box>
                </StepContent>
              </Step>

              {/* Step 2: Add Questions */}
              <Step>
                <StepLabel>Pridať otázky</StepLabel>
                <StepContent>
                  <Typography variant="h5" mb={2}>
                    Tu môžete pridať otázky pre test: {stepTitle}
                  </Typography>

                  <QuestionsCreator />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      pt: 2,
                      gap: 2,
                    }}
                  >
                    <SecundaryBtn
                      style={{ width: "auto" }}
                      onClick={handleBack}
                    >
                      Späť
                    </SecundaryBtn>
                    <ModalCreate
                      btn={
                        <PrimaryBtn
                          style={{
                            whiteSpace: "nowrap",
                            display: "inline-flex",
                          }}
                        >
                          Pridať otazku
                        </PrimaryBtn>
                      }
                      handleSubmitModal={() => {}}
                      submitBtnText="Pridať"
                    >
                      <Typography variant="h4">Pridať otázku</Typography>
                      <Typography variant="h6">
                        Aký typ otazky chcete pridať?
                      </Typography>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        width={"100%"}
                      >
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={questionType}
                          onChange={(e) => {
                            setQuestionType(e.target.value);
                          }}
                        >
                          <FormControlLabel
                            value="moźnosti"
                            control={<Radio />}
                            label="Otazka s možnosťami"
                          />
                          <FormControlLabel
                            value="otvorená"
                            control={<Radio />}
                            label="Otvorená otazka"
                          />
                        </RadioGroup>
                      </Box>
                    </ModalCreate>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreateTestStep;
