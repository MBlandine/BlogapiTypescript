"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'Authorization header missing' });
        return;
    }
    // Check Bearer token format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({ error: 'Authorization header malformed' });
        return;
    }
    const token = parts[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        // This will help you catch config issues early
        console.error('JWT_SECRET is not defined in environment variables');
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    try {
        // Note: your token payload uses userId, so decode accordingly
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        // Optional: Log the exact error for debugging
        console.error('JWT verification failed:', err);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
exports.authMiddleware = authMiddleware;
