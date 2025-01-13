/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
import type { UserDocument } from './UserDocument';
export type KycSubmission = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: KycSubmission.gender;
    userId: string;
    user?: User;
    status: KycSubmission.status;
    documents: Array<UserDocument>;
    _id: string;
    createdAt: string;
    updatedAt: string;
};
export namespace KycSubmission {
    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
    }
    export enum status {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}
