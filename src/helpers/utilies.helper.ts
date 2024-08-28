import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import { EM, MESSAGES } from '../constants';
import { throwError } from './responseHandeler';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
export const encryptCipher = async (data: any) => {
  const encryptionKey: any = EM.ENCDECRYPT_KEY;
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
};

export const decryptCipher = (data: string) => {
  const reqEncKey: any = EM.ENCDECRYPT_KEY;
  const parsedToken = JSON.parse(
    CryptoJS.AES.decrypt(data, reqEncKey).toString(CryptoJS.enc.Utf8),
  );
  return parsedToken;
};

export const encryptCipherWithTime = async (
  data: any,
  expirationTimeInMinutes: any,
) => {
  const encryptionKey: string = EM.ENCDECRYPT_KEY;

  const currentTime = new Date().getTime();
  const expirationTime = currentTime + expirationTimeInMinutes;

  const dataWithTimestamp = {
    data,
    expirationTime,
  };

  return CryptoJS.AES.encrypt(
    JSON.stringify(dataWithTimestamp),
    encryptionKey,
  ).toString();
};

export const decryptCipherWithTime = (data: string) => {
  const reqEncKey: string = EM.ENCDECRYPT_KEY;
  const decryptedString = CryptoJS.AES.decrypt(data, reqEncKey).toString(
    CryptoJS.enc.Utf8,
  );
  const parsedToken = JSON.parse(decryptedString);

  const currentTime = new Date().getTime();
  if (currentTime > parsedToken.expirationTime) {
    throwError(MESSAGES.ERROR.EXPIRES_TOKEN);
  }

  return parsedToken.data;
};
