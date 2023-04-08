import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/index";
import { Login } from "./pages/Login/index";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { ProjectInfo } from "./pages/ProjectInfo";
import {Admin} from "./pages/Admin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project/:id" element={<ProjectInfo />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
