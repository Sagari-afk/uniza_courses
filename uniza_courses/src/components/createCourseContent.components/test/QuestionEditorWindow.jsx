import React, { useCallback, useEffect, useRef, useState } from "react";

import { Box, Typography } from "@mui/material";
import SecundaryBtn from "../../core.components/SecundaryBtn";
import AnswerMultiple from "./AnswerMultiple";
import { toast } from "react-toastify";
import TipTap from "../tiptap/TipTap";

const API_URL = import.meta.env.VITE_API_URL;

const QuestionEditorWindow = ({ question, setQuestion, getQuestions }) => {
  const [content, setContent] = useState(" ");
  const [isMounted, setIsMounted] = useState(false);

  console.log("Content: ", content);

  const fetchAnswers = useCallback(async () => {
    const getContent = async (id) => {
      const resFile = await fetch(
        `${API_URL}/api/questions/getQuestion/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
        }
      );
      const data = await resFile.json();
      if (!data.questionText) {
        setContent(" ");
        return;
      }
      setContent(data.questionText);
      getAnswers();
    };

    if (question?.id) {
      await getContent(question?.id);
    } else {
      setContent(" ");
    }
  }, [question?.id]);

  useEffect(() => {
    if (question?.id) {
      console.log("Fetching content for question: ", question?.questionText);
      setContent(question?.questionText);
    } else {
      setContent(" ");
    }
  }, [question?.id]);

  useEffect(() => {
    fetchAnswers();
    setIsMounted(true);
  }, [fetchAnswers]);

  const getAnswers = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/questions/getAnswers/${question?.id}`,
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

      setQuestion({ ...question, Answers: data });
      console.log("Answers: ", question?.Answers);
    } catch (error) {
      console.log("Error fetching answers: ", error);
      toast.error("Chyba pri načítaní odpovedí");
    }
  };

  const newAnswerMultiple = async () => {
    try {
      const res = await fetch(`${API_URL}/api/questions/createAnswer`, {
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
      });
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
        `${API_URL}/api/questions/deleteAnswer/${answerId}`,
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

  const saveQuestionContent = async (newContent) => {
    try {
      const res = await fetch(`${API_URL}/api/questions/setQuestionText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token":
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          content: newContent,
          questionId: question?.id,
        }),
      });
      console.log("Saving content for question: ", question);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      toast.success("Obsah bol úspešne uložený");
      getQuestions();
      console.log("Content saved successfully:", data);
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Chyba pri ukladaní obsahu");
    }
  };

  const answerUpdate = async (answerText, isCorrect, answerId) => {
    console.log("Updating answer: ", answerText, isCorrect, answerId);
    const res = await fetch(
      `${API_URL}/api/questions/answerUpdate/${answerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token":
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          answerText,
          isCorrect,
        }),
      }
    );
    const data = await res.json();
    console.log("Answer updated: ", data);
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
      </Box>
      <Typography>
        Typ otázky: {question?.opened ? "otvorená" : "s viacerými možnosťami"}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {isMounted && content !== null && (
          <>
            <TipTap content={content} setContent={setContent} />
            <SecundaryBtn
              onClick={() => saveQuestionContent(content)}
              style={{ width: "auto" }}
            >
              Uložiť otázku
            </SecundaryBtn>
          </>
        )}
      </Box>

      <Typography variant="h6" mt={2}>
        Pridať odpoveď{" "}
        {!question?.opened && (
          <span style={{ color: "#888" }}>(zaškrtni ak je správna)</span>
        )}
      </Typography>

      {!question?.opened ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {question?.Answers?.map((answer, index) => (
            <AnswerMultiple
              key={index}
              index={index}
              answer={answer}
              handleAnswerDelete={handleAnswerDelete}
              answerUpdate={answerUpdate}
            />
          ))}
          <SecundaryBtn
            text={"Pridať odpoveď"}
            onClick={() => {
              newAnswerMultiple();
            }}
            style={{ width: "fit-content", marginRight: "auto" }}
          >
            Pridať odpoveď
          </SecundaryBtn>
        </Box>
      ) : (
        // <OpenedQuestionCreation />
        <AnswerMultiple
          answer={question?.Answers ? question?.Answers[0] : null}
          openedQuestion={true}
          answerUpdate={answerUpdate}
        />
      )}
    </Box>
  );
};

export default QuestionEditorWindow;
