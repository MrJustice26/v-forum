interface IUserModel {
    _id: string
    username: string
    email: string
    password: string
    activationLink: string
    isActivated: boolean
}

export default IUserModel
