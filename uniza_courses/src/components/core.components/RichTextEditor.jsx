import React, { useState } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";

const RichTextEditor = () => {
  const [content, setContent] = useState("");

  const config = {
    imageUploadURL: "http://localhost:3000/uploads",
    videoUploadURL: "http://localhost:3000/uploads/video",
    fileUploadURL: "http://localhost:3000/uploads/files",
  };

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <FroalaEditorComponent
          tag="textarea"
          model={content}
          config={config}
          onModelChange={(newContent) => setContent(newContent)}
        />
      </div>
      <div
        style={{ border: "1px solid #ddd", padding: "1rem" }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default RichTextEditor;
