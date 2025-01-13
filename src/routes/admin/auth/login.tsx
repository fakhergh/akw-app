import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

import { AuthCard } from '@/components/AuthCard/AuthCard';
import { LoginForm, LoginFormValues } from '@/components/LoginForm/LoginForm';
import { routes } from '@/config/navigation';
import { LoginDto } from '@/services/api';
import { useAdminLogin } from '@/services/authService';

export const Route = createFileRoute('/admin/auth/login')({
    component: RouteComponent,
});

function RouteComponent() {
    const { navigate } = useRouter();

    const { mutate: login, isPending, data } = useAdminLogin();

    const onSubmit = useCallback(
        (values: LoginFormValues) => {
            const loginDto: LoginDto = {
                email: values.email,
                password: values.password,
            };

            login(loginDto);
        },
        [login],
    );

    useEffect(() => {
        if (data) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userType', 'admin');
            navigate({ to: routes.admin.dashboard });
        }
    }, [data, navigate]);

    return (
        <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <AuthCard>
                <Typography
                    component="h1"
                    variant="h4"
                    textAlign="center"
                    width="100%"
                    mb={3}
                >
                    Login
                </Typography>
                <LoginForm
                    loading={isPending}
                    onSubmit={onSubmit}
                    userType="admin"
                />
                <Button
                    color="success"
                    variant="outlined"
                    onClick={() => navigate({ to: routes.user.auth.login })}
                >
                    Login as user
                </Button>
            </AuthCard>
        </Box>
    );
}
