import IconFeed from '@mui/icons-material/Feed';

import { KPICard } from '@/components/KPICard/KPICard';
import { KycSubmissionStatusEnum } from '@/services/generated';
import { useKycSubmissionCount } from '@/services/kycSubmissionService';
export interface KycKPICardContainerProps {
    status?: KycSubmissionStatusEnum;
}

const titleConfig: Record<KycSubmissionStatusEnum, string> = {
    [KycSubmissionStatusEnum.Pending]: 'Pending KYC requests',
    [KycSubmissionStatusEnum.Approved]: 'Approved KYC requests',
    [KycSubmissionStatusEnum.Rejected]: 'Rejected KYC requests',
};

const iconBackgroundColorConfig: Record<KycSubmissionStatusEnum, string> = {
    [KycSubmissionStatusEnum.Pending]: 'warning.main',
    [KycSubmissionStatusEnum.Approved]: 'success.main',
    [KycSubmissionStatusEnum.Rejected]: 'error.main',
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
