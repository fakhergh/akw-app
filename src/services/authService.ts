import { useMutation, useQuery } from '@tanstack/react-query';

import {
    ApiError,
    AuthService,
    type LoginDto,
    LoginResponse,
    UserRegisterDto,
    UserRegisterResponse,
} from '@/services/api';

export function useAdminLogin() {
    return useMutation<LoginResponse, ApiError, LoginDto>({
        mutationKey: ['admin-login'],
        mutationFn: (data) => AuthService.authControllerAdminLogin(data),
    });
}

export function useUserRegister() {
    return useMutation<UserRegisterResponse, ApiError, UserRegisterDto>({
        mutationKey: ['user-register'],
        mutationFn: (data) => AuthService.authControllerUserRegister(data),
    });
}

export function useUserLogin() {
    return useMutation<LoginResponse, ApiError, LoginDto>({
        mutationKey: ['user-login'],
        mutationFn: (data) => AuthService.authControllerUserLogin(data),
    });
}

export function useUserProfile() {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: () => AuthService.authControllerUserProfile(),
    });
}
