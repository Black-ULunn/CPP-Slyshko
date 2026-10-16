import jwt from 'jsonwebtoken';
import { users } from './data.js';
export const JWT_SECRET = 'rip-lab3-secret-key';

export function createToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
}

export function getUserFromToken(token) {
  if (!token) {
    return null;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return users.find((user) => user.id === payload.userId) || null;
  } catch (error) {
    return null;
  }
}

// Виділяє токен із заголовка "Authorization: Bearer <token>" і повертає користувача
export function getUserFromAuthHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.slice('Bearer '.length).trim();
  return getUserFromToken(token);
}
