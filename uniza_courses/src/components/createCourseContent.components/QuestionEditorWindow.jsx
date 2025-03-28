import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import { useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

const QuestionEditorWindow = ({ question, setQuestion, setIsOpen }) => {
  const [content, setContent] = useState(" ");
  const editorRef = useRef(null);

  const config = {
    placeholderText: "Napíš otázku tú...",
    // Only show image and video buttons in the toolbar
    toolbarButtons: ["insertImage", "insertVideo"],
    toolbarButtonsXS: ["insertImage", "insertVideo"],
    toolbarButtonsSM: ["insertImage", "insertVideo"],
    toolbarButtonsMD: ["insertImage", "insertVideo"],

    // Upload endpoints and methods
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

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      width={"100%"}
      textAlign={"left"}
      p={2}
    >
      <Typography variant="h4" className="font-gradient">
        Editácia otázky č. {1}
      </Typography>
      <Typography>Typ otázky: otvorená</Typography>
      <FroalaEditorComponent
        tag="textarea"
        model={content}
        config={config}
        onModelChange={(newContent) => setContent(newContent)}
        onInitialized={(editorInstance) => {
          editorRef.current = editorInstance;
        }}
      />

      <Typography variant="h6" mt={2}>
        Pridať odpoveď
        {/* <span style={{ color: "#888" }}>(minimálne 2, maximálne 5)</span> */}
        :
      </Typography>

      <TextField
        fullWidth
        placeholder="Napíš spravnú odpoveď"
        label={"Spravná odpoveď"}
      />
    </Box>
  );
};

export default QuestionEditorWindow;
