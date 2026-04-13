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

  // prevent rendering content while the redirect is happening
  if (!isLogged) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
