import IconFeed from '@mui/icons-material/Feed';

import { KPICard } from '@/components/KPICard/KPICard';
import { KycSubmission } from '@/services/api';
import { useKycSubmissionCount } from '@/services/kycSubmissionService';
export interface KycKPICardContainerProps {
    status?: KycSubmission.status;
}

const titleConfig: Record<KycSubmission.status, string> = {
    [KycSubmission.status.PENDING]: 'Pending KYC requests',
    [KycSubmission.status.APPROVED]: 'Approved KYC requests',
    [KycSubmission.status.REJECTED]: 'Rejected KYC requests',
};

const iconBackgroundColorConfig: Record<KycSubmission.status, string> = {
    [KycSubmission.status.PENDING]: 'warning.main',
    [KycSubmission.status.APPROVED]: 'success.main',
    [KycSubmission.status.REJECTED]: 'error.main',
};

export function KycKPICardContainer({ status }: KycKPICardContainerProps) {
    const { data, isLoading } = useKycSubmissionCount(status?.toString());

    return (
        <KPICard
            title={status ? titleConfig[status] : 'Total KYC requests'}
            value={data?.count}
            loading={isLoading}
            icon={IconFeed}
            iconBackgroundColor={
                status ? iconBackgroundColorConfig[status] : 'primary.main'
            }
        />
    );
}
