import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Protected />} />
      </Routes>
    </main>
  );
};

export default App;
