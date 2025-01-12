import { useQuery } from '@tanstack/react-query';

import {
    ApiError,
    KycSubmissionService,
    PaginatedKycSubmissionResponse,
    PaginationQueryParams,
} from '@/services/api';

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
