import { jwtVerify, SignJWT } from 'jose';

const ALG = 'HS256';
const ISS = 'elivate-admin';
const AUD = 'elivate-admin-user';

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return new TextEncoder().encode(secret);
}

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuer(ISS)
    .setAudience(AUD)
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(getSecret());
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { issuer: ISS, audience: AUD });
    return payload;
  } catch (e) {
    return null;
  }
}
