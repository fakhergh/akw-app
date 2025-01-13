import { useMutation, useQuery } from '@tanstack/react-query';

import {
    ApiError,
    KycSubmission,
    KycSubmissionService,
    PaginatedKycSubmissionResponse,
    PaginatedUserResponse,
    PaginationQueryParams,
    TotalKycSubmissionResponse,
    User,
} from '@/services/api';
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
    return useQuery<PaginatedKycSubmissionResponse, ApiError>({
        queryKey: ['paginated-kyc-submissions', page, limit],
        queryFn: () =>
            KycSubmissionService.kycSubmissionControllerPaginatedKycSubmissions(
                page,
                limit,
            ),
    });
}

export function useKycSubmission(
    userId: string,
    { enabled }: { enabled: boolean },
) {
    return useQuery<KycSubmission, ApiError>({
        queryKey: ['kyc-submission-by-user', userId],
        queryFn: () =>
            KycSubmissionService.kycSubmissionControllerKycSubmissionByUser(
                userId,
            ),
        enabled,
    });
}

export function useKycSubmissionCount(status?: string) {
    return useQuery<TotalKycSubmissionResponse, ApiError>({
        queryKey: ['kyc-submissions-count', status],
        queryFn: () =>
            KycSubmissionService.kycSubmissionControllerKycSubmissionCount(
                status,
            ),
    });
}

export function useCreateKycSubmission() {
    return useMutation<KycSubmission, ApiError, CreateKycSubmissionDto>({
        mutationKey: ['create-kyc-submission'],
        mutationFn: (form) =>
            KycSubmissionService.kycSubmissionControllerCreateKycSubmission(
                form,
            ),
        onSuccess: () => {
            return queryClient.refetchQueries({ queryKey: ['user-profile'] });
        },
    });
}

export function useApproveKycSubmission(id: string) {
    return useMutation<KycSubmission, ApiError>({
        mutationKey: ['approve-kyc-submission', id],
        mutationFn: () =>
            KycSubmissionService.kycSubmissionControllerApproveSubmission(id),
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
                                          kycStatus: status as User.kycStatus,
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
    return useMutation<KycSubmission, ApiError>({
        mutationKey: ['reject-kyc-submission', id],
        mutationFn: () =>
            KycSubmissionService.kycSubmissionControllerRejectSubmission(id),
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
                                          kycStatus: status as User.kycStatus,
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
