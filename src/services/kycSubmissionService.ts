import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiService } from '@/services/apiService';
import {
    KycSubmission,
    PaginatedKycSubmissionResponse,
    PaginatedUserResponse,
    PaginationQueryParams,
    TotalKycSubmissionResponse,
    UserKycStatusEnum,
} from '@/services/generated';
import { queryClient } from '@/services/queryClient';

export interface CreateKycSubmissionDto {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    gender: 'MALE' | 'FEMALE';
    documents: Array<Blob>;
}

export function usePaginatedKycSubmissions({
    page,
    limit,
}: PaginationQueryParams = {}) {
    return useQuery<PaginatedKycSubmissionResponse, AxiosError>({
        queryKey: ['paginated-kyc-submissions', page, limit],
        queryFn: () =>
            ApiService.kycSubmissions
                .kycSubmissionControllerPaginatedKycSubmissions(page, limit)
                .then((response) => response.data),
    });
}

export function useKycSubmission(
    userId: string,
    { enabled }: { enabled: boolean },
) {
    return useQuery<KycSubmission, AxiosError>({
        queryKey: ['kyc-submission-by-user', userId],
        queryFn: () =>
            ApiService.kycSubmissions
                .kycSubmissionControllerKycSubmissionByUser(userId)
                .then((response) => response.data),
        enabled,
    });
}

export function useKycSubmissionCount(status?: string) {
    return useQuery<TotalKycSubmissionResponse, AxiosError>({
        queryKey: ['kyc-submissions-count', status],
        queryFn: () =>
            ApiService.kycSubmissions
                .kycSubmissionControllerKycSubmissionCount(status)
                .then((response) => response.data),
    });
}

export function useCreateKycSubmission() {
    return useMutation<KycSubmission, AxiosError, CreateKycSubmissionDto>({
        mutationKey: ['create-kyc-submission'],
        mutationFn: ({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            gender,
            documents,
        }) =>
            ApiService.kycSubmissions
                .kycSubmissionControllerCreateKycSubmission(
                    firstName,
                    lastName,
                    email,
                    address,
                    phoneNumber,
                    gender,
                    documents as Array<File>,
                )
                .then((response) => response.data),
        onSuccess: () => {
            return queryClient.refetchQueries({ queryKey: ['user-profile'] });
        },
    });
}

export function useApproveKycSubmission(id: string) {
    return useMutation<KycSubmission, AxiosError>({
        mutationKey: ['approve-kyc-submission', id],
        mutationFn: () =>
            ApiService.kycSubmissions
                .kycSubmissionControllerApproveSubmission(id)
                .then((response) => response.data),
        onSuccess: async (data: KycSubmission) => {
            await queryClient.refetchQueries({
                predicate: ({ queryKey }) =>
                    queryKey.includes('kyc-submissions-count'),
            });

            queryClient.setQueriesData<
                PaginatedKycSubmissionResponse | undefined
            >(
                {
                    predicate: ({ queryKey }) =>
                        queryKey.includes('paginated-kyc-submissions'),
                },
                (prev) => {
                    if (prev) {
                        return {
                            ...prev,
                            docs: prev.docs.map((submission) =>
                                submission._id === id ? data : submission,
                            ),
                        };
                    }
                    return prev;
                },
            );

            queryClient.setQueriesData<PaginatedUserResponse | undefined>(
                {
                    predicate: ({ queryKey }) =>
                        queryKey.includes('paginated-users'),
                },
                (prev) => {
                    if (prev) {
                        return {
                            ...prev,
                            docs: prev.docs.map((user) => {
                                const status = data.status as unknown;

                                return user._id === data.userId
                                    ? {
                                          ...user,
                                          kycStatus:
                                              status as UserKycStatusEnum,
                                      }
                                    : user;
                            }),
                        };
                    }
                    return prev;
                },
            );

            queryClient.setQueriesData<KycSubmission | undefined>(
                {
                    predicate: ({ queryKey }) =>
                        queryKey.includes('kyc-submission-by-user'),
                },
                () => {
                    return data;
                },
            );
        },
    });
}

export function useRejectKycSubmission(id: string) {
    return useMutation<KycSubmission, AxiosError>({
        mutationKey: ['reject-kyc-submission', id],
        mutationFn: () =>
            ApiService.kycSubmissions
                .kycSubmissionControllerRejectSubmission(id)
                .then((response) => response.data),
        onSuccess: async (data: KycSubmission) => {
            await queryClient.refetchQueries({
                predicate: ({ queryKey }) =>
                    queryKey.includes('kyc-submissions-count'),
            });

            queryClient.setQueriesData<
                PaginatedKycSubmissionResponse | undefined
            >(
                {
                    predicate: ({ queryKey }) =>
                        queryKey.includes('paginated-kyc-submissions'),
                },
                (prev) => {
                    if (prev) {
                        return {
                            ...prev,
                            docs: prev.docs.map((submission) =>
                                submission._id === id ? data : submission,
                            ),
                        };
                    }
                    return prev;
                },
            );

            queryClient.setQueriesData<PaginatedUserResponse | undefined>(
                {
                    predicate: ({ queryKey }) =>
                        queryKey.includes('paginated-users'),
                },
                (prev) => {
                    if (prev) {
                        return {
                            ...prev,
                            docs: prev.docs.map((user) => {
                                const status = data.status as unknown;

                                return user._id === data.userId
                                    ? {
                                          ...user,
                                          kycStatus:
                                              status as UserKycStatusEnum,
                                      }
                                    : user;
                            }),
                        };
                    }
                    return prev;
                },
            );

            queryClient.setQueriesData<KycSubmission | undefined>(
                {
                    predicate: ({ queryKey }) =>
                        queryKey.includes('kyc-submission-by-user'),
                },
                () => {
                    return data;
                },
            );
        },
    });
}
