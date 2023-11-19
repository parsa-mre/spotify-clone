import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { SignUp, Login } from "./pages/Auth";
import { HomePage, ArtistPage, SearchPage } from "./pages/MainSection";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "artist/:id",
                element: <ArtistPage />,
            },
        ],
    },
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/signup", element: <SignUp /> },
]);

export default router;
