import type { SvgIconComponent } from '@mui/icons-material';
import Box from '@mui/material/Box';
import type { DrawerProps as BaseDrawerProps } from '@mui/material/Drawer';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import type { ListItemProps as BaseListItemProps } from '@mui/material/ListItem';
import BaseListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import type { CSSObject, Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useLocation } from '@tanstack/react-router';

import { Link } from '@/components/Link/Link';

export interface DrawerItemProps {
    itemKey: string;
    label: string;
    path?: string;
    icon?: SvgIconComponent;
}

export interface DrawerContentProps extends Pick<ListItemProps, 'openDrawer'> {
    open?: boolean;
    items: Array<DrawerItemProps>;
}

export interface DrawerProps extends BaseDrawerProps, DrawerContentProps {
    display?: 'block' | 'none';
    loading?: boolean;
    drawerWidth: string;
}

interface ListItemProps extends BaseListItemProps, DrawerItemProps {
    open?: boolean;
    openDrawer?: () => void;
}

const openedMixin = (theme: Theme, drawerWidth: string): CSSObject => ({
    width: drawerWidth,
    margin: theme.spacing(2, 0, 0, 2),
    transition: `
            width ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp},
            margin ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp},
            background 500ms ${theme.transitions.easing.sharp}
        `,
    overflowX: 'hidden',
    border: 'none',
});

const closedMixin = (theme: Theme): CSSObject => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    transition: `
            width ${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp},
            margin ${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp},
            background 500ms ${theme.transitions.easing.sharp}
        `,
    overflowX: 'hidden',
    border: 'none',
    width: 0,
    //width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        //width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')<{
    display?: 'flex' | 'block' | 'none';
}>(({ theme, display }) => ({
    display,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const StyledList = styled(List)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '& .MuiCollapse-root': {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    '& .MuiButtonBase-root': {
        borderRadius: '1rem',
        marginTop: theme.spacing(1),
    },
    '& .MuiButtonBase-root.MuiListItemButton-root': {
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '& svg': {
                color: theme.palette.common.white,
            },
        },
    },
}));

function ListItem({ label, icon: Icon, path }: ListItemProps) {
    const { pathname } = useLocation();

    const selected = pathname === path!;

    return (
        <>
            <BaseListItem disablePadding sx={{ display: 'block' }}>
                <Link
                    href={path!}
                    sx={{
                        textDecoration: 'none',
                        color: (theme: Theme) => theme.palette.text.primary,
                    }}
                >
                    <ListItemButton
                        selected={selected}
                        sx={{
                            gap: 2,
                            minHeight: 48,
                            px: 2.5,
                            color: (theme) => theme.palette.text.primary,
                        }}
                    >
                        <ListItemIcon
                            sx={{ minWidth: 0, justifyContent: 'center' }}
                        >
                            {Icon && <Icon />}
                        </ListItemIcon>
                        <ListItemText
                            primary={label}
                            sx={{ textAlign: 'left' }}
                        />
                    </ListItemButton>
                </Link>
            </BaseListItem>
        </>
    );
}

function DrawerContent({ open, openDrawer, items }: DrawerContentProps) {
    return (
        <StyledList>
            {items.map((item) => (
                <ListItem
                    key={item.itemKey}
                    disablePadding
                    sx={{ display: 'block' }}
                    open={open}
                    openDrawer={openDrawer}
                    {...item}
                />
            ))}
        </StyledList>
    );
}

export const StyledDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) =>
        prop !== 'open' && prop !== 'drawerWidth' && prop !== 'display',
})<Pick<DrawerProps, 'display'> & { drawerWidth: string }>(
    ({ theme, open, drawerWidth, display }) => ({
        display,
        width: drawerWidth,
        ...(open && {
            ...openedMixin(theme, drawerWidth),
            '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function SkeletonList() {
    const length = 12;

    return (
        <Box py={2} overflow="auto">
            {Array.from({ length }).map((_, index) => (
                <Box key={index} px={4} my={1}>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        py={1}
                        mt={1}
                    >
                        <Skeleton variant="rounded" width={32} height={32} />
                        <Skeleton
                            variant="rounded"
                            width="100%"
                            height={32}
                        ></Skeleton>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export function Drawer({
    open,
    children,
    openDrawer,
    items,
    drawerWidth,
    loading,
    ...props
}: DrawerProps) {
    return (
        <StyledDrawer {...props} open={open} drawerWidth={drawerWidth}>
            {children}
            {loading ? (
                <SkeletonList />
            ) : (
                <DrawerContent
                    open={open}
                    items={items}
                    openDrawer={openDrawer}
                />
            )}
        </StyledDrawer>
    );
}
