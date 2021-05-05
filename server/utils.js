import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (request, response, next) => {
  const authorization = request.headers.authorization;
  if(authorization){
    const token = authorization.slice(7, authorization.length);  //Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (error, decode) => {
      if(error){
        request.status(401).send({ message: 'Invalid Token'});
      } else {
        request.user = decode;
        next();
      }
    });
  } else{
    request.status(401).send({ message: 'No Token'});
  }
};