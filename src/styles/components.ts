import { Components, Theme } from '@mui/material/styles';

export const components: Components<Omit<Theme, 'components'>> = {
    MuiAppBar: {
        styleOverrides: {
            root: ({ theme }) => ({
                background: 'unset',
                width: `calc(100% - ${theme.spacing(4)})`,
                margin: '1rem',
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                color: theme.palette.text.primary,
                zIndex: theme.zIndex.drawer + 1,
            }),
        },
    },
    MuiDrawer: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: '1rem',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
                '& .MuiPaper-root': {
                    boxShadow: theme.shadows[1],
                    background: theme.palette.background,
                    height: 'calc(100vh - 2rem)',
                },
            }),
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: ({ theme }) => ({
                elevation: theme.shadows[0],
                borderRadius: theme.spacing(2),
                background: 'unset',
                backgroundColor: theme.palette.background.paper,
            }),
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: theme.spacing(2),
            }),
        },
    },
    MuiDialogContent: {
        styleOverrides: {
            root: {
                paddingTop: '1rem !important',
            },
        },
    },
    MuiTableCell: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderColor: theme.palette.divider,
            }),
        },
    },
    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: theme.spacing(2),
            }),
            contained: ({ theme }) => ({
                boxShadow: theme.shadows[1],
            }),
        },
    },
};
