import React from "react";
import noteContext from "../context/notes/noteContext";
import { Link, useLocation,useNavigate } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  let navigate=useNavigate()
const handlelogout=()=>{
  localStorage.removeItem('token');
  navigate('/login');
}
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?
          <div class="d-flex ">
                <Link to='/login' type="botton" class="btn btn-primary mx-1">Login</Link>
                <Link to='/signup' type="botton" class="btn btn-primary mx-1">SignUp</Link>
          </div>:<button onClick={handlelogout} className="btn btn-primary">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
