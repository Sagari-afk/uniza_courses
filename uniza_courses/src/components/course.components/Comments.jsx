import {
  Box,
  FormControl,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Comment from "./Comment";
import SecundaryBtn from "../core.components/SecundaryBtn";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Comments = ({ restData }) => {
  const [newComment, setNewComment] = useState("");
  const [rate, setRate] = useState(2);

  const handleSubmitComment = async () => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/comment/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token":
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          commentText: newComment,
          courseId,
          commentRate: rate,
        }),
      });
      setNewComment("");
      const data = await response.json();

      load();

      if (!response.ok) {
        console.log(data);
        setError(data || "Failed");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h4" className="font-gradient">
        Hodnotenia
      </Typography>
      {restData.CourseComments &&
      Array.isArray(restData.CourseComments) &&
      restData.CourseComments.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {restData.CourseComments.map((comment, index) => (
            <Comment
              key={index}
              rate={comment.commentRate}
              user={comment.user}
              commentText={comment.commentText}
              updatedAt={comment.updatedAt}
            />
          ))}
        </Box>
      ) : (
        <Typography>Zatial ešte nie sú žiadné hodnotenia</Typography>
      )}

      <FormControl
        component="form"
        onSubmit={handleSubmitComment}
        sx={{
          display: "flex",
          gap: 2,
          width: "auto",
        }}
      >
        <FormLabel
          htmlFor="new-comment"
          sx={{ fontSize: "24px", color: "primary.main" }}
        >
          Pridať komentar
        </FormLabel>
        <Rating
          name="simple-controlled"
          value={rate}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
        />
        <TextField
          id="new-comment"
          multiline
          type="text"
          name="new-comment"
          required
          fullWidth
          placeholder="Tu napiš svoj komentar..."
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "2px solid #E8E8E8",
                borderRadius: "17px",
              },
            },
          }}
        />

        <SecundaryBtn
          type="submit"
          sxChildren={{
            width: "20%",
            alignSelf: "end",
          }}
        >
          Odoslať
        </SecundaryBtn>
      </FormControl>
    </Box>
  );
};

export default Comments;
