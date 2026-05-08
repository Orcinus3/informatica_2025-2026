import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ExplorePage() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("/api/fetchAllNotes.php", {
      method: "POST",
    });

    let data = await response.json();

    if (response.ok && data.status === "success") {
      console.log(data);
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
    } else {
      console.log("error");
    }
  }

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header></Header>
      <div className="grow flex items-center justify-center bg-[#f9f9f9]">
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
      </div>
      <Footer></Footer>
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

  return (
    <div className="bg-white rounded-lg shadow-md mb-20">
      <div className="py-2.5 px-6 bg-[#fafafa] flex justify-between items-center border-b border-[#eee]">
        <div className="serif-font text-2xl font-light pb-2 text-purple-500">
          {noteTitle}
        </div>
        <div className="flex gap-2">
          {category.map((categoryObj) => {
            const categoryName = categoryObj["name"];
            return (
              <span className="text-sm font-mono text-gray-500">
                {categoryName}
              </span>
            );
          })}
        </div>
      </div>

      <EditorContent editor={editor}></EditorContent>
    </div>
  );
}

export default ExplorePage;
