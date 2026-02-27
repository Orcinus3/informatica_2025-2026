// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import initialContent from "./initialContent";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: initialContent, // initial content
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={providerValue}>
      <form action="/api" method="POST">
        <EditorContent editor={editor} />
        <input type="text" name="username" />
        <button type="submit">Submit</button>
      </form>
    </EditorContext.Provider>
  );
};

export default Tiptap;
