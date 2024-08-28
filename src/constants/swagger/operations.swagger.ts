export const SWAGGER_OPERATION = {
  USER: {
    REGISTER_USER: {
      summary: 'Register a New User',
      description:
        'Register a new user by providing necessary details and saving the information in the database.',
    },
    EMAIL_EXITS: {
      summary: 'Check Email Availability',
      description:
        'Determine if a given email address is already registered in the system.',
    },
    LOGIN_USER: {
      summary: 'User Login',
      description:
        'Authenticate a user by allowing them to log in using either their mobile number or email address.',
    },
    FORGOT_PASSWORD: {
      summary: 'Request Link for Password Reset',
      description:
        'Initiate the password reset process by requesting a Link to be sent to the user’s registered email.',
    },
    RESET_PASSWORD: {
      summary: 'Reset Password',
      description:
        'Validate the Link entered by the user and allow them to set a new password to complete the password reset process.',
    },
  },
};
