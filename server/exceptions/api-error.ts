
class ApiError {
    userAlreadyExists(){
        throw createError({statusCode: 401, statusMessage: "User is already exists"})
    }

    unAuthorized(){
        throw createError({statusCode: 401, statusMessage: "Unauthorized"})
    }

    loginCredentialsIncorrect(){
        throw createError({statusCode: 401, statusMessage: "Email or password are incorrect!"})
    }
}

export default new ApiError();
