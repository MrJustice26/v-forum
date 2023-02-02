interface IMessage {
    createdAt: Date,
    title: string,
    content: string,
}

interface IUser {
    id: string,
    username: string,
    messages: IMessage[] | []
}

interface IDB {
    users: IUser[] | []
}

export const db: IDB = {
    users: []
}