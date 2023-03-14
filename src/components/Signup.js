import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/signup.css'
function Signup() {

  const [cred, setcred] = useState({ firstName: "", lastName: "", regNo: "", course: "", email: "", year: "", branch: "", password: "" ,about:""});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName: cred.firstName, lastName: cred.lastName, regNo: cred.regNo, course: cred.course, year: cred.year, branch: cred.branch, email: cred.email, password: cred.password, about: cred.about })
    })
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/');
    } else {
      alert("Invalid Credentials!");
    }
  }

  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  }

  const styleObj = {
    backgroundColor: '#ffffff',
    marginTop: '30px',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '400px'
  }

  return (
    <div className="container" id='signup' style={styleObj}>
      <form onSubmit={handleSubmit}>
        <h1>Welcome</h1>
        <div className="row">
          <div className="col-md-6">
            <input type="text" placeholder="First Name" name="firstName" onChange={onChange} value={cred.firstName} autoComplete="off" />
            <input type="text" placeholder="Registration No." name="regNo" onChange={onChange} value={cred.regNo} autoComplete="off" />
            <input type="text" placeholder="Course" name="course" onChange={onChange} value={cred.course} autoComplete="off" />
            <input type="email" placeholder="Email" name="email" onChange={onChange} value={cred.email} autoComplete="off" />
          </div>
          <div className="col-md-6">

            <input type="text" placeholder="Last Name" name="lastName" onChange={onChange} value={cred.lastName} autoComplete="off" />
            <input type="text" placeholder="Year" name="year" onChange={onChange} value={cred.year} autoComplete="off" />
            <input type="text" placeholder="Branch" name="branch" onChange={onChange} value={cred.branch} autoComplete="off" />
            <input type="password" placeholder="Password" name="password" onChange={onChange} value={cred.password} autoComplete="off" />
          </div>

          <div className="col-md-12">
            <div className="form-floating">
              <textarea className="form-control my-2" id="about" name="about" onChange={onChange} value={cred.about} style={{height: "170px"}}></textarea>
              <label htmlFor="about">Tell About Yourself</label>
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </div>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Signup