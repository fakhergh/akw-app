import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';

import { DropzoneAreaField } from '@/components/DropZoneAreaField/DropZoneAreaField';
import { DropzoneAreaPreview } from '@/components/DropzoneAreaPreview/DropzoneAreaPreview';
import { InputField } from '@/components/InputField/InputField';
import { SelectField } from '@/components/SelectField/SelectField';
import { PickedFile } from '@/interfaces/file';
import { BaseFormProps } from '@/interfaces/form';
import yup from '@/utils/yup';

export interface KycSubmissionFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string | null;
    documents: Array<PickedFile>;
}

export type KycSubmissionFormProps = BaseFormProps<KycSubmissionFormValues>;

const defaultValues: KycSubmissionFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gender: null,
    documents: [],
};

const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    address: yup.string().required(),
    gender: yup.string().required(),
    documents: yup.array().of(yup.mixed()).required(),
});

const genderOptions = [
    {
        itemKey: 'male',
        label: 'Male',
        value: 'MALE',
    },
    {
        itemKey: 'female',
        label: 'Female',
        value: 'FEMALE',
    },
];

const ACCEPT_ONLY_IMAGES = {
    'image/*': ['.jpeg', '.jpg', '.png'],
};

export function KycSubmissionForm({
    initialValues = defaultValues,
    onSubmit,
    onClose,
    loading,
}: KycSubmissionFormProps) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ dirty, handleSubmit, values, setFieldValue }) => (
                <Dialog
                    open={true}
                    onClose={() => !dirty && onClose?.()}
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle>KYC Submission</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <InputField
                                    name="firstName"
                                    label="First Name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputField
                                    name="lastName"
                                    label="Last Name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputField
                                    name="email"
                                    label="Email address"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputField
                                    name="phoneNumber"
                                    label="Phone Number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <SelectField
                                    name="gender"
                                    label="Gender"
                                    options={genderOptions}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField
                                    name="address"
                                    label="Address"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <DropzoneAreaField
                                    name="documents"
                                    maxFiles={10}
                                    accept={ACCEPT_ONLY_IMAGES}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DropzoneAreaPreview
                                    files={values.documents}
                                    onImageDelete={async (deletedFile) => {
                                        await setFieldValue(
                                            'documents',
                                            values.documents.filter(
                                                (file) =>
                                                    file.id !== deletedFile.id,
                                            ),
                                        );
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            role="cancel"
                            onClick={() => onClose?.()}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleSubmit()}
                            disabled={loading || !dirty}
                            role="submit"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Formik>
    );
}
