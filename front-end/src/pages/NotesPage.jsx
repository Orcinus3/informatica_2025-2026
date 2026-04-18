import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

function NotesPage() {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/fetchNotes.php", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.status);

        let record = data.records[0].content;
        console.log(JSON.parse(record));
        let parsed = JSON.parse(record);

        const html = generateHTML(parsed, [StarterKit]);
        console.log(html);
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
      </main>

      <Footer />
    </div>
  );
}

export default NotesPage;
