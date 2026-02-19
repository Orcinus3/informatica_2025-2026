import "./App.css";
import Tiptap from "./Tiptap";
import { useCurrentEditor } from "@tiptap/react";

function App() {
  const { editor } = useCurrentEditor();

  return (
    <>
      <Tiptap></Tiptap>
      <h1>{editor}</h1>
    </>
  );
}

export default App;
