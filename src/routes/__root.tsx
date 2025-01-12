import IconDashboard from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useCallback, useState } from 'react';

import { AppBar } from '@/components/AppBar/AppBar';
import { Drawer, DrawerHeader } from '@/components/Drawer/Drawer';
import { drawerWidth } from '@/styles/theme';

const drawerItems = [
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

function RootRoute() {
    const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

    const location = useLocation();

    const isAuthRoute = location.pathname.match(/^\/(auth|admin\/auth)/);
    const isAdmin = location.pathname.startsWith('/admin');

    const toggleDrawer = useCallback(() => {
        setSideBarCollapsed((prev) => !prev);
    }, []);

    return (
        <Box width="100svw" height="100svh" overflow="hidden" display="flex">
            {!isAuthRoute && (
                <AppBar
                    position="fixed"
                    drawerWidth={drawerWidth}
                    open={!sideBarCollapsed}
                    onMenuButtonClick={toggleDrawer}
                />
            )}
            {!isAuthRoute && isAdmin && (
                <Drawer
                    variant="permanent"
                    anchor="left"
                    drawerWidth={drawerWidth}
                    open={!sideBarCollapsed}
                    items={drawerItems}
                >
                    <DrawerHeader display="flex"></DrawerHeader>
                    <Divider />
                </Drawer>
            )}

            <Box
                display="flex"
                flexDirection="column"
                flex={1}
                paddingX={3}
                paddingTop={isAuthRoute ? 3 : 12}
                paddingBottom={3}
            >
                <Outlet />
            </Box>
            <TanStackRouterDevtools />
        </Box>
    );
}

export const Route = createRootRoute({
    component: RootRoute,
});
