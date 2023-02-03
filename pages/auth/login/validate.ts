import { LoginFields, LoginFieldsErrors } from "./login.types";

const validate = (loginFields: LoginFields): LoginFieldsErrors => {
    const errors: LoginFieldsErrors = {};

    if(!loginFields.email.value.trim()){
        errors.email = 'Email should be provided!'
    }

    if(!loginFields.password.value.trim()){
        errors.password = "Password should be provided!"
    }

    return errors;
}

export default validate;