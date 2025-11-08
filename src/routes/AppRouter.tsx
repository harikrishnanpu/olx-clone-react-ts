import { Suspense } from "react"
import { router } from "."
import { RouterProvider } from "react-router-dom"


function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
    </Suspense>
  )
}

export default AppRouter