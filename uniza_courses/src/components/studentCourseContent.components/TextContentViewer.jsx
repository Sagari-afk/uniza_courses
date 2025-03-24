import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TextContentViewer = ({ stepId }) => {
  const [content, setContent] = useState();
  const [stepTitle, setStepTitle] = useState();

  useEffect(() => {
    getStep();
  }, []);

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
      if (data.error || !res.ok) {
        toast.error(data.error);
        return;
      }
      setStepTitle(data.title);
      const resFile = await fetch(
        "http://localhost:3000/api/courseStructure/getHtmlContent/" +
          data.fileName,
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
        console.log("File err: ", file.error);
        toast.error(file.error);
        return;
      }
      setContent(file.content);
    } catch (error) {
      console.error("Error getting content:", error);
      toast.error("Error getting content");
    }
  };

  return (
    <Box
      className="fr-view"
      border={(theme) => `1px solid ${theme.palette.divider}`}
      borderRadius={(theme) => theme.shape.borderRadius}
      padding={2}
      bgcolor={"#fff"}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default TextContentViewer;
