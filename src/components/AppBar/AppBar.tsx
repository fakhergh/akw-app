import IconMenu from '@mui/icons-material/Menu';
import IconMenuOpen from '@mui/icons-material/MenuOpen';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

export interface AppBarProps extends MuiAppBarProps {
    display?: 'block' | 'none';
    open?: boolean;
    drawerWidth: number | string;
    onMenuButtonClick?: () => void;
}

const BaseAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<Omit<AppBarProps, 'drawerWidth'> & { drawerWidth: string | number }>(
    ({ theme, open, display, drawerWidth }) => ({
        display,
        transition: `
            width ${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp},
            margin ${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp},
                background 500ms ${theme.transitions.easing.sharp}
    `,
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${theme.spacing(6)} - ${drawerWidth})`,
            transition: `
                width ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp},
                margin ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp},
                background 500ms ${theme.transitions.easing.sharp}
    `,
        }),
    }),
);

const AppLogoWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
    transform: `scale(${collapsed ? 1 : 0})`,
    transition: theme.transitions.create('transform', {
        delay: collapsed ? theme.transitions.duration.short : 0,
        easing: theme.transitions.easing.sharp,
        duration: collapsed
            ? theme.transitions.duration.enteringScreen
            : theme.transitions.duration.short,
    }),
}));

export function AppBar({
    children,
    onMenuButtonClick,
    drawerWidth,
    open,
    ...props
}: AppBarProps) {
    return (
        <BaseAppBar {...props} open={open} drawerWidth={drawerWidth}>
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <IconButton
                        color="inherit"
                        onClick={onMenuButtonClick}
                        edge={false}
                        aria-label="btn-menu"
                    >
                        {open ? <IconMenuOpen /> : <IconMenu />}
                    </IconButton>
                    <AppLogoWrapper
                        collapsed={!open}
                        display="flex"
                        alignItems="center"
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                {children}
            </Toolbar>
        </BaseAppBar>
    );
}
