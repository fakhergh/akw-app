/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { User } from './User';
export type PaginatedUserResponse = {
    docs: Array<User>;
    limit: number;
    page?: number;
    totalDocs: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    totalPages: number;
    offset: number;
    prevPage?: number;
    nextPage?: number;
    pagingCounter: number;
};
