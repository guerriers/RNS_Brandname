const sendToken = (user, statusCode, res) => {
  const jwt = require("jsonwebtoken");
  //create jwt token
  // const token = user.getJwtToken();
  const token = jwt.sign(
    { id: user.id, status: user.status },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h", // Token expires in 1 hours
    }
  );

  res.cookie("token", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  // Hide from the response
  user.email = undefined;
  user.phone = undefined;
  // user.f_name = undefined;
  user.l_name = undefined;
  user.password = undefined;
  res.status(statusCode).json({ success: true, token, user });
};

module.exports = sendToken;
