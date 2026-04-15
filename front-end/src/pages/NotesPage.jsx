import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tiptap from "../Tiptap";

function NotesPage() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login", { replace: true });
    }
  }, [isLogged, navigate]);

  if (!isLogged) {
    return null;
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
              A minimal space for your thoughts and ideas.
            </p>
          </div>
        </div>

        <div className="bg-white  border border-[#e5e5e5] shadow-sm ">
          <Tiptap />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotesPage;
