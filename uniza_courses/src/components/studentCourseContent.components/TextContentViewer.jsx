import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TestViewer from "./TestViewer";

const TextContentViewer = ({ stepId, userData }) => {
  const [content, setContent] = useState("");
  const [step, setStep] = useState(null);
  console.log("stepId", stepId);
  console.log("step", step);

  useEffect(() => {
    const fetchAll = async () => {
      getStep();
    };
    fetchAll();
  }, [stepId]);

  const getStep = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/courseStructure/getStep/" + stepId,
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
      setContent(data.content);
      setStep(data);
      console.log("step", data);
    } catch (error) {
      console.log("Error getting content:", error);
      toast.error("Error getting content");
    }
  };

  return (
    <Box>
      {step?.type === "text" ? (
        <Box
          className="fr-view"
          border={(theme) => `1px solid ${theme.palette.divider}`}
          borderRadius={(theme) => theme.shape.borderRadius}
          padding={2}
          bgcolor={"#fff"}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <TestViewer testId={stepId} step={step} userData={userData} />
      )}
    </Box>
  );
};

export default TextContentViewer;
