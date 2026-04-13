import Header from "../components/Header";

function NotesPage() {
  return (
    <div>
      <Header></Header>
      <h1>This is the Notes page</h1>
      <div className="flex">
        <button className="px-8 py-2 bg-blue-300 rounded-xl">Add Note</button>
        <button>Add Folder</button>
      </div>
    </div>
  );
}

export default NotesPage;
