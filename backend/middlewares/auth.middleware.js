const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  console.log("authMiddleware", req.url);
  if (req.url.startsWith("/api/user/logIn")) return next();
  if (req.url.startsWith("/api/user/signUp")) return next();
  if (req.url.startsWith("/api/course/getAllCourses")) return next();
  if (req.url.startsWith("/api/course/getCourse")) return next();
  if (req.url.startsWith("/uploads")) return next();
  if (req.url.startsWith("/api/courseStructure/upload-image")) return next();
  if (req.url.startsWith("/api/courseStructure/upload-video")) return next();
  if (req.url.startsWith("/api/courseStructure/upload-file")) return next();

  const token = req.headers["x-access-token"];
  if (!token) {
    console.log("Chyba overenia totoznosti");
    return res.status(401).send({ message: "Chyba overenia totoznosti" });
  }

  try {
    const decoded = jwt.verify(token, process.env.API_KEY);

    res.user = decoded;
    return next();
  } catch (error) {
    if (!token) {
      console.log("Chyba overenia totoznosti");

      return res.status(401).send({ message: "Chyba overenia totoznosti" });
    }
  }
};

module.exports = authMiddleware;
