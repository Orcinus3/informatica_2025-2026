import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },

  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },

  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "/notes",
    element: <NotesPage></NotesPage>,
  },
  {
    path: "/about",
    element: <AboutPage></AboutPage>,
  },
  {
    path: "/explore",
    element: <ExplorePage></ExplorePage>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
