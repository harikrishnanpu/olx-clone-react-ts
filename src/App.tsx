import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from "./routes/AppRouter"
import { AuthListener } from './components/AuthListener';


function App() {

  return (
    <Provider store={store}>
      <AuthListener />
      <AppRouter />
    </Provider>
  )
}

export default App
