
interface RegisterFields {
  email: string;
  password: string;
  rpassword: string;
}

type RegisterFieldsErrors = Partial<Record<keyof RegisterFields, string>>


export {RegisterFields, RegisterFieldsErrors};