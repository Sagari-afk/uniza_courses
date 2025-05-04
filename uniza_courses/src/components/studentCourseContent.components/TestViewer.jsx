import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Question from "./Question";
import PrimaryBtn from "../core.components/PrimaryBtn";

const TestViewer = ({ testId, userData, step }) => {
  const [test, setTest] = useState();
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);

  console.log("step: ", step);

  const getTest = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/courseStructure/getTest/" + testId,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      const data = await res.json();
      if (!data || !res || data?.error || !res?.ok) {
        toast.error(data?.error);
        return;
      }
      setTest(data);
      console.log("test", data);
    } catch (error) {
      console.log("Error getting content:", error);
      toast.error("Error getting content");
    }
  };
  useEffect(() => {
    const fetchAll = async () => {
      getTest();
    };
    fetchAll();
  }, [testId]);

  const evaluate = () => {
    const questions = test?.questions || [];

    if (questions.length !== Object.keys(answers).length) {
      return toast.error("Nie všetky otázky boli zodpovedané.");
    }
    let correctCount = 0;
    const results = questions.map((q) => {
      const user = answers[q.id];
      let isCorrect = false;

      if (q.opened) {
        isCorrect =
          user?.trim().toLowerCase() ===
          q.Answers.find((a) => a.correctAnswer)
            ?.contentFileName?.trim()
            .toLowerCase();
      } else {
        console.log(
          "answers",
          q?.Answers?.find((a) => a.correctAnswer)?.id,
          user
        );
        isCorrect = user == q?.Answers?.find((a) => a.correctAnswer)?.id;
      }

      if (isCorrect) correctCount++;
      return { questionId: q.id, isCorrect };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    setResults(results);
    setScore(score);
    sendResults(score);
  };

  const sendResults = async (score) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/userProgress/submitTestResults",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            testId: testId,
            score: score,
            results: results,
            userId: userData?.userId,
          }),
        }
      );

      console.log("Sending data to backend", score);
      const data = await res.json();
      if (!data || !res || data?.error || !res?.ok) {
        toast.error(data?.error);
        return;
      }
      console.log("test", data);
      toast.success("Úspešne odoslané výsledky testu.");
    } catch (error) {
      console.log("Error getting content:", error);
      toast.error("Error getting content");
    }
  };

  useEffect(() => {
    const getTestResults = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/userProgress/getTestResults/" +
            `${step?.id || testId}/${userData?.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token":
                localStorage.getItem("authToken") ||
                sessionStorage.getItem("authToken"),
            },
          }
        );
        const data = await res.json();
        if (!data || !res || data?.error || !res?.ok) {
          return;
        }
        setScore(data?.results);
        console.log("from BC", data);
      } catch (error) {
        console.log("Error getting content:", error);
        toast.error("Error getting content");
      }
    };
    if (step && step?.type == "test") getTestResults();
  }, [step]);

  return (
    <Box
      padding={2}
      border={(theme) => `1px solid ${theme.palette.divider}`}
      borderRadius={(theme) => theme.shape.borderRadius}
      bgcolor={"#fff"}
      marginBottom={2}
    >
      {" "}
      <Typography variant="h5" color="primary.main" mb={2}>
        {score > 0 && `Tvoje skóre: ${score} %`}
      </Typography>
      <Box>
        {test?.questions?.map((question, index) => (
          <Question
            key={index}
            index={index}
            question={question}
            results={results}
            value={answers[question.id] ?? null}
            onChange={(val) =>
              setAnswers((prev) => ({ ...prev, [question.id]: val }))
            }
          />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <PrimaryBtn style={{ width: "auto" }} onClick={evaluate}>
          Overiť
        </PrimaryBtn>

        <Typography variant="h5" color="primary.main">
          {score > 0 && `Tvoje skóre: ${score} %`}
        </Typography>
      </Box>
    </Box>
  );
};

export default TestViewer;
