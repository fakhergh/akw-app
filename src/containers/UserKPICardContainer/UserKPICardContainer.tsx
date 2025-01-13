import IconPeople from '@mui/icons-material/People';

import { KPICard } from '@/components/KPICard/KPICard';
import { useUsersCount } from '@/services/userService';

export function UserKPICardContainer() {
    const { data, isLoading } = useUsersCount();

    return (
        <KPICard
            title="Total Users"
            value={data?.count}
            loading={isLoading}
            icon={IconPeople}
            iconBackgroundColor={'secondary.main'}
        />
    );
}
