import { Editor } from "@monaco-editor/react";

export default function CodeEditor({ language, theme, value, onChange }) {
  return (
    <Editor
      height="85vh"
      width="80vw"
      language={language}
      theme={theme}
      value={value}
      onChange={onChange}
    />
  );
}
