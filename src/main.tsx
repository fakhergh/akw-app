import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from '@/routeTree.gen';
import { OpenAPI } from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { theme } from '@/styles/theme';

OpenAPI.BASE = import.meta.env.VITE_API_URL!;
OpenAPI.TOKEN = async () => {
    return localStorage.getItem('token')!;
};

const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
