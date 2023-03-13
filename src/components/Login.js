import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/signup.css'
function Login() {

    const [cred, setCred] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        console.log("yes");
        const json = await response.json();
        console.log(json);
        // console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        } else {
            alert("Invalid Credentials!");
        }
    }


    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
        // console.log(e.target.value);
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

        <div className="container my-5" id='login' style={styleObj}>
            <form onSubmit={handleSubmit}>
                <h1>Welcome</h1>
                <input type="email" placeholder="Email" name='email' onChange={onChange} value={cred.email} autoComplete="off" />
                <input type="password" placeholder="Password" name='password' onChange={onChange} value={cred.password} autoComplete="off" />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>

    )
}

export default Login