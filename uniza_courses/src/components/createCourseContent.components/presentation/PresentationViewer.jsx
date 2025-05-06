import DocViewer from "react-doc-viewer";

function PresentationViewer() {
  const docs = [
    {
      uri: "http://localhost:3000/uploads/1746551636514.pptx",
      fileType: "pptx",
      fileName: "namesjkdf",
    },
  ];

  return (
    <DocViewer documents={docs} pluginRenderers={DocViewer.defaultRenderers} />
  );
}

export default PresentationViewer;
