class ApiError {
  userAlreadyExists() {
    throw createError({
      statusCode: 401,
      statusMessage: "User is already exists",
    });
  }

  unAuthorized() {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  loginCredentialsIncorrect() {
    throw createError({
      statusCode: 401,
      statusMessage: "Email or password are incorrect!",
    });
  }

  invalidActivationLink() {
    throw createError({
      statusCode: 404,
      statusMessage: "Activation link is not valid!",
    });
  }
  userEmailAreadyActivated() {
    throw createError({
      statusCode: 401,
      statusMessage: "User email is already activated!",
    });
  }

  internalError() {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong!",
    });
  }
}

export default new ApiError();
