import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";

const HomePageComponent = lazy(() => import('../pages/HomePage'));
const ProductPageComponent = lazy(()=> import('../pages/ProductPage'));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <HomePageComponent />
        },
        {
            path: '/product/:id',
            element: <ProductPageComponent />
        }
    ]

}


export default MainRoutes;