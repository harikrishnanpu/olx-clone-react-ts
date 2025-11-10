import { Outlet } from "react-router"
import { CategoriesBar } from "../components/organisms/CategoriesBar"
import { NavBar } from "../components/organisms/NavBar"
import { Footer } from "../components/organisms/Footer"
import { Login } from "../components/organisms/Login"
import { useState } from "react"

function MainLayout() {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  }
  const openLoginModal = () => setIsLoginModalOpen(true);


  return (
    <div className="">
        <NavBar openLoginModal={openLoginModal}  />
        <CategoriesBar />
        <Outlet />
        <Footer />
        {isLoginModalOpen && <Login close={closeLoginModal} />}
    </div>
  )
}

export default MainLayout