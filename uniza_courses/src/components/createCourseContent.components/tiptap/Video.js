import { Node, mergeAttributes } from "@tiptap/core";

const Video = Node.create({
  name: "video",

  group: "block",

  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(HTMLAttributes, {
        controls: true,
        style: "max-width: 100%;",
      }),
      ["source", { src: HTMLAttributes.src, type: "video/mp4" }],
    ];
  },

  addNodeView() {
    return ({ HTMLAttributes }) => {
      const video = document.createElement("video");
      video.setAttribute("controls", "true");
      video.style.maxWidth = "100%";

      const source = document.createElement("source");
      source.src = HTMLAttributes.src;
      source.type = "video/mp4";

      video.appendChild(source);
      return {
        dom: video,
      };
    };
  },
});

export default Video;
