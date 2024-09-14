import Nav from "./components/Nav";
import Create from "./pages/Create";
import Home from "./pages/Home"
import List from "./pages/List";
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Routes, Route } from "react-router-dom";
import Singlepage from "./pages/Singlepage";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/singlePage/:id" element={<Singlepage />} />
      </Routes>
    </div>
  )
}

export default App