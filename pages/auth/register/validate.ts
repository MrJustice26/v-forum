import { RegisterFields, RegisterFieldsErrors } from "./register.types";

const validate = (registerFields: RegisterFields): RegisterFieldsErrors => {
    const errors: RegisterFieldsErrors = {};
    if(registerFields.email.trim()){
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{1,6}$/.test(registerFields.email)){
            errors.email = 'Please provide a correct email!'
        }
    } else {
        errors.email = 'Email should be provided!'
    }


    if(!registerFields.password.trim()){
        errors.password = "Password should be provided!"
    }

    if(registerFields.rpassword.trim()){
        if(registerFields.password !== registerFields.rpassword){
            errors.rpassword = "Passwords are not equal!"
        }
    } else {
        errors.rpassword = "Repeat password should not be empty!"
    }

    return errors;
}

export default validate;