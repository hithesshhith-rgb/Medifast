import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "./login";
import Home from "./home";
import Emergency from "./emergency";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/emergency"
        element={<Emergency />}
      />
    </Routes>
  );
}

export default App;
    