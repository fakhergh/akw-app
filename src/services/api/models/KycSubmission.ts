/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
export type KycSubmission = {
    userId: string;
    user?: User;
    status: KycSubmission.status;
    _id: string;
    createdAt: string;
    updatedAt: string;
};
export namespace KycSubmission {
    export enum status {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}
