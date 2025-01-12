import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

import { AuthCard } from '@/components/AuthCard/AuthCard.tsx';
import { Link } from '@/components/Link/Link';
import { LoginForm, LoginFormValues } from '@/components/LoginForm/LoginForm';
import { routes } from '@/config/navigation.ts';
import { LoginDto } from '@/services/api';
import { useUserLogin } from '@/services/authService';

export const Route = createFileRoute('/auth/login')({
    component: RouteComponent,
});

function RouteComponent() {
    const { navigate } = useRouter();

    const { mutate: login, data, isPending } = useUserLogin();

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
            navigate({ to: routes.user.home });
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
                    userType="user"
                />
                <Button
                    variant="outlined"
                    onClick={() => navigate({ to: routes.admin.auth.login })}
                >
                    Login as admin
                </Button>
                <Divider sx={{ my: 2 }}>or</Divider>
                <Typography textAlign="center">
                    Don&apos;t have an account?{' '}
                    <Link
                        to={routes.user.auth.register}
                        variant="body2"
                        alignSelf="center"
                    >
                        Register
                    </Link>
                </Typography>
            </AuthCard>
        </Box>
    );
}
