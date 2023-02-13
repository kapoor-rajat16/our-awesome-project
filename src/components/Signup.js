import React from 'react'
import {Link} from 'react-router-dom'
import '../css/signup.css'
function Signup() {
  return (
    <div class="container" id='signup'>
            <form action="#">
                <h1>Welcome</h1>
                <div className="row">
                <div className="col-md-6">
                <input type="text" placeholder="First Name" autocomplete="off" />
                <input type="text" placeholder="Registration Number" autocomplete="off" />
                <input type="text" placeholder="Course" autocomplete="off"/>
                <input type="email" placeholder="Email" autocomplete="off" />
                </div>
                <div className="col-md-6">

                <input type="text" placeholder="Last Name" autocomplete="off" />
                <input type="text" placeholder="Year" autocomplete="off" />
                <input type="text" placeholder="Branch" autocomplete="off" />
                <input type="password" placeholder="Password" autocomplete="off" />
                </div>
                <button type="submit">Sign Up</button>
                </div>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
  )
}

export default Signup