import { useQuery } from '@tanstack/react-query';

import {
    ApiError,
    PaginatedUserResponse,
    PaginationQueryParams,
    UserService,
} from '@/services/api';

export function usePaginatedUsers({ page, limit }: PaginationQueryParams = {}) {
    return useQuery<PaginatedUserResponse, ApiError>({
        queryKey: ['paginated-users', page, limit],
        queryFn: () => UserService.userControllerPaginatedUsers(page, limit),
    });
}
