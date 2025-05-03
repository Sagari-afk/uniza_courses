import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TestViewer = ({ testId, step }) => {
  const [test, setTest] = useState();

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

  return (
    <Box>
      {test?.questions?.map((question, index) => (
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
            dangerouslySetInnerHTML={{ __html: question?.questionText }}
          />
          {question?.Answers?.map((answer, index) => (
            <Box key={index}>{answer.contentFileName}</Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default TestViewer;
