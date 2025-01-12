import { useQuery } from '@tanstack/react-query';

import { PaginationQueryParams, UserService } from '@/services/api';

export function usePaginatedUsers({ page, limit }: PaginationQueryParams = {}) {
    return useQuery({
        queryKey: ['paginated-users', page, limit],
        queryFn: () => UserService.userControllerPaginatedUsers(page, limit),
    });
}
