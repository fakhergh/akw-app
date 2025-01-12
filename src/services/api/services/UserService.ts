/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedUserResponse } from '../models/PaginatedUserResponse';
import type { TotalUserCountResponse } from '../models/TotalUserCountResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Paginated users
     * @param page
     * @param limit
     * @returns PaginatedUserResponse
     * @throws ApiError
     */
    public static userControllerPaginatedUsers(
        page?: number,
        limit?: number,
    ): CancelablePromise<PaginatedUserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
            query: {
                page: page,
                limit: limit,
            },
        });
    }
    /**
     * Users count
     * @returns TotalUserCountResponse
     * @throws ApiError
     */
    public static userControllerUsersCount(): CancelablePromise<TotalUserCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/count',
        });
    }
}
