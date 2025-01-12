/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KycSubmission } from '../models/KycSubmission';
import type { PaginatedKycSubmissionResponse } from '../models/PaginatedKycSubmissionResponse';
import type { TotalKycSubmissionResponse } from '../models/TotalKycSubmissionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class KycSubmissionService {
    /**
     * Paginated kyc submissions
     * @param page
     * @param limit
     * @returns PaginatedKycSubmissionResponse
     * @throws ApiError
     */
    public static kycSubmissionControllerPaginatedKycSubmissions(
        page?: number,
        limit?: number,
    ): CancelablePromise<PaginatedKycSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/kyc-submissions',
            query: {
                page: page,
                limit: limit,
            },
        });
    }
    /**
     * Create kyc submission
     * @param requestBody
     * @returns KycSubmission
     * @throws ApiError
     */
    public static kycSubmissionControllerCreateKycSubmission(
        requestBody?: any,
    ): CancelablePromise<KycSubmission> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/kyc-submissions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Kyc submission count
     * @param status
     * @returns TotalKycSubmissionResponse
     * @throws ApiError
     */
    public static kycSubmissionControllerKycSubmissionCount(
        status?: string,
    ): CancelablePromise<TotalKycSubmissionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/kyc-submissions/count',
            query: {
                status: status,
            },
        });
    }
    /**
     * Last kyc submission
     * @returns KycSubmission
     * @throws ApiError
     */
    public static kycSubmissionControllerLastKycSubmission(): CancelablePromise<KycSubmission> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/kyc-submissions/last',
        });
    }
    /**
     * Approve submission
     * @param id
     * @returns KycSubmission
     * @throws ApiError
     */
    public static kycSubmissionControllerApproveSubmission(
        id: string,
    ): CancelablePromise<KycSubmission> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/kyc-submissions/{id}/approve',
            path: {
                id: id,
            },
        });
    }
    /**
     * Reject submission
     * @param id
     * @returns KycSubmission
     * @throws ApiError
     */
    public static kycSubmissionControllerRejectSubmission(
        id: string,
    ): CancelablePromise<KycSubmission> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/kyc-submissions/{id}/reject',
            path: {
                id: id,
            },
        });
    }
}
