const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "chetan-darshit-jay";

const authMiddleware = (req, res, next) => {
    // Check for token in Authorization header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach user info from token to the request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is invalid or expired" });
    }
};

module.exports = authMiddleware;
