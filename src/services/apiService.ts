import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import {
    AuthApi,
    Configuration,
    KycSubmissionApi,
    UserApi,
} from '@/services/generated';

interface RetryQueueItem {
    config: AxiosRequestConfig;
    resolve: (value: AxiosResponse) => void;
    reject: (reason: Error | string) => void;
}

const httpClient = axios.create();

// Create a list to hold the request queue
const refreshAndRetryQueue: Array<RetryQueueItem> = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    // Refresh the access token
                    const { accessToken, refreshToken } = await ApiService.auth
                        .authControllerAdminRefreshToken(
                            localStorage.getItem('refreshToken')!,
                        )
                        .then((response) => response.data);

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    // Update the request headers with the new access token
                    error.config.headers['Authorization'] =
                        `Bearer ${accessToken}`;

                    // Retry all requests in the queue with the new token
                    refreshAndRetryQueue.forEach(
                        ({ config, resolve, reject }) => {
                            httpClient
                                .request(config)
                                .then((response) => resolve(response))
                                .catch((err) => reject(err));
                        },
                    );

                    // Clear the queue
                    refreshAndRetryQueue.length = 0;

                    // Retry the original request
                    return httpClient(originalRequest);
                } catch (refreshError) {
                    // Handle token refresh error
                    // You can clear all storage and redirect the user to the login page
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/admin/auth/login';

                    throw refreshError;
                } finally {
                    isRefreshing = false;
                }
            }

            // Add the original request to the queue
            return new Promise((resolve, reject) => {
                refreshAndRetryQueue.push({
                    config: originalRequest,
                    resolve,
                    reject,
                });
            });
        }

        // Return a Promise rejection if the status code is not 401
        return Promise.reject(error);
    },
);

const configuration: Configuration = new Configuration({
    basePath: import.meta.env.VITE_API_URL,
    accessToken: () => localStorage.getItem('accessToken')!,
});

export const ApiService = {
    auth: new AuthApi(configuration, undefined, httpClient),
    users: new UserApi(configuration, undefined, httpClient),
    kycSubmissions: new KycSubmissionApi(configuration, undefined, httpClient),
};
