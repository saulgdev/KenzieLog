import { IUserResponse } from "../users/users.interfaces"

export interface ICreateRequest {
    name:string
    user: IUserResponse
}

export interface IRequestResponse {
    name:string
    status:string
    deadline:string
    createdAt:string
    updatedAt:string
    user: IUserResponse
}

export interface IRequestUpdate{
    name:string
    status:string
    deadline:string
}