function adminMiddleware(req, res, next) {
  const user = req.user; 
  if (!user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  if (user.role_id !== 1) {
    return res.status(403).json({ message: "No autorizado" });
  }
  next();
}

export default adminMiddleware;