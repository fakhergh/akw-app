import {
    createRootRoute,
    Link,
    Outlet,
    useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { NavBar } from '../components/NavBar';

function RootRoute() {
    const location = useLocation();

    const isAuthRoute = location.pathname.match(/^\/(auth|admin\/auth)/);

    return (
        <div>
            {!isAuthRoute && <NavBar />}
            <div className="p-2 flex gap-5">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/auth/login" className="[&.active]:font-bold">
                    Login
                </Link>{' '}
                <Link to="/auth/register" className="[&.active]:font-bold">
                    Register
                </Link>
                <Link to="/admin/auth/login" className="[&.active]:font-bold">
                    Admin Login
                </Link>{' '}
                <Link to="/admin/dashboard" className="[&.active]:font-bold">
                    Admin Dashboard
                </Link>{' '}
                <Link to="/admin/users" className="[&.active]:font-bold">
                    Admin Users
                </Link>{' '}
                <Link
                    to="/admin/kyc-submissions"
                    className="[&.active]:font-bold"
                >
                    Admin Submissions
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </div>
    );
}

export const Route = createRootRoute({
    component: RootRoute,
});
