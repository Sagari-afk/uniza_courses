import DocViewer from "react-doc-viewer";

function PresentationViewer() {
  const docs = [
    {
      uri: "",
      fileType: "pptx",
      fileName: "namesjkdf",
    },
  ];

  return (
    <DocViewer documents={docs} pluginRenderers={DocViewer.defaultRenderers} />
  );
}

export default PresentationViewer;
