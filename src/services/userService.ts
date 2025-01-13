import { useQuery } from '@tanstack/react-query';

import {
    ApiError,
    PaginatedUserResponse,
    PaginationQueryParams,
    TotalUserCountResponse,
    UserService,
} from '@/services/api';

export function usePaginatedUsers({ page, limit }: PaginationQueryParams = {}) {
    return useQuery<PaginatedUserResponse, ApiError>({
        queryKey: ['paginated-users', page, limit],
        queryFn: () => UserService.userControllerPaginatedUsers(page, limit),
    });
}

export function useUsersCount() {
    return useQuery<TotalUserCountResponse, ApiError>({
        queryKey: ['users-count'],
        queryFn: () => UserService.userControllerUsersCount(),
    });
}
