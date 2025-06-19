"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.profile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body; // expects "username" from client
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const result = yield database_1.pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        const user = result.rows[0];
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ user, token });
    }
    catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const result = yield database_1.pool.query('SELECT id, name AS username, email FROM users WHERE id = $1', [userId]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error('Profile Error:', err);
        res.status(500).json({ error: 'Could not fetch profile' });
    }
});
exports.profile = profile;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }
    try {
        const result = yield database_1.pool.query('SELECT id, name AS username, email, created_at FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error('GetProfile Error:', err);
        res.status(500).json({ error: 'Could not fetch profile details' });
    }
});
exports.getProfile = getProfile;
