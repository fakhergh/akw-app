/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
    firstName: string;
    lastName: string;
    kycStatus?: User.kycStatus;
    _id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
};
export namespace User {
    export enum kycStatus {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}
