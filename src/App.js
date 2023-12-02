import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutingWhenLogin from "./ProtectedRoutingWhenLogin";
import ProtectedRoutingWhenLogout from "./ProtectedRoutingWhenLogout";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoutingWhenLogin Component={Dashboard} />}
        />
        <Route
          path="/login"
          element={<ProtectedRoutingWhenLogout Component={Login} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
