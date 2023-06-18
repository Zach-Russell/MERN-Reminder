const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader= req.headers.authorization;
    if (!authHeader) {
        res.status(401).send('invalid credentials');
    }
    else {
        const token = authHeader.split(' ')[1];
        console.log(token);
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err){
                res.status(403).send('invalid credentials');
                //Do not call next()
            }
            else {
                next();
                //Calling the next() function will allow Express to move onto the next function in router.js:
                //ex.) router.get('/todos', isLoggedIn, require('./routes/todosRoute'));
                //It recieves the next() inside of isLoggedIn and will call require()
            }
        });
    }
}