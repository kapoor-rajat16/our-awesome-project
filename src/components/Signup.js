import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import '../css/signup.css'
function Signup() {

  const [cred, setcred] = useState({firstName:"", lastName:"",regNo:"",course:"",email:"",year:"",branch:"",password:""});
  const navigate = useNavigate();
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser',{
      method:'POST',
      headers:{ 
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({firstName:cred.firstName,lastName:cred.lastName,regNo:cred.regNo,course:cred.course,year:cred.year,branch:cred.branch,email:cred.email,password:cred.password})
    })
    const json = await response.json();
    console.log(json); 
    if(json.success){
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/');
  }else{
      alert("Invalid Credentials!");
  }
  }

  const onChange = (e) =>{
    setcred({...cred,[e.target.name]:e.target.value});
  }

  return (
    <div className="container" id='signup'>
            <form onSubmit={handleSubmit}>
                <h1>Welcome</h1>
                <div className="row">
                <div className="col-md-6">
                <input type="text" placeholder="First Name" name="firstName" onChange={onChange} value={cred.firstName} autoComplete="off" />
                <input type="text" placeholder="Registration Number" name="regNo" onChange={onChange} value={cred.regNo} autoComplete="off" />
                <input type="text" placeholder="" name="course" onChange={onChange} value={cred.course} autoComplete="off"/>
                <input type="email" placeholder="Email" name="email" onChange={onChange} value={cred.email} autoComplete="off" />
                </div>
                <div className="col-md-6">

                <input type="text" placeholder="Last Name" name="lastName" onChange={onChange} value={cred.lastName} autoComplete="off" />
                <input type="text" placeholder="Year" name="year" onChange={onChange} value={cred.year} autoComplete="off" />
                <input type="text" placeholder="Branch" name="branch" onChange={onChange} value={cred.branch} autoComplete="off" />
                <input type="password" placeholder="Password" name="password" onChange={onChange} value={cred.password} autoComplete="off" />
                </div>
                <button type="submit">Sign Up</button>
                </div>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
  )
}

export default Signup