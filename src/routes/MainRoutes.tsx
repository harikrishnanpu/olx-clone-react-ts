import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";

const HomeComponent = lazy(() => import('../pages/HomePage'));


const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <HomeComponent />
        }
    ]

}


export default MainRoutes;