/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { KycSubmission } from './KycSubmission';
export type PaginatedKycSubmissionResponse = {
    docs: Array<KycSubmission>;
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
