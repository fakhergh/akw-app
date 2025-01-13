import IconVisibility from '@mui/icons-material/Visibility';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DataTableCellActionItem } from '@/components/DataTableCellActions/DataTableCellActions';
import {
    DataTableCellProps,
    DataTableRow,
} from '@/components/DataTableRow/DataTableRow';
import { KycSubmissionDetailsDialog } from '@/components/KycSubmissionDetailsDialog/KycSubmissionDetailsDialog';
import { ConfirmationDialog } from '@/containers/ConfirmationDialog/ConfirmationDialog';
import { User } from '@/services/api';
import {
    useApproveKycSubmission,
    useKycSubmission,
    useRejectKycSubmission,
} from '@/services/kycSubmissionService';

export interface UserDataTableContainerProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    kycStatus?: User.kycStatus;
    createdAt: string;
}

enum ColumnKey {
    ID,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    KYC_STATUS,
    CREATED_AT,
    ACTIONS,
}

enum ActionKey {
    SHOW_DOCUMENTS,
}

const kycStatusConfig: Record<User.kycStatus, 'warning' | 'error' | 'success'> =
    {
        [User.kycStatus.PENDING]: 'warning',
        [User.kycStatus.REJECTED]: 'error',
        [User.kycStatus.APPROVED]: 'success',
    };

export function UserDataTableContainer({
    id,
    firstName,
    lastName,
    email,
    kycStatus,
    createdAt,
}: UserDataTableContainerProps) {
    const [detailsDialogVisible, setDetailsDialogVisible] =
        useState<boolean>(false);

    const [kycSubmissionQueryEnabled, setKycSubmissionQueryEnabled] =
        useState<boolean>(false);

    const [approveDialogVisible, setApproveDialogVisible] =
        useState<boolean>(false);

    const [rejectDialogVisible, setRejectDialogVisible] =
        useState<boolean>(false);

    const { data, isLoading } = useKycSubmission(id, {
        enabled: kycSubmissionQueryEnabled,
    });

    const {
        mutate: approveSubmission,
        data: approveSubmissionData,
        isPending: approveSubmissionPending,
    } = useApproveKycSubmission(id);

    const {
        mutate: rejectSubmission,
        data: rejectSubmissionData,
        isPending: rejectSubmissionPending,
    } = useRejectKycSubmission(id);

    const columns = useMemo<Array<DataTableCellProps<ColumnKey>>>(
        () => [
            {
                itemKey: ColumnKey.ID,
                value: id,
                type: 'text',
            },
            {
                itemKey: ColumnKey.FIRST_NAME,
                value: firstName,
                type: 'text',
            },
            {
                itemKey: ColumnKey.LAST_NAME,
                value: lastName,
                type: 'text',
            },
            {
                itemKey: ColumnKey.EMAIL,
                value: email,
                type: 'text',
            },
            {
                itemKey: ColumnKey.KYC_STATUS,
                value: kycStatus,
                type: kycStatus ? 'badge' : 'text',
                color: kycStatus ? kycStatusConfig[kycStatus] : undefined,
            },
            {
                itemKey: ColumnKey.CREATED_AT,
                value: createdAt,
                type: 'date',
            },
        ],
        [createdAt, email, firstName, id, kycStatus, lastName],
    );

    const actions = useMemo<Array<DataTableCellActionItem<ActionKey>>>(
        () =>
            kycStatus
                ? [
                      {
                          itemKey: ActionKey.SHOW_DOCUMENTS,
                          icon: IconVisibility,
                          tooltip: 'Show KYC Submission',
                      },
                  ]
                : [],
        [kycStatus],
    );

    const onActionClick = useCallback((key: ActionKey) => {
        switch (key) {
            case ActionKey.SHOW_DOCUMENTS:
                setDetailsDialogVisible(true);
                setKycSubmissionQueryEnabled(true);
        }
    }, []);

    useEffect(() => {
        if (approveSubmissionData) {
            setApproveDialogVisible(false);
        }
    }, [approveSubmissionData]);

    useEffect(() => {
        if (rejectSubmissionData) {
            setRejectDialogVisible(false);
        }
    }, [rejectSubmissionData]);

    return (
        <>
            <DataTableRow
                columns={columns}
                actions={actions}
                onActionClick={onActionClick}
            />
            <KycSubmissionDetailsDialog
                loading={isLoading}
                open={detailsDialogVisible}
                title="Kyc Submission Details"
                firstName={data?.firstName}
                lastName={data?.lastName}
                email={data?.email}
                address={data?.address}
                phoneNumber={data?.phoneNumber}
                gender={data?.gender}
                status={data?.status}
                documentUrls={data?.documents.map((document) => document.url)}
                submitting={approveSubmissionPending || rejectSubmissionPending}
                onApprove={() => approveSubmission()}
                onReject={() => rejectSubmission()}
                onClose={() => setDetailsDialogVisible(false)}
            />
            <ConfirmationDialog
                open={approveDialogVisible}
                title="Approve KYC Confirmation"
                description={`Approve KYC for "${email}" and grant full access to the platform. Please ensure all documents have been reviewed.`}
                onClose={() => setApproveDialogVisible(false)}
                confirmButton="Approve"
                cancelButton="Cancel"
                loading={approveSubmissionPending}
                submitButtonColor="success"
                onSubmit={() => approveSubmission()}
            />
            <ConfirmationDialog
                open={rejectDialogVisible}
                title="Reject KYC Confirmation"
                description={`Reject KYC for "${email}" and deny access to the platform.`}
                onClose={() => setRejectDialogVisible(false)}
                confirmButton="Reject"
                submitButtonColor="error"
                cancelButton="Cancel"
                loading={rejectSubmissionPending}
                onSubmit={() => rejectSubmission()}
            />
        </>
    );
}
