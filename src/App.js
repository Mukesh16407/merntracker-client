import {BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/index";
import { Login } from "./pages/Login/index";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { ProjectInfo } from "./pages/ProjectInfo";
import { Admin } from "./pages/Admin";
import { useSelector } from "react-redux";
import {Spinner} from "./components/Spinner";
import {ProtectedPage} from "./components/ProtectedPage";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          }
        />
        <Route
          path="/project/:id"
          element={
            <ProtectedPage>
              <ProjectInfo />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedPage>
              <Profile />
            </ProtectedPage>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedPage>
              <Admin />
            </ProtectedPage>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
