import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/auth/login')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/admin/auth/login"!</div>;
}
