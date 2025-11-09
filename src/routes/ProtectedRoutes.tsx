import { lazy } from "react";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import ErrorPage from "../pages/ErrorPage";



const SellPageComponent = lazy(()=> import('../pages/SellPage'));


const ProtectedRoutes  = {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: '/sell',
            element: <SellPageComponent />
        }
    ]

}


export default ProtectedRoutes;