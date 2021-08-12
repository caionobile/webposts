const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  try {
    if (!accessToken) throw new Error();
    const validToken = verify(
      accessToken,
      "5247d3f8-f962-11eb-9a03-0242ac130003"
    );
    if (validToken) {
      req.username = validToken.username;
      return next();
    }
  } catch {
    return res.status(401).json({ error: "User not logged in" });
  }
};

module.exports = { validateToken };
