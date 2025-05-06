import "./styles.css";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

import { EditorContent, useCurrentEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

import {
  FaBold,
  FaCode,
  FaImage,
  FaItalic,
  FaListOl,
  FaListUl,
  FaParagraph,
  FaRedo,
  FaStrikethrough,
  FaUndo,
  FaVideo,
} from "react-icons/fa";
import { Box } from "@mui/material";
import Video from "./Video";

const API_URL = import.meta.env.VITE_API_URL;

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/courseStructure/upload-image`, {
    method: "POST",
    headers: {
      "x-access-token":
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken"),
    },
    body: formData,
  });

  const data = await response.json();
  console.log(data);
  return data.fileUrl;
};

const addImage = async (editor) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();

  input.onchange = async () => {
    if (!input.files?.length) return;
    const url = await uploadImage(input.files[0]);

    editor.chain().focus().setImage({ src: url }).run();
  };
};

const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/courseStructure/upload-video`, {
    method: "POST",
    headers: {
      "x-access-token":
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken"),
    },
    body: formData,
  });

  const data = await response.json();
  return data.fileUrl;
};

const addVideo = async (editor) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "video/*";
  input.click();

  input.onchange = async () => {
    if (!input.files?.length) return;
    const url = await uploadVideo(input.files[0]);
    console.log("Video URL:", url);

    editor.chain().focus().insertContent(`<video src="${url}"></video>`).run();
  };
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <FaCode />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <FaParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
        <button onClick={() => addImage(editor)}>
          <FaImage />
        </button>
        <button onClick={() => addVideo(editor)}>
          <FaVideo />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

const TipTap = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Video,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <Box
      sx={{
        paddingY: "1rem",
      }}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </Box>
  );
};

export default TipTap;
