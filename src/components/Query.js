import React, { useState, useEffect } from 'react'
import CollegeProfile from './CollegeProfile';
export default function Query(props) {

    const { heading, text, tag, regNo, userName, _id } = props.query;
    const x = { "id": _id };
    const y = { "regNo": regNo };
    const [user, setUser] = useState('')
    const [queryuser, setQueryuser] = useState('');
    const [query, setQuery] = useState({ heading: heading, text: text, regNo: regNo, userName: userName, _id: _id });
    // const [queryRegNo, setQueryRegNo] = useState({regNo:''})
    // setQueryRegNo({regNo:regNo});

    useEffect(() => {
        let p = fetch("http://localhost:5000/api/auth/getuser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem("token")
            }
        }).then((response) => response.json()).then((user) => {
            // console.log(user);
            setUser(user);
        })
    }, [])

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
            window.location.reload();
        })
    }

    const getUser = async (e) => {
        e.preventDefault();
        // const input = document.getElementById('queryRegNo');
        console.log(query.regNo);

        const response = await fetch('http://localhost:5000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ regNo: query.regNo })
        });
        const json = await response.json();
        setQueryuser(json);
        console.log(queryuser)
        const btn = document.getElementById('modalbtn');
        btn.click();
    }

    const clickFormBtn = (e) => {
        const btn = document.getElementById(_id);
        btn.click();
    }

    return (
        <>

            <div className="container my-5">
                <div className="card my-2 mx-auto" style={{ width: "1000px" }}>
                    <div className="card-header" id='header' onClick={clickFormBtn}>
                        {userName} - {regNo}
                        <form method="post" onSubmit={getUser}>
                            <input type="text" id={regNo} value={regNo} name='regNo' style={{ display: 'none' }} />
                            <button type='submit' id={_id} style={{ display: 'none' }}></button>
                        </form>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title pb-4">{heading}</h5>
                        <p className="card-text pb-2">{text}</p>
                        <p>#{tag}</p>
                        <a href="#" className="btn btn-outline-primary btn-sm">Go somewhere</a>
                        {user.regNo == regNo ? <div>
                            <img style={{ height: '40px' }} onClick={onClick} className='btn' src="./images/delete.webp" alt="" />
                        </div> : <div></div>}
                    </div>
                </div>
            </div>

                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target='#profile' id='modalbtn' style={{ display: 'none' }}></button>

                <div class="modal fade" tabindex="-1" id='profile' aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <CollegeProfile queryuser={queryuser} />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
