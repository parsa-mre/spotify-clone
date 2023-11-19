import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { SignUp, Login } from "./pages/Auth";

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/signup", element: <SignUp /> },
]);

export default router;
