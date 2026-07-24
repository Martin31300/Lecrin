import { createBrowserRouter } from "react-router";
import App from "./App";
import Artist from "./pages/Artist";
import Bienvenue from "./pages/Bienvenue";
import Home from "./pages/Home";
import Mouvement from "./pages/Mouvement";
import ProfilArtist from "./pages/ProfilArtist";
import ProfilMovement from "./pages/ProfilMovement";
import ProfilUser from "./pages/ProfilUser";
import Profil from "./pages/Profile";
import Register from "./pages/Register";
import SeConnecter from "./pages/SeConnecter";
import ProfileArt from "./pages/profileArt";
import Settings from "./pages/Settings";
import CollectionDetail from "./pages/CollectionDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Create router configuration with routes
// You can add more routes as you build out your app!
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profilartwork/:id",
        element: <ProfileArt />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/profiluser/:id",
        element: <ProfilUser />,
      },
      {
        path: "/artist",
        element: <Artist />,
      },
      {
        path: "/artist/:id",
        element: <ProfilArtist />,
      },
      {
        path: "/welcome",
        element: <Bienvenue />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <SeConnecter />,
      },
      {
        path: "/Mouvements",
        element: <Mouvement />,
      },
      {
        path: "/Mouvements/:id",
        element: <ProfilMovement />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/collection/:id",
        element: <CollectionDetail />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);
