// create a middleware function called authenticate that checks for a username and password and validates them against the credentials in the .env file. If the credentials are valid, then the user is logged in and the request should be allowed to continue to the next middleware or route handler. If the credentials are invalid, then the user should receive a 401 status code and the response should end.


import jwt from "jsonwebtoken";
const SECRET_KEY = "secret";


function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

        console.log("Token", token);
    
    const tokenwithoutBearer = token.split(" ")[1];

  // verify the token 

    jwt.verify(tokenwithoutBearer, SECRET_KEY, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }
    
        req.decodedToken = decodedToken;
        next();
    });


   
}

export default authenticate;