import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/contact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/contact" element={<Contact />} exact />

      </Routes>
    </div>
  );
}

export default App;
