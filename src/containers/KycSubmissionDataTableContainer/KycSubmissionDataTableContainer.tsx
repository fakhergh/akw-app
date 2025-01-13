import IconCheck from '@mui/icons-material/Check';
import IconClose from '@mui/icons-material/Close';
import IconVisibility from '@mui/icons-material/Visibility';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DataTableCellActionItem } from '@/components/DataTableCellActions/DataTableCellActions';
import {
    DataTableCellProps,
    DataTableRow,
} from '@/components/DataTableRow/DataTableRow';
import { KycSubmissionDetailsDialog } from '@/components/KycSubmissionDetailsDialog/KycSubmissionDetailsDialog';
import { ConfirmationDialog } from '@/containers/ConfirmationDialog/ConfirmationDialog';
import { KycSubmission, User } from '@/services/api';
import {
    useApproveKycSubmission,
    useRejectKycSubmission,
} from '@/services/kycSubmissionService';

export interface KycSubmissionDataTableContainerProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    gender: KycSubmission.gender;
    status?: KycSubmission.status;
    createdAt: string;
    documentUrls: Array<string>;
}

enum ColumnKey {
    ID,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    KYC_STATUS,
    PHONE_NUMBER,
    ADDRESS,
    GENDER,
    CREATED_AT,
    ACTIONS,
}

enum ActionKey {
    SHOW_DOCUMENTS,
    APPROVE_KYC_STATUS,
    REJECT_KYC_STATUS,
}

const kycStatusConfig: Record<User.kycStatus, 'warning' | 'error' | 'success'> =
    {
        [User.kycStatus.PENDING]: 'warning',
        [User.kycStatus.REJECTED]: 'error',
        [User.kycStatus.APPROVED]: 'success',
    };

export function KycSubmissionDataTableContainer({
    id,
    firstName,
    lastName,
    email,
    status,
    phoneNumber,
    address,
    gender,
    createdAt,
    documentUrls,
}: KycSubmissionDataTableContainerProps) {
    const [approveDialogVisible, setApproveDialogVisible] =
        useState<boolean>(false);
    const [rejectDialogVisible, setRejectDialogVisible] =
        useState<boolean>(false);

    const [detailsDialogVisible, setDetailsDialogVisible] =
        useState<boolean>(false);

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
                itemKey: ColumnKey.PHONE_NUMBER,
                value: phoneNumber,
                type: 'text',
            },
            {
                itemKey: ColumnKey.ADDRESS,
                value: address,
                type: 'text',
            },
            {
                itemKey: ColumnKey.KYC_STATUS,
                value: status,
                type: status ? 'badge' : 'text',
                color: status ? kycStatusConfig[status] : undefined,
            },
            {
                itemKey: ColumnKey.GENDER,
                value: gender,
                type: 'badge',
                color:
                    gender === KycSubmission.gender.MALE ? 'primary' : 'error',
            },
            {
                itemKey: ColumnKey.CREATED_AT,
                value: createdAt,
                type: 'date',
            },
        ],
        [
            address,
            createdAt,
            email,
            firstName,
            gender,
            id,
            status,
            lastName,
            phoneNumber,
        ],
    );

    const actions = useMemo<Array<DataTableCellActionItem<ActionKey>>>(() => {
        const actionItems = [
            {
                itemKey: ActionKey.SHOW_DOCUMENTS,
                icon: IconVisibility,
                tooltip: 'Show Documents',
            },
        ];

        if (status === KycSubmission.status.PENDING) {
            return [
                ...actionItems,
                {
                    itemKey: ActionKey.REJECT_KYC_STATUS,
                    icon: IconClose,
                    tooltip: 'Reject',
                    iconColor: 'error.main',
                },
                {
                    itemKey: ActionKey.APPROVE_KYC_STATUS,
                    icon: IconCheck,
                    tooltip: 'Approve',
                    iconColor: 'success.main',
                },
            ];
        }

        return actionItems;
    }, [status]);

    const onActionClick = useCallback((key: ActionKey) => {
        switch (key) {
            case ActionKey.SHOW_DOCUMENTS:
                setDetailsDialogVisible(true);
                break;
            case ActionKey.APPROVE_KYC_STATUS:
                setApproveDialogVisible(true);
                break;
            case ActionKey.REJECT_KYC_STATUS:
                setRejectDialogVisible(true);
                break;
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
            <KycSubmissionDetailsDialog
                open={detailsDialogVisible}
                title="Kyc Submission Details"
                firstName={firstName}
                lastName={lastName}
                email={email}
                address={address}
                phoneNumber={phoneNumber}
                gender={gender}
                status={status}
                documentUrls={documentUrls}
                submitting={approveSubmissionPending || rejectSubmissionPending}
                onApprove={() => approveSubmission()}
                onReject={() => rejectSubmission()}
                onClose={() => setDetailsDialogVisible(false)}
            />
        </>
    );
}
