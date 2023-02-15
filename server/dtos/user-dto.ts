import IUserModel from '~~/server/models/User/user-model.type';

export class UserDto {
    public email: string;
    public id: string;
    public isActivated: boolean;

    constructor(model:IUserModel){
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}