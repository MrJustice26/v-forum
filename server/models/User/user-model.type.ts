interface IUserModel {
    _id: string;
    email: string;
    password: string;
    activationLink: string;
    isActivated: boolean;
}

export default IUserModel;