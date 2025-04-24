import React, { useRef, useState, useCallback } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import debounce from "lodash/debounce";
import { CircularProgress } from "@mui/material";

const FroalaTextEditor = ({
  content,
  setContent,
  sendContent,
  type,
  config,
  onInitialized,
}) => {
  const debouncedSendContent = useCallback(
    debounce((newContent) => sendContent(newContent), 1000),
    [sendContent]
  );

  const handleModelChange = (newContent) => {
    setContent(newContent);
    if (newContent === content) return;
    if (type == "text") return;
    debouncedSendContent(newContent);
  };

  return (
    <React.Suspense fallback={<CircularProgress />}>
      <FroalaEditor
        tag="textarea"
        model={content}
        config={config}
        onModelChange={handleModelChange}
        onInitialized={onInitialized}
      />
    </React.Suspense>
  );
};

export default FroalaTextEditor;
