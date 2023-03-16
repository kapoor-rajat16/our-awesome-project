import React, { useState, useEffect } from 'react';
import Query from './Query'

function Home() {

  const [query, setQuery] = useState([]);

  useEffect(() => {
    let p = fetch("http://localhost:5000/api/query/getqueries", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => response.json()).then((res) => {
      // console.log(res);
      setQuery(res);
    })
  }, [])

  return (
    <div>
      {query.map(q => (
        <Query query={q} />
      ))}
    </div>
  )
}

export default Home