import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createFileRoute } from '@tanstack/react-router';

import { KycKPICardContainer } from '@/containers/KycKPICardContainer/KycKPICardContainer';
import { UserKPICardContainer } from '@/containers/UserKPICardContainer/UserKPICardContainer';
import { KycSubmissionStatusEnum } from '@/services/generated';

export const Route = createFileRoute('/admin/dashboard')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <UserKPICardContainer />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <KycKPICardContainer />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <KycKPICardContainer
                        status={KycSubmissionStatusEnum.Pending}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <KycKPICardContainer
                        status={KycSubmissionStatusEnum.Approved}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <KycKPICardContainer
                        status={KycSubmissionStatusEnum.Rejected}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
