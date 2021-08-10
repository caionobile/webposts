const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) res.status(403).json({ error: "User not logged in" });
  try {
    const validToken = verify(
      accessToken,
      "5247d3f8-f962-11eb-9a03-0242ac130003"
    );
    if (validToken) {
      req.username = validToken.username;
      return next();
    }
  } catch (e) {
    return res.status(401).json({ error: e });
  }
};

module.exports = { validateToken };
