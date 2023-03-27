import React, { useState, useEffect } from 'react'

function Profile() {

  const [posts, setPosts] = useState('');
  const [updatedState, updateState] = useState('');
  const [leetcodeUser, setLeetcode] = useState('');
  const [codeforcesUser, setCodeforces] = useState('');

  useEffect(() => {
    let p = fetch("http://localhost:5000/api/auth/getuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token")
      }
    }).then((response) => response.json()).then((user) => {
      // console.log(user);
      setPosts(user);
      updateState(user);
    })
  }, [])

  useEffect(() => {
    // console.log(posts);
    let l = fetch(`https://leetcode-stats-api.herokuapp.com/${posts.leetcode}`).then((res) => {
      return res.json();
    }).then((data) => {
      setLeetcode(data);
      // console.log(leetcodeUser);
    })
  }, [posts])


  // let codeforcesUrl = 'https://codeforces.com/api/user.info?handles=' + posts.codeforces
  useEffect(() => {
    let c = fetch(`https://codeforces.com/api/user.info?handles=${posts.codeforces}`).then((res) => {
      return res.json();
    }).then((data) => {
      setCodeforces(data.result.at(0));
      // console.log(codeforcesUser);
    })
  }, [posts])

  const style = {
    width: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    padding: '10px',
    marginTop: '20px'
  }

  const onChange = (e) => {
    updateState({ ...updatedState, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosts(updatedState);
    // console.log(updatedState);
    let p = fetch("http://localhost:5000/api/auth/updateuser", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ leetcode: updatedState.leetcode, codechef: updatedState.codechef, codeforces: updatedState.codeforces, gfg: updatedState.gfg, year: updatedState.year, branch: updatedState.branch, regNo: updatedState.regNo, about: updatedState.about })
    })
    document.getElementById('close').click();
  }
  return (
    <>
      <div className="card mb-3" style={style}>
        <div className="row g-0">
          <div className="col-md-5">
            <img src='./images/defaultProfilePicture.jpg' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
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
          <div className='col-md-1'>
            <img src="./images/gear.png" className='my-2' alt="Edit Profile" data-bs-toggle="modal" data-bs-target="#updateProfile" style={{ width: '30px', cursor: 'pointer' }} />
            {/* Modal */}
            <form onSubmit={handleSubmit}>
              <div className="modal fade" id="updateProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <input type="text" placeholder="Branch" name="branch" onChange={onChange} value={updatedState.branch} autoComplete="off" />
                          <input type="text" placeholder="First Name" name="firstName" onChange={onChange} value={updatedState.firstName} autoComplete="off" style={{ display: "none" }} />
                          <input type="text" placeholder="Registration No." name="regNo" onChange={onChange} value={updatedState.regNo} autoComplete="off" style={{ display: "none" }} />
                          <input type="text" placeholder="Course" name="course" onChange={onChange} value={updatedState.course} autoComplete="off" required style={{ display: "none" }} />
                          <input type="email" placeholder="Email" name="email" onChange={onChange} value={updatedState.email} autoComplete="off" style={{ display: "none" }} />
                          <input type="text" placeholder="Leetcode Handle" name="leetcode" onChange={onChange} value={updatedState.leetcode} autoComplete="off" />
                        </div>
                        <div className="col-md-6">

                          <input type="text" placeholder="Last Name" name="lastName" onChange={onChange} value={updatedState.lastName} autoComplete="off" style={{ display: "none" }} />
                          <input type="text" placeholder="Year" name="year" onChange={onChange} value={updatedState.year} autoComplete="off" required />
                          <input type="text" placeholder="Codeforces Handle" name="codeforces" onChange={onChange} value={updatedState.codeforces} autoComplete="off" />
                          <input type="text" placeholder="Codechef Handle" name="codechef" onChange={onChange} value={updatedState.codechef} autoComplete="off" style={{ display: "none" }} />
                          <input type="text" placeholder="GFG Handle" name="gfg" onChange={onChange} value={updatedState.gfg} autoComplete="off" style={{ display: "none" }} />
                        </div>

                        <div className="col-md-12">
                          <label htmlFor="about">About Yourself</label>
                          <textarea className="form-control my-2" id="about" name="about" onChange={onChange} value={updatedState.about} style={{ height: "170px" }}></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type='submit' id='close' className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-12">
            <p>About: {`${posts.about}`}</p>
          </div>
        </div>
      </div>
      {posts.leetcode || posts.codeforces ?
        <div className="text-center my-5" style={{ display: 'inline', color: '#ffffff' }}>
          <h1><u>Coding Profiles</u></h1>
        </div> : <div></div>}

      <div className="row">
        {posts.leetcode ?
          <div classsName='col-md-6'>
            <div className="card mb-3" style={style}>
              <div className="row g-0">
                <div className="col-md-6">
                  <img src='./images/leetcode.png' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <p className="card-title">User Name: {`${posts.leetcode}`} </p>
                    <p className="card-title">Total Ques Solved: {`${leetcodeUser.totalSolved}`}</p>
                    <p className="card-title">Easy: {`${leetcodeUser.easySolved}`}</p>
                    <p className="card-title">Medium: {`${leetcodeUser.mediumSolved}`}</p>
                    <p className="card-title">Hard: {`${leetcodeUser.hardSolved}`}</p>
                    <p className="card-title">Ranking: {`${leetcodeUser.ranking}`}</p>
                    <a target={'_blank'} className='btn btn-outline-primary' href={`https://leetcode.com/${posts.leetcode}`}>Leetcode Profile</a>
                  </div>
                </div>
              </div>
            </div>
          </div> : <div></div>}
        {posts.codeforces ?
          <div classsName='col-md-6'>
            <div className="card mb-3" style={style}>
              <div className="row g-0">
                <div className="col-md-6">
                  <img src='./images/codeforces.png' className="img-fluid rounded-start py-3" alt="..." style={{ width: '200px' }} />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <p className="card-title">User Name: {`${posts.codeforces}`} </p>
                    <p className="card-title">Total Ques Solved: {`${codeforcesUser.rank}`}</p>
                    <p className="card-title">Easy: {`${codeforcesUser.rating}`}</p>
                    <p className="card-title">Medium: {`${codeforcesUser.maxRank}`}</p>
                    <p className="card-title">Hard: {`${codeforcesUser.maxRating}`}</p>
                    <p className="card-title">Ranking: {`${codeforcesUser.friendOfCount}`}</p>
                    <a target={'_blank'} className='btn btn-outline-primary' href={`https://leetcode.com/${posts.codeforces}`}>Leetcode Profile</a>
                  </div>
                </div>
              </div>
            </div>
          </div> : <div></div>}
      </div>
    </>

  )
}

export default Profile