import { Link as MuiLink, TypographyProps } from '@mui/material'; // Import Material UI Link
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from '@tanstack/react-router';
import { PropsWithChildren } from 'react'; // Import TanStack Router Link

export type LinkProps = RouterLinkProps & PropsWithChildren & TypographyProps;

export function Link({ to, children, ...props }: LinkProps) {
    return (
        <MuiLink component={RouterLink} to={to} {...props}>
            {children}
        </MuiLink>
    );
}
