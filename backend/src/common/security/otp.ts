import { randomInt } from 'node:crypto';
import { hash } from './hash.js';

export const OTP_EXPIRY_MINUTES = 5;

export async function createOtp() {
  const otp = randomInt(100000, 1000000).toString();
  return {
    otp,
    hashedOtp: await hash(otp),
    expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60_000),
  };
}
