import Box from '@mui/material/Box';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';

import {
    DataTable,
    DataTableRenderItem,
    HeadCell,
} from '@/components/DataTable/DataTable';
import {
    UserDataTableContainer,
    UserDataTableContainerProps,
} from '@/containers/UserDataTableContainer/UserDataTableContainer';
import { useTotalPages } from '@/hooks/useTotalPages.ts';
import { usePaginatedUsers } from '@/services/userService';

export const Route = createFileRoute('/admin/users')({
    component: RouteComponent,
});

const headCells: Array<HeadCell> = [
    { itemKey: 'id', label: 'ID' },
    { itemKey: 'firstName', label: 'First Name' },
    { itemKey: 'lastName', label: 'Last Name' },
    { itemKey: 'email', label: 'Email Address' },
    { itemKey: 'kyc-status', label: 'KYC Status' },
    { itemKey: 'createdAt', label: 'Created At' },
    { itemKey: 'actions', label: 'Actions' },
];

function RouteComponent() {
    const [page, setPage] = useState<number>(1);

    const { isLoading, data, isError } = usePaginatedUsers({ page, limit: 10 });

    const totalPages = useTotalPages(data?.totalPages);

    const users = useMemo(
        () =>
            data?.docs.map((user) => ({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                kycStatus: user.kycStatus,
                createdAt: user.createdAt,
            })) ?? [],
        [data?.docs],
    );

    const renderItem: DataTableRenderItem<UserDataTableContainerProps> =
        useCallback((item) => <UserDataTableContainer {...item} />, []);

    const keyExtractor = useCallback(
        (item: UserDataTableContainerProps) => item.id,
        [],
    );

    if (isError) return 'Error...';

    return (
        <Box flex={1}>
            <DataTable<UserDataTableContainerProps>
                title="Users"
                stickyHeader
                totalPages={totalPages}
                loading={isLoading}
                headCells={headCells}
                page={page}
                onPageChange={setPage}
                items={users}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </Box>
    );
}
