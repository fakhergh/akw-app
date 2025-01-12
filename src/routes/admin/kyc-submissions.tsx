import { createFileRoute } from '@tanstack/react-router';

import { usePaginatedKycSubmissions } from '@/services/kycSubmissionService';

export const Route = createFileRoute('/admin/kyc-submissions')({
    component: RouteComponent,
});

function RouteComponent() {
    const { isLoading, isError } = usePaginatedKycSubmissions();

    if (isLoading) return 'Loading...';

    if (isError) return 'Error...';

    return <div>Hello "/admin/kyc-submissions"!</div>;
}
