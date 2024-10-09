const User = require('../models/user');
require("dotenv").config();

//middleware for authorization
const isLoggedIn = async (req, res, next) => {
    try {
      // check if auth header exists
      if (req.headers.authorization) {
        // parse token from header
        const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
        if (token) {
        // console.log(token)
        // console.log(process.env.SECRET)
          const payload = await jwt.verify(token, process.env.SECRET);
          console.log(payload)
          if (payload) {
            console.log("Success: ",payload);
            // store user data in request object
            req.user = payload;
            next();
          } else {
            res.status(400).json({ error: "token verification failed" });
          }
        } else {
          res.status(400).json({ error: "malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  module.exports = isLoggedIn;