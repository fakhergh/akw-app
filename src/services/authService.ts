import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiService } from '@/services/apiService';
import {
    type LoginDto,
    LoginResponse,
    UserRegisterDto,
    UserRegisterResponse,
} from '@/services/generated';

export function useAdminLogin() {
    return useMutation<LoginResponse, AxiosError, LoginDto>({
        mutationKey: ['admin-login'],
        mutationFn: (data: LoginDto) =>
            ApiService.auth
                .authControllerAdminLogin(data)
                .then((response) => response.data),
    });
}

export function useUserRegister() {
    return useMutation<UserRegisterResponse, AxiosError, UserRegisterDto>({
        mutationKey: ['user-register'],
        mutationFn: (data: UserRegisterDto) =>
            ApiService.auth
                .authControllerUserRegister(data)
                .then((response) => response.data),
    });
}

export function useUserLogin() {
    return useMutation<LoginResponse, AxiosError, LoginDto>({
        mutationKey: ['user-login'],
        mutationFn: (data: LoginDto) =>
            ApiService.auth
                .authControllerUserLogin(data)
                .then((response) => response.data),
    });
}

export function useUserProfile() {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: () =>
            ApiService.auth
                .authControllerUserProfile()
                .then((response) => response.data),
    });
}
