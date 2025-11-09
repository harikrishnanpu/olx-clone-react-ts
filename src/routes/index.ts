import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import ProtectedRoutes from "./ProtectedRoutes";


export const router = createBrowserRouter([MainRoutes,ProtectedRoutes])