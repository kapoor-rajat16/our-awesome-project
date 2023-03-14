import React, { useState, useEffect } from 'react'

function User() {
  const [exists, setExists] = useState(false)
  const [regno, setregno] = useState('');
  const [user, setuser] = useState('');
  const [leetcodeUser, setLeetcode] = useState('');
  const handleChange = (e) => {
    setregno(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ regNo: regno })
    });
    console.log(response);
    const json = await response.json();
    setuser(json);
    setExists(true);
    console.log(json);
    console.log(exists);
  }

  const style = {
    width: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    padding: '10px',
    marginTop: '20px'
  }

  let leetcode = null;
  useEffect(() => {
    leetcode = fetch(`https://leetcode-stats-api.herokuapp.com/${user.leetcode}`).then((response) => response.json()).then((user) => setLeetcode(user));
  }, [])

  return (
    <>
      <div className="container" style={{width:"600px"}}>
        <h4 style={{color:'#ffffff'}} className='mx-auto my-3'>Get User Profile Details Via Registration Number</h4>
        <label style={{color:'#ffffff'}} htmlFor="regNo" className="form-label">Enter Registration Number</label>
        <form method='get' onSubmit={handleSubmit} action="submit">
          <input onChange={handleChange} type="text" id="regno" className="form-control" aria-describedby="passwordHelpBlock" />
          <button type='submit'>Find Details</button>
        </form>
      </div>

      {
        exists ? <div>
          <div className="card mb-3" style={style}>
            <div className="row g-0">
              <div className="col-md-6">
                <img src='./images/defaultProfilePicture.jpg' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <p className="card-title">Name: {`${user.firstName}`} {`${user.lastName}`}</p>
                  <p className="card-title">Email: {`${user.email}`}</p>
                  <p className="card-title">Course: {`${user.course}`}</p>
                  <p className="card-title">Registration Number: {`${user.regNo}`}</p>
                  <p className="card-title">Branch: {`${user.branch}`}</p>
                  <p className="card-title">Year: {`${user.year}`}</p>
                </div>
              </div>
            </div>
          </div>
          <h2 className='mx-auto'>Coding Profiles</h2>
        </div> : <div></div>
      }
      <div className="row">

        {user.leetcode ?
          <div classsName='col-md-6'>
            <div className="card mb-3" style={style}>
              <div className="row g-0">
                <div className="col-md-6">
                  <img src='./images/leetcode.png' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <p className="card-title">UserName: {`${user.leetcode}`} </p>
                    <p className="card-title">Total Ques Solved: {`${leetcodeUser.totalSolved}`}</p>
                    <p className="card-title">Course: {`${user.course}`}</p>
                    <p className="card-title">Registration Number: {`${user.regNo}`}</p>
                    <p className="card-title">Branch: {`${user.branch}`}</p>
                    <p className="card-title">Year: {`${user.year}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div> : <div></div>}
        {user.codeforces ?
          <div classsName='col-md-6'>
            <div className="card mb-3" style={style}>
              <div className="row g-0">
                <div className="col-md-6">
                  <img src='./images/codeforces.png' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <p className="card-title">UserName: {`${user.leetcode}`} </p>
                    <p className="card-title">Total Ques Solved: {`${leetcodeUser.totalSolved}`}</p>
                    <p className="card-title">Course: {`${user.course}`}</p>
                    <p className="card-title">Registration Number: {`${user.regNo}`}</p>
                    <p className="card-title">Branch: {`${user.branch}`}</p>
                    <p className="card-title">Year: {`${user.year}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div> : <div></div>}
        {user.gfg ?
          <div classsName='col-md-6'>
            <div className="card mb-3" style={style}>
              <div className="row g-0">
                <div className="col-md-6">
                  <img src='./images/gfg.png' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <p className="card-title">UserName: {`${user.leetcode}`} </p>
                    <p className="card-title">Total Ques Solved: {`${leetcodeUser.totalSolved}`}</p>
                    <p className="card-title">Course: {`${user.course}`}</p>
                    <p className="card-title">Registration Number: {`${user.regNo}`}</p>
                    <p className="card-title">Branch: {`${user.branch}`}</p>
                    <p className="card-title">Year: {`${user.year}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div> : <div></div>}
        {user.codechef ?
          <div classsName='col-md-6'>
            <div className="card mb-3" style={style}>
              <div className="row g-0">
                <div className="col-md-6">
                  <img src='./images/codechef.png' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <p className="card-title">UserName: {`${user.leetcode}`} </p>
                    <p className="card-title">Total Ques Solved: {`${leetcodeUser.totalSolved}`}</p>
                    <p className="card-title">Course: {`${user.course}`}</p>
                    <p className="card-title">Registration Number: {`${user.regNo}`}</p>
                    <p className="card-title">Branch: {`${user.branch}`}</p>
                    <p className="card-title">Year: {`${user.year}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div> : <div></div>}
      </div>
    </>

  )
}

export default User