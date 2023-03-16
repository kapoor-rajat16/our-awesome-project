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
                    <p className="card-title">Name: {`${props.queryuser.firstName}`} {`${props.queryuser.lastName}`}</p>
                    <p className="card-title">Email: {`${props.queryuser.email}`}</p>
                    <p className="card-title">Course: {`${props.queryuser.course}`}</p>
                    <p className="card-title">Registration Number: {`${props.queryuser.regNo}`}</p>
                    <p className="card-title">Branch: {`${props.queryuser.branch}`}</p>
                    <p className="card-title">Year: {`${props.queryuser.year}`}</p>
                </div>
            </div>
        </div>
    )
}
