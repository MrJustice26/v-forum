import { LoginFields, LoginFieldsErrors } from "./login.types";

const validate = (loginFields: LoginFields): LoginFieldsErrors => {
    const errors: LoginFieldsErrors = {};

    if(loginFields.email.trim()){
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{1,6}$/.test(loginFields.email)){
            errors.email = 'Please provide a correct email!'
        }
    } else {
        errors.email = 'Email should be provided!'
    }

    if(!loginFields.password.trim()){
        errors.password = "Password should be provided!"
    }

    return errors;
}

export default validate;