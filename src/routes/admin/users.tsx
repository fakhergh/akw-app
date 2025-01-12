import { createFileRoute } from '@tanstack/react-router';

import { usePaginatedUsers } from '@/services/userService';

export const Route = createFileRoute('/admin/users')({
    component: RouteComponent,
});

function RouteComponent() {
    const { isLoading, isError } = usePaginatedUsers();

    if (isLoading) return 'Loading...';

    if (isError) return 'Error...';

    return <div>Hello "/admin/users"!</div>;
}
