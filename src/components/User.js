import React from 'react'

function User() {
  return (
    <>
      <h3 className='mx-auto my-3'>Get User Profile Details Via Registration Number</h3>
      <label htmlFor="inputPassword5" className="form-label">Registration Number</label>
      <form action="submit">
        <input type="text" id="regno" className="form-control" aria-describedby="passwordHelpBlock" />
        <button type='submit'>Find Details</button>
      </form>
        

    </>
  )
}

export default User