import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiService } from '@/services/apiService';
import {
    PaginatedUserResponse,
    PaginationQueryParams,
    TotalUserCountResponse,
} from '@/services/generated';

export function usePaginatedUsers({ page, limit }: PaginationQueryParams = {}) {
    return useQuery<PaginatedUserResponse, AxiosError>({
        queryKey: ['paginated-users', page, limit],
        queryFn: () =>
            ApiService.users
                .userControllerPaginatedUsers(page, limit)
                .then((response) => response.data),
    });
}

export function useUsersCount() {
    return useQuery<TotalUserCountResponse, AxiosError>({
        queryKey: ['users-count'],
        queryFn: () =>
            ApiService.users
                .userControllerUsersCount()
                .then((response) => response.data),
    });
}
