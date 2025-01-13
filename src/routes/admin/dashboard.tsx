import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createFileRoute } from '@tanstack/react-router';

import { KycKPICardContainer } from '@/containers/KycKPICardContainer/KycKPICardContainer';
import { UserKPICardContainer } from '@/containers/UserKPICardContainer/UserKPICardContainer';
import { KycSubmission } from '@/services/api';

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
                        status={KycSubmission.status.PENDING}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <KycKPICardContainer
                        status={KycSubmission.status.APPROVED}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <KycKPICardContainer
                        status={KycSubmission.status.REJECTED}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
