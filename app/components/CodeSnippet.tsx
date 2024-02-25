// @ts-nocheck

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeSnippet = ({ children, language, code }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomOneDark}
      customStyle={{ padding: "24px", borderRadius: "8px", fontSize: "18px" }}
    >
      {code}
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
