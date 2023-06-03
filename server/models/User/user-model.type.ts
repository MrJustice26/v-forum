interface IUserModel {
    username: string
    _id: string
    email: string
    password: string
    activationLink: string
    isActivated: boolean
}

export default IUserModel
