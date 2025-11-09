import { lazy } from "react";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import ErrorPage from "../pages/ErrorPage";



const SellPageComponent = lazy(()=> import('../pages/SellPage'));
const CheckoutPageComponent = lazy(()=> import('../pages/CheckoutPage'));
const MyOrdersPageComponent = lazy(()=> import('../pages/MyOrdersPage'));


const ProtectedRoutes  = {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: '/sell',
            element: <SellPageComponent />
        },
        {
            path: '/checkout',
            element: <CheckoutPageComponent />
        },
        {
            path: '/my-orders',
            element: <MyOrdersPageComponent />
        }
    ]

}


export default ProtectedRoutes;