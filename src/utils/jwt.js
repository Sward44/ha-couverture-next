import jwt from 'jsonwebtoken';

export function signJwt(payload) {
 const token = jwt.sign(payload, process.env.NEXTAUTH_SECRET, { expiresIn: "1d" });
  return token;
}

export function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
}