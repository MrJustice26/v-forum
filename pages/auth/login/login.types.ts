  interface LoginFields {
    email: string;
    password: string;
  }

type LoginFieldsErrors = Partial<Record<keyof LoginFields, string>>


  export {LoginFields, LoginFieldsErrors};