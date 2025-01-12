import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

import { AuthCard } from '@/components/AuthCard/AuthCard';
import { Link } from '@/components/Link/Link.tsx';
import {
    RegisterForm,
    RegisterFormValues,
} from '@/components/RegisterForm/RegisterForm';
import { routes } from '@/config/navigation.ts';
import { UserRegisterDto } from '@/services/api';
import { useUserRegister } from '@/services/authService';

export const Route = createFileRoute('/auth/register')({
    component: RouteComponent,
});

function RouteComponent() {
    const { navigate } = useRouter();

    const { mutate: register, data, isPending } = useUserRegister();

    const onSubmit = useCallback(
        (values: RegisterFormValues) => {
            const registerDto: UserRegisterDto = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            };

            register(registerDto);
        },
        [register],
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
                    Register
                </Typography>
                <RegisterForm loading={isPending} onSubmit={onSubmit} />
                <Divider sx={{ my: 2 }}>or</Divider>
                <Typography textAlign="center">
                    Already have an account?{' '}
                    <Link
                        to={routes.user.auth.login}
                        variant="body2"
                        alignSelf="center"
                    >
                        Login
                    </Link>
                </Typography>
            </AuthCard>
        </Box>
    );
}
