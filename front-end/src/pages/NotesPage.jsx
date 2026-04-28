import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { useAuth } from "../context/AuthContext";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const formData = new FormData();
    formData.append("userId", userId);

    const response = await fetch("/api/fetchNotes.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log(data.status);
      let records = data.records;
      let arrRecords = [];

      for (let i = 0; i < records.length; i++) {
        let content = records[i];
        arrRecords.push(content);
      }

      setNotes(arrRecords);

      let categories = data.note_categories;
      let arrCategories = [];

      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        arrCategories.push(category);
      }

      setCategories(arrCategories);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#1a1a1a]">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-medium text-[#1a1a1a] mb-3 serif-font">
              Your Notes
            </h1>
            <p className="text-[17px] text-[#666] font-light serif-font">
              Every note you have created so far.
            </p>
          </div>
        </div>
        <div className="">
          {notes.map((note, index) => {
            return (
              <NoteRenderer
                setNotes={setNotes}
                key={note.note_id}
                note={note}
                category={categories[index]}
                setCategories={setCategories}
                index={index}
              ></NoteRenderer>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function NoteRenderer({ note = "", setNotes, category, setCategories, index }) {
  const noteContent = JSON.parse(note.content);
  const noteId = note.note_id;
  const noteTitle = note.title;
  const html = generateHTML(noteContent, [StarterKit]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: html,
    editable: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none min-h-[400px] p-8 text-[#1a1a1a] font-mono",
      },
    },
  });

  async function deleteNote() {
    const formData = new FormData();
    formData.append("id", noteId);

    try {
      const response = await fetch("/api/deleteNote.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data.status);
      if (response.ok && data.status === "success") {
        console.log(data.message);
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.note_id !== noteId),
        );

        setCategories((prevCategories) =>
          prevCategories.filter((_, i) => i !== index),
        );
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md mb-20">
      <div className="py-2.5 px-6 bg-[#fafafa] flex justify-between items-center border-b border-[#eee]">
        <div className="serif-font text-2xl font-light pb-2 text-purple-500">
          {noteTitle}
        </div>
        <div>{category.map((categoryObj) => categoryObj["category_id"])}</div>
        <button
          className="sans-font p-2 text-red-500 hover:text-red-400 "
          onClick={() => deleteNote()}
        >
          Delete
        </button>
      </div>

      <EditorContent editor={editor}></EditorContent>
    </div>
  );
}

export default NotesPage;
