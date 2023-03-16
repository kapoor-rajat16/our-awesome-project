import React from 'react'

export default function CollegeProfile(props) {
    const style = {
        width: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        padding: '10px',
        marginTop: '20px'
      }
    return (
        <div className="row" style={style}>
            <div className="col-md-4">
                <img src='./images/defaultProfilePicture.jpg' className="img-fluid rounded-start py-3" alt="..." style={{ width: '150px' }} />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <p className="card-title">Name: {`${props.user.firstName}`} {`${props.user.lastName}`}</p>
                    <p className="card-title">Email: {`${props.user.email}`}</p>
                    <p className="card-title">Course: {`${props.user.course}`}</p>
                    <p className="card-title">Registration Number: {`${props.user.regNo}`}</p>
                    <p className="card-title">Branch: {`${props.user.branch}`}</p>
                    <p className="card-title">Year: {`${props.user.year}`}</p>
                </div>
            </div>
        </div>
    )
}
