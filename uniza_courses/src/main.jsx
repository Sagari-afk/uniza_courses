import { createRoot } from "react-dom/client";
import "./index.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
