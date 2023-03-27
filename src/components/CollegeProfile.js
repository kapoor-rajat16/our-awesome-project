import React, { useEffect, useState } from 'react'

export default function CollegeProfile(props) {

    // const [data, setData] = useState({firstName:'', lastName:'',email:'',course:'',regNo:'',branch:'',year:''});
    // setData(props.queryuser);

    const [data, setData] = useState('');

    useEffect(() => {
        setData(props.queryuser);
        console.log(data);
    }, [props.queryuser])
    

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
                    <p className="card-title">Name: {`${data.firstName}`} {`${data.lastName}`}</p>
                    <p className="card-title">Email: {`${data.email}`}</p>
                    <p className="card-title">Course: {`${data.course}`}</p>
                    <p className="card-title">Registration Number: {`${data.regNo}`}</p>
                    <p className="card-title">Branch: {`${data.branch}`}</p>
                    <p className="card-title">Year: {`${data.year}`}</p>
                </div>
            </div>
        </div>
    )
}
