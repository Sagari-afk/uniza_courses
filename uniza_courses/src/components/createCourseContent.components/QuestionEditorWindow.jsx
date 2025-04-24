import React, { useCallback, useEffect, useRef, useState } from "react";

import { Box, Typography } from "@mui/material";
import SecundaryBtn from "../core.components/SecundaryBtn";
import AnswerMultiple from "./AnswerMultiple";
import { toast } from "react-toastify";
import FroalaTextEditor from "./FroalaTextEditor";

const QuestionEditorWindow = ({ question, setQuestion, getQuestions }) => {
  const [content, setContent] = useState(" ");
  const [isMounted, setIsMounted] = useState(false);
  const editorRef = useRef(null);

  console.log(
    editorRef.current ? "Editor is mounted" : "Editor is not mounted",
    isMounted,
    "content: ",
    content
  );

  const config = {
    placeholderText: "Napíš otázku tú...",
    toolbarButtons: ["insertImage", "insertVideo"],
    toolbarButtonsXS: ["insertImage", "insertVideo"],
    toolbarButtonsSM: ["insertImage", "insertVideo"],
    toolbarButtonsMD: ["insertImage", "insertVideo"],
    imageUploadURL: "http://localhost:3000/api/courseStructure/upload-image",
    videoUploadURL: "http://localhost:3000/api/courseStructure/upload-video",
    imageUploadMethod: "POST",
    videoUploadMethod: "POST",
    imageAllowedTypes: ["jpeg", "jpg", "png"],
    pastePlain: true,
    pasteDeniedAttrs: ["style"],
    htmlAllowedTags: ["p", "br", "img", "video"],
    htmlAllowedAttrs: {
      img: ["src", "alt"],
      video: ["src", "controls"],
    },
    quickInsertButtons: [],
    pluginsEnabled: ["image", "video"],
  };

  const fetchAnswers = useCallback(async () => {
    const getContent = async (id) => {
      const resFile = await fetch(
        "http://localhost:3000/api/questions/getQuestion/" + id,
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
    fetchAnswers();
    setIsMounted(true);
  }, [fetchAnswers]);

  useEffect(() => {
    if (editorRef.current) {
      console.log(editorRef.current);
      setIsMounted(true);
    } else {
      console.warn("Editor not yet initialized.");
    }
  }, [editorRef.current]);

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

      setQuestion({ ...question, Answers: data });
      console.log("Answers: ", question?.Answers);
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

  const saveQuestionContent = async (newContent) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/questions/setQuestionText",
        {
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
        }
      );
      console.log("Saving content for question: ", question);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      getQuestions();
      console.log("Content saved successfully:", data);
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const answerUpdate = async (answerText, isCorrect, answerId) => {
    console.log("Updating answer: ", answerText, isCorrect, answerId);
    const res = await fetch(
      `http://localhost:3000/api/questions/answerUpdate/${answerId}`,
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
        {/* <PrimaryBtn style={{ width: "auto" }}>Uložiť otázku</PrimaryBtn> */}
      </Box>
      <Typography>
        Typ otázky: {question?.opened ? "otvorená" : "s viacerými možnosťami"}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {isMounted && content !== null && (
          <FroalaTextEditor
            content={content}
            setContent={setContent}
            sendContent={saveQuestionContent}
            config={config}
            type="question"
            onInitialized={(editorInstance) => {
              editorRef.current = editorInstance;
            }}
          />
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
