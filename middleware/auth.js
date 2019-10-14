const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_PROD || 'developmentSecret';

function generateToken(user) {
    const payload = {
      email: user.email,
      firebaseId: firebaseId
    };
  
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ msg: "Authentication Failed" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(404).json({ msg: 'No Authentication' });
  }
}

module.exports = {
    generateToken,
    restricted
}