import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { KycSubmission } from '@/services/api';
import { pascalCase } from '@/utils/formatter';

export interface KycSubmissionDetailsDialogProps extends DialogProps {
    title: string;
    loading?: boolean;
    submitting?: boolean;
    onApprove?: () => void;
    onReject?: () => void;

    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    gender?: string;
    status?: KycSubmission.status;
    documentUrls?: Array<string>;
}

const DocumentThumbnail = styled('img')`
    width: 12rem;
    border-radius: 1rem;
    object-fit: cover;
`;

export function KycSubmissionDetailsDialog({
    open,
    title,
    loading,
    submitting,
    onClose,
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    gender,
    status,
    documentUrls,
    onApprove,
    onReject,
    ...props
}: KycSubmissionDetailsDialogProps) {
    return (
        <Dialog
            {...props}
            open={open}
            onClose={(event, reason) => !submitting && onClose?.(event, reason)}
            fullWidth
            aria-labelledby="kyc-details-dialog-title"
            maxWidth="md"
        >
            <DialogTitle
                id="kyc-details-dialog-title"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container item xs={12} spacing={4}>
                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                First Name
                            </Typography>
                            {firstName}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Last Name
                            </Typography>
                            {lastName}
                        </Grid>

                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Email
                            </Typography>
                            {email}
                        </Grid>

                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Gender
                            </Typography>
                            {gender}
                        </Grid>

                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Status
                            </Typography>
                            {pascalCase(String(status))}
                        </Grid>

                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Phone Number
                            </Typography>
                            {phoneNumber}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Address
                            </Typography>
                            {address}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Documents
                            </Typography>
                            <Box display="flex" gap={2} overflow="auto" mt={1}>
                                {documentUrls?.map((url, i) => (
                                    <DocumentThumbnail
                                        key={i}
                                        crossOrigin="anonymous"
                                        src={url}
                                        alt={`document-${i}`}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Box
                    flex={1}
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyContent={
                        status === KycSubmission.status.PENDING
                            ? 'space-between'
                            : 'flex-end'
                    }
                >
                    <Button
                        onClick={(event) => onClose?.(event, 'escapeKeyDown')}
                        color="inherit"
                        disabled={submitting}
                    >
                        Close
                    </Button>
                    <Box
                        display={
                            status === KycSubmission.status.PENDING
                                ? 'block'
                                : 'none'
                        }
                    >
                        <Button
                            onClick={onReject}
                            autoFocus
                            disabled={submitting}
                            color="error"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={onApprove}
                            autoFocus
                            disabled={submitting}
                            color="success"
                        >
                            Approve
                        </Button>
                    </Box>
                </Box>
            </DialogActions>
        </Dialog>
    );
}
