import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

const Tiptap = ({ initialContent = "<p>Example Text</p>" }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none min-h-[400px] p-8 text-[#1a1a1a] font-mono",
      },
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  const [title, setTitle] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState("");
  const [categories, setCategories] = useState([]);
  const { userId } = useAuth();

  function setLink() {
    const url = window.prompt("Enter the URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }

  function addImage() {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  const sendNote = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    //const content = editor.getHTML();
    const content = JSON.stringify(editor.getJSON());
    let categoryId = categories[selectedCategoryIndex].category_id;
    formData.append("content", content);
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("categoryId", categoryId);
    console.log("inserted user id:" + userId);

    try {
      let response = await fetch("/api/noteCreation.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        console.log("response " + data.status);
        console.log("content received: " + data.message);
      } else {
        console.log("server error, content didn't get received");
      }
    } catch (e) {
      console.error("Error: " + e);
    }
  };

  async function getCategories() {
    try {
      const response = await fetch("/api/fetchCategories.php", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        let arrCategories = [];
        let content = data.content;
        console.log(data.status);
        console.log(data.message);
        for (let i = 0; i < content.length; i++) {
          console.log(content[i]);
          arrCategories.push(content[i]);
        }
        setCategories(arrCategories);
      } else {
        console.error("response not ok: " + data.message);
      }
    } catch (e) {
      console.error("Error: " + e);
    }
  }

  return (
    <form
      className="flex flex-col w-full bg-white"
      onSubmit={(e) => sendNote(e)}
    >
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

      <div className="grow">
        <EditorContent editor={editor} />
      </div>

      <div className="px-8 py-4 border-t border-[#eee] bg-[#fafafa] flex items-center justify-between">
        <input
          required
          className="bg-white text-center py-1 shadow focus:outline-purple-500 focus:bg-purple-50 font-mono"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <select
          className="font-mono"
          required
          onChange={(e) => {
            let index = e.target.value;
            let category = categories[index].name;
            console.log(category);
            setSelectedCategoryIndex(index);
          }}
        >
          <option value="" selected disabled hidden>
            Category
          </option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={index}>
                {category.name}
              </option>
            );
          })}
        </select>

        <button
          type="submit"
          className="px-5 py-1.5 bg-white border border-gray-300 text-gray-950 text-[14px] font-medium font-mono rounded hover:bg-purple-200 hover:border-purple-500 "
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
