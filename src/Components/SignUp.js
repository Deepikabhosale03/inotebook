import React, { useState } from "react";

const SignUp = () => {
  
    const [crediential, setCrediential] = useState({ name:"",email: "", password: "" });
    const handleclick = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:crediential.name,
          email: crediential.email,
          password: crediential.password,
        }),
      });
      const json = await response.json();
      console.log(json);
    };
    const onchange = (e) => {
      setCrediential({ ...crediential, [e.target.name]: e.target.value });
    };
  
    return (
      <div>
        <form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
             Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="name"
              onChange={onchange}
            />
          </div>
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
    
  )
}

export default SignUp
