import React, { useRef, useState, useCallback } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import debounce from "lodash/debounce";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

const FroalaTextEditor = ({ content, setContent, sendContent }) => {
  const editorRef = useRef(null);

  const debouncedSendContent = useCallback(
    debounce((newContent) => sendContent(newContent), 5000),
    []
  );

  const handleModelChange = (newContent) => {
    setContent(newContent);
    debouncedSendContent(newContent);
  };

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
