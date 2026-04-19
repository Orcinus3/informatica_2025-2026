import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/fetchNotes.php", {
        method: "POST",
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log(data.status);
        let records = data.records;
        let arr = [];

        for (let i = 0; i < records.length; i++) {
          let content = records[i];
          arr.push(content);
        }

        setNotes(arr);
      }
    }

    fetchData();
  }, []);

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
            return <NoteRenderer key={index} note={note}></NoteRenderer>;
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function NoteRenderer({ note = "" }) {
  const noteContent = JSON.parse(note.content);
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="serif-font text-2xl font-light pb-2 border-b border-purple-300">
        {noteTitle}
      </div>
      <EditorContent editor={editor}></EditorContent>
    </div>
  );
}

export default NotesPage;
