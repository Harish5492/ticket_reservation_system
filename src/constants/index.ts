import { SWAGGER_OPERATION } from './swagger/operations.swagger';
import { ENVIROMENT_MANAGER } from './environment.setup';

export const SEQUELIZE = 'SEQUELIZE';
export const EM = ENVIROMENT_MANAGER;
export const DEVELOPMENT = 'dev';
export const STAGE = 'stage';
export const PRODUCTION = 'prod';
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const API_OPERATIONS = SWAGGER_OPERATION;

export const TIME = {
  JWT: {
    FIFTEEN_MINUTES: '15m',
    TWO_MINUTES: '2m',
    FIVE_DAYS: '5d',
    THIRTY_DAYS: '30d',
  },
  TOKEN: {
    TOKEN_EXPIRES: 15 * 60 * 1000,
  },
};

export const MESSAGES = {
  USER: {
    SIGN_UP_SUCCESS: 'You have registered successfully.',
    SIGN_IN_SUCCESS: 'You have logged in successfully',
    ACCOUNT_VERIFIED: 'Your account has been verified successfully.',
    ACCOUNT_DELETED: 'Your account has been deleted successfully.',
    REFRESH_TOKEN: 'Refresh token successfully',
    OTP_VERIFIED: 'One time password has been verified successfully.',
    SEND_OTP: 'Your otp send successfully.',
    FORGOT_PASSWORD_LINK:
      'Your forgot Password Link has been sent to your email successfully.',
    RESET_PASSWORD: 'Your password reset successfully.',
    UPDATE_EMAIL_MOBILE_STEP: 'Code sent successfully.',
    LOGGED_IN: 'You have been logged in successfully.',
    LOGGED_OUT: 'You have been logged out successfully.',
    EMAIL_EXISTS: 'Email Already Exists.',
  },
  ERROR: {
    EXPIRES_TOKEN: 'Your Token Expires please try again.',
    USER_NOT_EXIST: 'This user not exist.',
    EMAIL_EXISTS: 'Email is already exists.',
    EMAIL_NOT_EXISTS: 'Email is not exists.',
    ACCESS_DENIED: 'ACCESS_DENIED',
    INVALID_TOKEN: 'Invalid Token',
    PASSWORD_MISSMATCHED: 'Confirm Password must be same as Password',
    INCORRECT_PASSWORD: 'Incorrect Password',
    TOKEN_USED: 'Token Already Used',
  },
  API_INFO: {
    REGISTRATION_SUCCESSFUL: 'Registration Successful',
    EMAIL_ALREADY_EXISTS: 'Email Already Exists',
    EMAIL_AVAILABLE: 'Email Is Avaliable',
    FORGOT_PASSWORD_LINK:
      'Forgot Password Link Has Been Given To Your Email Kindly Check Your Email',
    RESET_PASSWORD: 'Your Password Has Been Reset Successfully',
  },
};
