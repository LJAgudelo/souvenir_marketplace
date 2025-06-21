import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_PASSWORD, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; // opcional: pasás info a la ruta
    next();
  });
};

export default authMiddleware;
