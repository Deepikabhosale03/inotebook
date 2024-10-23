import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [crediential, setCrediential] = useState({ email: "", password: "" });
 let navigate=useNavigate();

  const handleclick = async (e) => {
    e.preventDefault();
   
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: crediential.email,
        password: crediential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success)
    {
    localStorage.setItem('token',json.authToken);
    navigate('/');
    }
    else
    {
      
      alert('Invalid creadiential')
    }
  };
  const onchange = (e) => {
    setCrediential({ ...crediential, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onchange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
