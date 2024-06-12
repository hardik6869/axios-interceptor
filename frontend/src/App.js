import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <main>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Protected />} />
      </Routes>
    </main>
  );
};

export default App;
