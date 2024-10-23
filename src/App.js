import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./Components/Alert";
import SignUp from "./Components/SignUp";

import UserLogin from "./Components/UserLogin";
function App() {
  localStorage.removeItem('token');
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={"Hello"}/>
          <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<UserLogin />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
