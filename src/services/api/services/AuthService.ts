/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { LoginResponse } from '../models/LoginResponse';
import type { RefreshTokenResponse } from '../models/RefreshTokenResponse';
import type { UserRegisterDto } from '../models/UserRegisterDto';
import type { UserRegisterResponse } from '../models/UserRegisterResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Admin login
     * @param requestBody LoginDto
     * @returns LoginResponse
     * @throws ApiError
     */
    public static authControllerAdminLogin(
        requestBody?: LoginDto,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/admin/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Admin refresh token
     * @param refreshToken
     * @returns RefreshTokenResponse
     * @throws ApiError
     */
    public static authControllerAdminRefreshToken(
        refreshToken?: string,
    ): CancelablePromise<RefreshTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/admin/refresh-token',
            headers: {
                'refresh-token': refreshToken,
            },
        });
    }
    /**
     * User register
     * @param requestBody UserRegisterDto
     * @returns UserRegisterResponse
     * @throws ApiError
     */
    public static authControllerUserRegister(
        requestBody?: UserRegisterDto,
    ): CancelablePromise<UserRegisterResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * User login
     * @param requestBody LoginDto
     * @returns LoginResponse
     * @throws ApiError
     */
    public static authControllerUserLogin(
        requestBody?: LoginDto,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * User refresh token
     * @param refreshToken
     * @returns RefreshTokenResponse
     * @throws ApiError
     */
    public static authControllerUserRefreshToken(
        refreshToken?: string,
    ): CancelablePromise<RefreshTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/user/refresh-token',
            headers: {
                'refresh-token': refreshToken,
            },
        });
    }
}
