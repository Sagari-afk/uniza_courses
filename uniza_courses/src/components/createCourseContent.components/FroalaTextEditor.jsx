import React, { useRef, useState, useCallback } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import debounce from "lodash/debounce";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

const FroalaTextEditor = ({
  content,
  setContent,
  sendContent,
  type,
  config,
}) => {
  const editorRef = useRef(null);

  const debouncedSendContent = useCallback(
    debounce((newContent) => sendContent(newContent), 1000),
    [sendContent]
  );

  const handleModelChange = (newContent) => {
    console.log("handleModelChange", newContent);
    setContent(newContent);
    if (newContent === content) return; // Prevent unnecessary updates
    if (type == "text") return;
    debouncedSendContent(newContent);
  };

  return (
    <FroalaEditor
      tag="textarea"
      model={content}
      config={config}
      onModelChange={handleModelChange}
      onInitialized={(editorInstance) => {
        editorRef.current = editorInstance;
      }}
    />
  );
};

export default FroalaTextEditor;
