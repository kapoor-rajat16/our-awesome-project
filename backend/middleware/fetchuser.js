var jwt = require('jsonwebtoken');
const JWT_SECRET = 'shhhhh';

const fetchuser = (req, res, next) => {
    // get user form jwt token and add id to req object
    const token = req.header('auth-token');
    // const token = localStorage.getItem('authtoken'); 
    if (!token) {
        console.log('token not found');
        res.status(401).send({ error: "please authenticate with valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        console.log('token not found');
        res.status(401).send({ error: "please authenticate with valid token" })
    }
}

module.exports = fetchuser;