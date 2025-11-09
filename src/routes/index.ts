import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import LoginRoutes from "./LoginRoutes";


export const router = createBrowserRouter([MainRoutes,ProtectedRoutes,LoginRoutes])