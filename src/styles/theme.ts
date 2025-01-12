import { createTheme } from '@mui/material/styles';

import { colorsScheme } from '@/styles/colors';
import { components } from '@/styles/components';
import { shadows } from '@/styles/shadows';

export const theme = createTheme({
    palette: {
        background: {
            default: colorsScheme.grey['100'],
            paper: colorsScheme.common.white,
        },
        ...colorsScheme,
    },
    spacing: (factor: number) => `${0.5 * factor}rem`,
    shadows,
    components,
});

export const drawerWidth = '22rem';
