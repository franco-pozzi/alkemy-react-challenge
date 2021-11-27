import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { authContext } from "./context/authContext";

import LogIn from "./pages/LogIn"
import Home from "./pages/Home";

function App() {

  const { isAuthenticated } = useContext(authContext)

  const actualRoute = !isAuthenticated ? <Route path={'/*'} element={<LogIn />} /> : <Route path={'/*'} element={<Home />} />

  return (
    <BrowserRouter>
      <Routes>
        {actualRoute}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
