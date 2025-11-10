import { Outlet, Navigate } from "react-router"
import { NavBar } from "../components/organisms/NavBar"
import { Footer } from "../components/organisms/Footer"
import { useAppSelector } from "../hooks/hooks"




export const ProtectedLayout = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
        <NavBar openLoginModal={() => {}} />
        <Outlet />
        <Footer />
    </div>
  )
}
