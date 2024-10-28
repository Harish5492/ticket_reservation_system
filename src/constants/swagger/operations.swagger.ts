export const SWAGGER_OPERATION = {
  USER: {
    REGISTER_LOGIN_USER: {
      summary: 'Register OR Login  a New User',
      description:
        'Register a new user by providing necessary details and saving the information in the database. OR Login User to get all the benefits of the application',
    },
    ENTER_MOBILE_NUMBER: {
      summary: 'Enter the Mobile Number of the User',
      description:
        'Enter the Mobile Number of the User to get the otp for login or registration',
    },
    MOBILE_EXISTS: {
      summary: 'Check Mobile Availability',
      description:
        'Determine if a given Mobile Number is already registered in the system.',
    },
  },
};
