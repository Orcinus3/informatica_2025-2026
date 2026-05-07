import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ExplorePage() {
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
    } else {
      console.log("error");
    }
  }

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header></Header>
      <div className="grow flex items-center justify-center bg-[#f9f9f9]">
        <h1 className="text-5xl serif-font">This is the Explore page</h1>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ExplorePage;
