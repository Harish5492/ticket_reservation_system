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
  OTP: {
    OTP_EXPIRES: 30 * 1000,
  },
};

export const MESSAGES = {
  USER: {
    MOBILE_NUMBER_GIVEN_SUCCESSFULLY:
      'Mobile Number has been given succesfully',
    SIGN_UP_SUCCESS: 'You have registered successfully.',
    SIGN_IN_SUCCESS: 'You have logged in successfully',
    ACCOUNT_DELETED: 'Your account has been deleted successfully.',
    REFRESH_TOKEN: 'Refresh token successfully',
    OTP_VERIFIED: 'One time password has been verified successfully.',
    SEND_OTP: 'Your otp send successfully.',
    LOGGED_IN: 'You have been logged in successfully.',
    LOGGED_OUT: 'You have been logged out successfully.',
    MOBILE_NUMBER_EXISTS: 'Mobile Number Already Exists.',
    PROFILE_UPDATED: 'Profile Updated Successfully',
    GOOGLE_USER_SUCCESS: 'User has been fetched from the google successfully',
  },
  ERROR: {
    GOOGLE_USER_FAILED: 'No User found from the google. Kindly try again ',
    EXPIRES_TOKEN: 'Token has been expired',
    OTP_EXPIRES: 'OTP expires please try again.',
    USER_NOT_EXIST: 'This user not exist.',
    MOBILE_NUMBER_EXISTS: 'Mobile Number is already exists.',
    MOBILE_NUMBER_NOT_EXISTS: 'Mobile Number is not exists.',
    ACCESS_DENIED: 'ACCESS_DENIED.',
    INVALID_OTP: 'Invalid OTP.',
    OTP_USED: 'OTP Already Used.',
    INVALID_MOBILE_NO: 'Invalid Mobile Number Please Check Again.',
  },
  API_INFO: {
    MOBILE_NUMBER_GIVEN_SUCCESSFULLY:
      'Mobile Number has been given succesfully',
    REGISTRATION_LOGIN_SUCCESSFUL: 'Registration/LOGIN Successful',
    MOBILE_NUMBER_EXISTS: 'Mobile Number Already Exists',
    MOBILE_NUMBER_AVAILABLE: 'Mobile Number Is Avaliable',
  },
};
