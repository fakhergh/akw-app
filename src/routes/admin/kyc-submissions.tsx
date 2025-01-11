import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/kyc-submissions')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/admin/kyc-submissions"!</div>;
}
