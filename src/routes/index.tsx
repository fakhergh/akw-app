import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { KycSubmissionFormContainer } from '@/containers/KycSubmissionFormContainer/KycSubmissionFormContainer.tsx';
import { User } from '@/services/api';
import { useUserProfile } from '@/services/authService';

export const Route = createFileRoute('/')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useUserProfile();
    const [kycSubmissionFormVisible, setKycSubmissionFormVisible] =
        useState<boolean>(false);

    const incompleteKycAlertVisible = data && !data?.kycStatus;

    const approvedKycAlertVisible = data?.kycStatus === User.kycStatus.APPROVED;

    const pendingKycAlertVisible = data?.kycStatus === User.kycStatus.PENDING;

    const rejectedKycAlertVisible = data?.kycStatus === User.kycStatus.REJECTED;

    return (
        <div>
            {incompleteKycAlertVisible && (
                <Alert severity="warning">
                    <Box display="flex" gap={3}>
                        <Box flex={1}>
                            <Typography variant="body1">
                                Your account's KYC verification is still
                                incomplete. Please ensure all required documents
                                are submitted to complete the verification
                                process. Until then, certain features may be
                                restricted.
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="small"
                                onClick={() =>
                                    setKycSubmissionFormVisible(true)
                                }
                            >
                                Verify now
                            </Button>
                        </Box>
                    </Box>
                </Alert>
            )}

            {pendingKycAlertVisible && (
                <Alert severity="info">
                    <Typography variant="body1">
                        Your KYC verification is currently being reviewed.
                        Please allow some time for the verification process to
                        be completed. You will be notified once the process is
                        finished and you will have full access to all features.
                    </Typography>
                </Alert>
            )}

            {approvedKycAlertVisible && (
                <Alert severity="success">
                    <Typography variant="body1">
                        Your KYC verification has been successfully completed.
                        You now have full access to all features and services.
                        Thank you for your prompt submission! If you have any
                        further questions, feel free to reach out to our support
                        team.
                    </Typography>
                </Alert>
            )}

            {rejectedKycAlertVisible && (
                <Alert severity="error">
                    <Box display="flex" gap={3}>
                        <Box flex={1}>
                            <Typography variant="body1">
                                Your KYC verification could not be completed at
                                this time. Unfortunately, your submission did
                                not meet our requirements. Please review the
                                details and submit the necessary documents. If
                                you need assistance, feel free to contact our
                                support team.
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="small"
                                onClick={() =>
                                    setKycSubmissionFormVisible(true)
                                }
                            >
                                Resubmit
                            </Button>
                        </Box>
                    </Box>
                </Alert>
            )}

            {kycSubmissionFormVisible && (
                <KycSubmissionFormContainer
                    onClose={() => setKycSubmissionFormVisible(false)}
                />
            )}
        </div>
    );
}
