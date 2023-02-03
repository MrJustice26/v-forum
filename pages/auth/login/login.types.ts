interface LoginField {
    value: string;
    istouched: boolean;
  }
  
  interface LoginFields {
    email: LoginField;
    password: LoginField;
  }

type LoginFieldsErrors = Partial<Record<keyof LoginFields, string>>


  export {LoginFields, LoginFieldsErrors};