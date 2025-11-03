import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import { ToastContainer, Zoom } from 'react-toastify';
import UpdateTodo from "./Pages/UpdateTodo";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />

      <Routes>
        <Route path="/login" element={<LoginPage key={window.location.pathname} />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/:id" element={<UpdateTodo />}></Route>
      </Routes>

    </>
  )
}

export default App
