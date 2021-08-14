const { verify } = require("jsonwebtoken");

const userToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (accessToken) {
    const validToken = verify(
      accessToken,
      "5247d3f8-f962-11eb-9a03-0242ac130003"
    );
    if (validToken) req.user = validToken;
  }
  return next();
};

module.exports = { userToken };
