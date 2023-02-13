import React from 'react'
import {Link} from 'react-router-dom'
import '../css/signup.css'
function Signup() {
  return (
    <div class="container">
            <form action="#">
                <h1>Welcome</h1>
                <input type="text" placeholder="Name" autocomplete="off" />
                <input type="text" placeholder="Registration Number" autocomplete="off" />
                <input type="text" placeholder="Course" autocomplete="off"/>
                <input type="text" placeholder="Branch" autocomplete="off" />
                <input type="email" placeholder="Email" autocomplete="off" />
                <input type="password" placeholder="Password" autocomplete="off" />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
  )
}

export default Signup