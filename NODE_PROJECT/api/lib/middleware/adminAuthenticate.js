// create a middleware function called authenticate that checks for a username and password and validates them against the credentials in the .env file. If the credentials are valid, then the user is logged in and the request should be allowed to continue to the next middleware or route handler. If the credentials are invalid, then the user should receive a 401 status code and the response should end.