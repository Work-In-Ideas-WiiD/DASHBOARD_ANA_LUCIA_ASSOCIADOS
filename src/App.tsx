import {
  RouterProvider
} from 'react-router-dom';
import router from './services/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextData } from './hooks/useAuth';
function App() {

  return (
    <>
      <ToastContainer />
      <AuthContextData>
        <RouterProvider router={router} />
      </AuthContextData>
    </>
  )
}

export default App
