import { useCurrentEditor } from "@tiptap/react";

function EditorChild() {
  const { editor } = useCurrentEditor();

  return <h1>{editor.getHTML()}</h1>;
}

export default EditorChild;
