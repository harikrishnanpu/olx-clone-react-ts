import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from "./routes/AppRouter"
import { AuthListener } from './components/AuthListener';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <Provider store={store}>
      <AuthListener />
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
            zIndex: 9999
          },
          success: {
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          }
        }}
      />
    </Provider>
  )
}

export default App
