import { useQuery } from '@tanstack/react-query';

import { KycSubmissionService, PaginationQueryParams } from '@/services/api';

export function usePaginatedKycSubmissions({
    page,
    limit,
}: PaginationQueryParams = {}) {
    return useQuery({
        queryKey: ['paginated-kyc-submissions', page, limit],
        queryFn: () =>
            KycSubmissionService.kycSubmissionControllerPaginatedKycSubmissions(
                page,
                limit,
            ),
    });
}
