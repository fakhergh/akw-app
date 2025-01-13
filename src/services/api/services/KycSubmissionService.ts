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
     * @param formData
     * @returns KycSubmission
     * @throws ApiError
     */
    public static kycSubmissionControllerCreateKycSubmission(formData: {
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        phoneNumber: string;
        gender: 'MALE' | 'FEMALE';
        documents: Array<Blob>;
    }): CancelablePromise<KycSubmission> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/kyc-submissions',
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * Kyc submission by user
     * @param userId
     * @returns KycSubmission
     * @throws ApiError
     */
    public static kycSubmissionControllerKycSubmissionByUser(
        userId: string,
    ): CancelablePromise<KycSubmission> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/kyc-submissions/user/{userId}',
            path: {
                userId: userId,
            },
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
