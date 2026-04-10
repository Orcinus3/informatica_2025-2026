import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  let isLogged = true;

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
