import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
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
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl font-medium text-[#1a1a1a] mb-3 serif-font">
            Welcome to Erudition.
          </h1>
          <p className="text-[17px] text-[#666] font-light serif-font max-w-2xl mx-auto mb-8">
            Share and expand your knowledge with a community. Create notes,
            explore others' insights, and grow together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/notes/creation")}
              className="mt-2 h-12 px-6 py-3 rounded bg-white border border-gray-300
                         transition-all hover:bg-purple-50 hover:border-purple-500 sans-font"
            >
              Create New Note
            </button>
            <button
              onClick={() => navigate("/explore")}
              className="mt-2 h-12 px-6 py-3 rounded bg-white border border-gray-300
                         transition-all hover:bg-purple-50 hover:border-purple-500 sans-font"
            >
              Explore Shared Notes
            </button>
          </div>
        </div>

        <div className="text-center py-12 ">
          <h2 className="text-3xl font-medium text-[#1a1a1a] mb-4 serif-font">
            Ready to start sharing?
          </h2>
          <p className="text-[17px] text-[#666] font-light serif-font mb-8 max-w-md mx-auto">
            Join other people building a knowledge base together.
          </p>
          <button
            onClick={() => navigate("/notes/creation")}
            className="mt-2 h-12 px-6 py-3 rounded bg-white border border-gray-300
                       transition-all hover:bg-purple-50 hover:border-purple-500 sans-font"
          >
            Create Your First Note
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
