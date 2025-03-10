import IconRefresh from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';

import {
    DataTable,
    DataTableRenderItem,
    HeadCell,
} from '@/components/DataTable/DataTable';
import {
    KycSubmissionDataTableContainer,
    KycSubmissionDataTableContainerProps,
} from '@/containers/KycSubmissionDataTableContainer/KycSubmissionDataTableContainer';
import { useTotalPages } from '@/hooks/useTotalPages';
import { usePaginatedKycSubmissions } from '@/services/kycSubmissionService';

export const Route = createFileRoute('/admin/kyc-submissions')({
    component: RouteComponent,
});

const headCells: Array<HeadCell> = [
    { itemKey: 'id', label: 'ID' },
    { itemKey: 'firstName', label: 'First Name' },
    { itemKey: 'lastName', label: 'Last Name' },
    { itemKey: 'email', label: 'Email' },
    { itemKey: 'phoneNumber', label: 'Phone Number' },
    { itemKey: 'Address', label: 'Address' },
    { itemKey: 'kyc-status', label: 'KYC Status' },
    { itemKey: 'gender', label: 'Gender' },
    { itemKey: 'createdAt', label: 'Created At' },
    { itemKey: 'actions', label: 'Actions', sx: { right: 0 } },
];

enum ToolbarActionKey {
    REFETCH,
}

function RouteComponent() {
    const [page, setPage] = useState<number>(1);

    const { data, refetch, isRefetching, isLoading, isError } =
        usePaginatedKycSubmissions({
            page,
            limit: 10,
        });

    const totalPages = useTotalPages(data?.totalPages);

    const submissions = useMemo<Array<KycSubmissionDataTableContainerProps>>(
        () =>
            data?.docs.map((kycSubmission) => ({
                id: kycSubmission._id,
                firstName: kycSubmission.firstName,
                lastName: kycSubmission.lastName,
                email: kycSubmission.email,
                phoneNumber: kycSubmission.phoneNumber,
                address: kycSubmission.address,
                status: kycSubmission.status,
                gender: kycSubmission.gender,
                createdAt: kycSubmission.createdAt,
                documentUrls: kycSubmission.documents.map(
                    (document) => document.url,
                ),
            })) ?? [],
        [data?.docs],
    );

    const renderItem: DataTableRenderItem<KycSubmissionDataTableContainerProps> =
        useCallback(
            (item) => <KycSubmissionDataTableContainer {...item} />,
            [],
        );

    const keyExtractor = useCallback(
        (item: KycSubmissionDataTableContainerProps) => item.id,
        [],
    );

    const toolbarActions = useMemo(
        () => [
            {
                itemKey: ToolbarActionKey.REFETCH,
                tooltip: 'Refetch',
                icon: IconRefresh,
                disabled: isLoading || isRefetching,
            },
        ],
        [isLoading, isRefetching],
    );

    const onToolbarActionClick = useCallback(
        (key: ToolbarActionKey) => {
            switch (key) {
                case ToolbarActionKey.REFETCH:
                    refetch().catch(console.error);
                    break;
            }
        },
        [refetch],
    );

    if (isError) return 'Error...';

    return (
        <Box flex={1}>
            <DataTable<KycSubmissionDataTableContainerProps, ToolbarActionKey>
                title="KYC Submissions"
                stickyHeader
                totalPages={totalPages}
                loading={isLoading || isRefetching}
                headCells={headCells}
                toolbarActions={toolbarActions}
                onToolbarActionClick={onToolbarActionClick}
                page={page}
                onPageChange={setPage}
                items={submissions}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </Box>
    );
}
