import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const Tiptap = ({ initialContent = "" }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none min-h-[400px] p-8 text-[#1a1a1a] font-mono",
      },
    },
  });

  const setLink = () => {
    const url = window.prompt("Enter the URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <form action="/api" method="POST" className="flex flex-col w-full bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#eee] bg-[#fafafa]">
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            B
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            I
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          >
            U
          </ToolbarButton>
          <div className="w-[1px] h-4 bg-[#ddd] mx-1" />
          <ToolbarButton onClick={setLink} active={editor.isActive("link")}>
            Link
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addImage}
            className="text-[13px] font-medium font-mono text-[#666] hover:text-[#1a1a1a] "
          >
            Add Image
          </button>
        </div>
      </div>

      {/* EDITOR CONTENT AREA */}
      <div className="grow">
        <EditorContent editor={editor} />
      </div>

      {/* HIDDEN INPUT FOR FORM SUBMISSION */}
      <input type="hidden" name="content" value={editor.getHTML()} />

      {/* FOOTER / SUBMIT AREA */}
      <div className="px-8 py-4 border-t border-[#eee] bg-[#fafafa] flex items-center justify-between">
        <div></div>

        <button
          type="submit"
          className="px-5 py-1.5 bg-white border border-gray-350 text-gray-950 text-[14px] font-medium font-mono rounded hover:bg-gray-100 shadow-sm"
        >
          Save Note
        </button>
      </div>
    </form>
  );
};

const ToolbarButton = ({ onClick, active, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-8 h-8 flex items-center justify-center rounded text-[15px]  ${
      active
        ? "bg-[#e5e5e5] text-[#1a1a1a]"
        : "text-[#666] hover:bg-[#eee] hover:text-[#1a1a1a]"
    }`}
  >
    {children}
  </button>
);

export default Tiptap;
