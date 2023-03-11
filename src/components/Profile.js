import React, { useState, useEffect } from 'react'
// import axios from 'axios';

function Profile() {

  const [posts, setPosts] = useState('');
  const [leetcodeUser, setLeetcode] = useState('');

  // https://animechan.vercel.app/api/random

  let p = fetch("http://localhost:5000/api/auth/getuser", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'auth-token': localStorage.getItem("token")
    }
  }).then((response) => response.json()).then((user) => {
    console.log(user);
    setPosts(user);
  })


  let leetcode = fetch(`https://leetcode-stats-api.herokuapp.com/${posts.leetcode}`).then((response) => response.json()).then((user) => setLeetcode(user));

  const style={
    width:'700px',
    marginLeft: 'auto',
    marginRight:'auto',
    textAlign:'center',
    padding:'10px',
    marginTop:'20px'
  }

  return (
    <>
      <div className="card mb-3" style={style}>
        <div className="row g-0">
          <div className="col-md-6">
            <img src='./defaultProfilePicture.jpg' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <p className="card-title">Name: {`${posts.firstName}`} {`${posts.lastName}`}</p>
              <p className="card-title">Email: {`${posts.email}`}</p>
              <p className="card-title">Course: {`${posts.course}`}</p>
              <p className="card-title">Registration Number: {`${posts.regNo}`}</p>
              <p className="card-title">Branch: {`${posts.branch}`}</p>
              <p className="card-title">Year: {`${posts.year}`}</p>
            </div>
          </div>
        </div>
      </div>

    <h1>Profiles</h1>

    <div className="card mb-3" style={style}>
        <div className="row g-0">
          <div className="col-md-6">
            <img src='./defaultProfilePicture.jpg' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <p className="card-title">UserName: {`${posts.leetcode}`} </p>
              <p className="card-title">Total Ques Solved: {`${leetcodeUser.totalSolved}`}</p>
              <p className="card-title">Course: {`${posts.course}`}</p>
              <p className="card-title">Registration Number: {`${posts.regNo}`}</p>
              <p className="card-title">Branch: {`${posts.branch}`}</p>
              <p className="card-title">Year: {`${posts.year}`}</p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Profile