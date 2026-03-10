import Note from "../../components/Note/Note";
import Tiptap from "../../Tiptap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LoginPage from "../LoginPage/LoginPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  let isLogged = false;

  useEffect(() => {
    if (!isLogged) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      <Header></Header>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
