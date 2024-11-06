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
    EDIT_USER_PROFILE: {
      summary: 'Edit the profile of the User',
      description:
        'Add the nessecery details of the user to secure the profile of user',
    },
    LOGIN_USER_WITH_GOOGLE: {
      summary: 'Login the user with the help of google',
      description: 'Login the user with google mail',
    },
  },

  MOVIES: {
    ADD_MOVIE: {
      summary: 'Add the new movie in the list',
      descrption:
        'Add the movie in the list so that people can enjoy it in the threaters',
    },
    ALL_MOVIES: {
      summary: 'Get All Movies',
      description: 'Watch All Movies and visit the therater to enjoy the film',
    },
    GET_PARTICULAR_MOVIE: {
      summary: 'Get a particular Movie',
      description: 'Get a particular movie by its particular id',
    },
    UPDATE_MOVIE: {
      summary: 'Update the particular Movie',
      description: 'Update the things in a particular movie',
    },
    DELETE_MOVIE: {
      summary: 'Delete the particular Movie',
      description: 'Delete the t particular movie',
    },
    SEARCHED_MOVIE: {
      summary: 'Search the particular Movie',
      description: 'Search the particular movie',
    },
    NEW_MOVIES: {
      summary: 'New Movies Added',
      description: 'New Movies Added enjoy the shows',
    },
    ADD_RATING: {
      summary: 'Add the rating for the specific movie',
      description:
        'Rating of the movie by a specific movie depends upon his experience',
    },
    UPDATE_RATING: {
      summary: 'Update the rating',
      description: 'user can update the rating ',
    },
    DELETE_RATING: {
      summary: 'Delete the rating',
      description: 'Delete the rating for the movie ',
    },
  },
};
