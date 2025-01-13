import IconDashboard from '@mui/icons-material/Dashboard';
import IconExitToApp from '@mui/icons-material/ExitToApp';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {
    createRootRoute,
    Outlet,
    useLocation,
    useRouter,
} from '@tanstack/react-router';
import { lazy, useCallback, useEffect, useState } from 'react';

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : lazy(() =>
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              })),
          );

import { AppBar } from '@/components/AppBar/AppBar';
import {
    Drawer,
    DrawerHeader,
    DrawerItemProps,
} from '@/components/Drawer/Drawer';
import { routes } from '@/config/navigation';
import { IconAppLogo } from '@/icons/IconAppLogo';
import { queryClient } from '@/services/queryClient';
import { drawerWidth } from '@/styles/theme';

const adminDrawerItems = [
    {
        itemKey: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: IconDashboard,
    },
    {
        itemKey: 'users',
        label: 'Users',
        path: '/admin/users',
        icon: IconDashboard,
    },
    {
        itemKey: 'kyc-submissions',
        label: 'Kyc Submissions',
        path: '/admin/kyc-submissions',
        icon: IconDashboard,
    },
];

const userDrawerItems: Array<DrawerItemProps> = [];

function RootRoute() {
    const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

    const { navigate } = useRouter();
    const location = useLocation();

    const isAuthRoute = location.pathname.match(/^\/(auth|admin\/auth)/);
    const isAdmin = location.pathname.startsWith('/admin');

    const toggleDrawer = useCallback(() => {
        setSideBarCollapsed((prev) => !prev);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        queryClient.clear();
        navigate({
            to: isAdmin ? routes.admin.auth.login : routes.user.auth.login,
        });
    }, [isAdmin, navigate]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!location.pathname.includes('/auth') && !token) {
            const nextRoute = isAdmin
                ? routes.admin.auth.login
                : routes.user.auth.login;

            navigate({ to: nextRoute });
        }
    }, [isAdmin, location.pathname, navigate]);

    return (
        <Box width="100svw" height="100svh" overflow="hidden" display="flex">
            {!isAuthRoute && (
                <AppBar
                    position="fixed"
                    drawerWidth={drawerWidth}
                    open={!sideBarCollapsed}
                    onMenuButtonClick={toggleDrawer}
                >
                    <Tooltip title="Logout">
                        <IconButton onClick={logout}>
                            <IconExitToApp />
                        </IconButton>
                    </Tooltip>
                </AppBar>
            )}
            {!isAuthRoute && (
                <Drawer
                    variant="permanent"
                    anchor="left"
                    drawerWidth={drawerWidth}
                    open={!sideBarCollapsed}
                    items={isAdmin ? adminDrawerItems : userDrawerItems}
                >
                    <DrawerHeader display="flex">
                        <IconAppLogo width="2rem" height="2rem" />
                    </DrawerHeader>
                    <Divider />
                </Drawer>
            )}

            <Box
                display="flex"
                flexDirection="column"
                overflow="hidden"
                flex={1}
                padding={2}
                paddingTop={isAuthRoute ? 3 : 5}
            >
                {!isAuthRoute && <DrawerHeader />}
                <Outlet />
            </Box>
            <TanStackRouterDevtools />
        </Box>
    );
}

export const Route = createRootRoute({
    component: RootRoute,
});
