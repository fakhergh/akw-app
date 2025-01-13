import Button, { ButtonProps } from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface ConfirmationDialogProps extends DialogProps {
    hideCancelButton?: boolean;
    loading?: boolean;
    title: string;
    cancelButton?: string;
    confirmButton: string;
    description?: string;
    onSubmit?: () => void;
    submitButtonColor?: ButtonProps['color'];
}

export function ConfirmationDialog({
    hideCancelButton,
    loading,
    title,
    description,
    cancelButton,
    confirmButton,
    open,
    onClose,
    onSubmit,
    submitButtonColor,
    ...props
}: ConfirmationDialogProps) {
    return (
        <Dialog
            {...props}
            open={open}
            onClose={(event, reason) => !loading && onClose?.(event, reason)}
            fullWidth
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle
                id="confirmation-dialog-title"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {!hideCancelButton && (
                    <Button
                        onClick={(event) => onClose?.(event, 'escapeKeyDown')}
                        color="inherit"
                        disabled={loading}
                    >
                        {cancelButton}
                    </Button>
                )}
                <Button
                    onClick={onSubmit}
                    autoFocus
                    disabled={loading}
                    color={submitButtonColor}
                >
                    {confirmButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
