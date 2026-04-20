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
    <div className="min-h-[150dvh] flex flex-col">
      <Header />
      <main className="flex-grow flex-col items-center justify-center bg-[#f9f9f9]">
        <h1 className="text-5xl font-serif">Welcome to Erudition.</h1>
        <h1 className="text-5xl font-serif">
          Share and Expand your Knowledge,
        </h1>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
