import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from '@/routeTree.gen';
import { OpenAPI } from '@/services/api';
import { theme } from '@/styles/theme';

OpenAPI.BASE = import.meta.env.VITE_API_URL!;
OpenAPI.TOKEN = async () => {
    return localStorage.getItem('token')!;
};

const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
);
