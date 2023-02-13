import React from 'react'
import {Link}  from 'react-router-dom'
// import '../css/signup.css'
function Login() {

    // const styles = {
    //     body: {
    //       background: 'linear-gradient(to right, #0072ff, #00c6ff)',
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       height: '100vh',
    //       fontFamily: 'Arial, sans-serif'
    //     }
    //   }
    return (

        <div className="container my-5">
            <form action="#">
                <h1>Welcome</h1>
                <input type="email" placeholder="Email" autocomplete="off"/>
                <input type="password" placeholder="Password" autocomplete="off"/>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
        
    )
}

export default Login