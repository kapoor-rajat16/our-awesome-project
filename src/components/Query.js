import React from 'react'
import { useNavigate, useHistory  } from 'react-router-dom'
export default function Query(props) {
    const navigate = useNavigate();
    const history = useHistory();
    const { heading, text, tag, _id } = props.query;
    const x = {"id":_id};
    const onClick = (e) => {
        e.preventDefault();
        console.log(typeof x);
        let p = fetch("http://localhost:5000/api/query/deletequery", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: x.id })
        }).then((response) => response.json()).then((res) => {
            console.log(res);
            history.go(0);
            // window.location.reload();
        })
    }

    return (
        <div className="container my-5">
            <div className="card my-2 mx-auto" style={{ width: "1000px" }}>
                <div className="card-header">
                    {tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title pb-4">{heading}</h5>
                    <p className="card-text pb-2">{text}</p>
                    <a href="#" className="btn btn-outline-primary btn-sm">Go somewhere</a>
                    <img style={{ height: '40px' }} onClick={onClick} className='btn' src="./images/delete.webp" alt="" />
                </div>
            </div>
        </div>
    )
}
