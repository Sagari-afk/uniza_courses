import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SecundaryBtn from "../core.components/SecundaryBtn";
import AnswerMultiple from "./AnswerMultiple";
import { toast } from "react-toastify";

const QuestionEditorWindow = ({ question, setQuestion, getQuestions }) => {
  const FroalaTextEditor = React.lazy(() => import("./FroalaTextEditor"));
  const [content, setContent] = useState("");

  useEffect(() => {
    if (question?.questionFileName) getContent(question?.questionFileName);
    else setContent("");
  }, [question]);

  const getContent = async (questionFileName) => {
    const resFile = await fetch(
      "http://localhost:3000/api/questions/getHtmlContent/" + questionFileName,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token":
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken"),
        },
      }
    );
    const file = await resFile.json();
    if (file.error || !resFile.ok) {
      toast.error(file.error);
      return;
    }
    console.log(file.content);
    setContent(file.content);
  };

  const getAnswers = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/questions/getAnswers/${question?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();

      console.log("Answers: ", data);
      setQuestion({ ...question, Answers: data });
    } catch (error) {
      console.log("Error fetching answers: ", error);
      toast.error("Chyba pri načítaní odpovedí");
    }
  };

  const newAnswerMultiple = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/questions/createAnswer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            questionId: question?.id,
            answerText: "",
            isCorrect: false,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log("New answer created: ", data);
      getAnswers();
      console.log("Current question: ", question);
      toast.success("Odpoveď bola pridaná");
    } catch (error) {
      console.log("Error creating new answer: ", error);
      toast.error("Chyba pri pridávaní odpovede");
    }
  };

  const handleAnswerDelete = async (answerId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/questions/deleteAnswer/${answerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log("Answer deleted: ", data);
      getAnswers();
      toast.success("Odpoveď bola zmazaná");
    } catch (error) {
      console.log("Error deleting answer: ", error);
      toast.error("Chyba pri mazani odpovede");
    }
  };

  const saveQuestionContent = (newContent) => {
    fetch("http://localhost:3000/api/questions/setQuestionText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token":
          localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken"),
      },
      body: JSON.stringify({ content: newContent, questionId: question?.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Content saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving content:", error);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      textAlign="left"
      px={2}
    >
      <Box display={"flex"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h4" className="font-gradient">
          Editácia otázky č. {question?.order}
        </Typography>
        {/* <PrimaryBtn style={{ width: "auto" }}>Uložiť otázku</PrimaryBtn> */}
      </Box>
      <Typography>
        Typ otázky: {question?.opened ? "otvorená" : "s viacerými možnosťami"}
      </Typography>

      <Box sx={{ position: "relative" }}>
        <React.Suspense fallback={<CircularProgress />}>
          <FroalaTextEditor
            content={content}
            setContent={setContent}
            sendContent={saveQuestionContent}
          />
        </React.Suspense>
      </Box>

      <Typography variant="h6" mt={2}>
        Pridať odpoveď{" "}
        <span style={{ color: "#888" }}>(zaškrtni ak je správna)</span>:
      </Typography>

      {!question?.opened ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {question?.Answers?.map((answer, index) => (
            <AnswerMultiple
              key={index}
              index={index}
              answer={answer}
              questionId={question?.id}
              setQuestion={setQuestion}
              lastAnswerId={question?.answers?.length - 1}
              handleAnswerDelete={handleAnswerDelete}
            />
          ))}
          <SecundaryBtn
            text={"Pridať odpoveď"}
            onClick={() => {
              // question?.answers.push({});
              // setQuestion({ ...question });
              newAnswerMultiple();
            }}
            style={{ width: "fit-content", marginRight: "auto" }}
          >
            Pridať odpoveď
          </SecundaryBtn>
        </Box>
      ) : (
        <TextField
          fullWidth
          placeholder="Napíš spravnú odpoveď"
          label="Spravná odpoveď"
        />
      )}
    </Box>
  );
};

export default QuestionEditorWindow;
