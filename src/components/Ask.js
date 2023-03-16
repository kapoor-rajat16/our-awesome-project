import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Ask() {
  const navigate = useNavigate();

  const [query, setQuery] = useState({ heading: '', text: '', tag: '', regNo:''});
  const [user, setUser] = useState('');
  useEffect(() => {
    let p = fetch("http://localhost:5000/api/auth/getuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token")
      }
    }).then((response) => response.json()).then((res) => {
      // console.log(res);
      setUser(res);
      setQuery({ heading: '', text: '', tag: '', regNo:user.regNo})
    })
  }, [])



  const onChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    if(!user){
      alert('Please First Login!')
      navigate('/login');
    }
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/query/createquery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ heading: query.heading, text: query.text, tag: query.tag, regNo: user.regNo, firstName:user.firstName, lastName:user.lastName })
    })
    const json = await response.json();
    console.log(json);
    navigate('/');
  }

  return (
    <>
      <div className="container" style={{ width: "600px" }}>
        <form onSubmit={onSubmit} method='get' action="submit">
          <input type="text" style={{ display: "none" }}  value={user}/>
          <h4 style={{ color: '#ffffff' }} className='mx-auto my-3'>Ask any Query</h4>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Heading" aria-label="Heading" name='heading' id='heading' onChange={onChange} value={query.heading} required />
          </div>
          <div className="form-floating">
            <textarea className="form-control" placeholder="Leave a comment here" style={{ width: '580px', height: '250px' }} name='text' id='text' onChange={onChange} value={query.text} required></textarea>
            <label htmlFor="floatingTextarea2">Query</label>
          </div>
          <div class="input-group my-3" style={{ width: '580px' }}>
            <label class="input-group-text" for="tag" required>Tag</label>
            <select class="form-select" id="tag" name='tag' onChange={onChange} value={query.tag} required>
              <option selected>Choose...</option>
              <option value="1">Coding</option>
              <option value="2">Development</option>
              <option value="3">Accademics</option>
              <option value="4">General</option>
            </select>
          </div>
          {/* <div class="mb-3" style={{ width: '580px'}}>
            <label for="formFile" class="form-label">Default file input example</label>
            <input class="form-control" type="file" id="formFile" />
          </div> */}
          <button type='submit'>Upload</button>
        </form>
      </div>
    </>
  )
}
