import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../pages/ErrorPage";



const SigninEmailComponent = lazy(()=> import('../pages/SiginEmailPage'));
const SignUpEmailComponent = lazy(()=> import('../pages/SignUpEmailPage'));


const LoginRoutes = {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: '/signin',
            children: [
                {
                    path: 'email',
                    element: <SigninEmailComponent />
                }
            ]
        },
        {
            path: '/signup',
            children: [
                {
                    path: 'email',
                    element: <SignUpEmailComponent /> 
                }
            ]
        }
    ]
}


export default LoginRoutes;