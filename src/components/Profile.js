import React, { useState, useEffect } from 'react'
// import axios from 'axios';

function Profile() {

  const [posts, setPosts] = useState('');

  // https://animechan.vercel.app/api/random

  let p = fetch("http://localhost:5000/api/auth/getuser", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'auth-token' : localStorage.getItem("token")
    }
  }).then((response) => response.json()).then((user) => {
    console.log(user);
    setPosts(user);
  })

  return (
    <>
      <h1>Hello</h1>
      <h1>{`${posts.regNo}`}</h1>
    </>

  )
}

export default Profile