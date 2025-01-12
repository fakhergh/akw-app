import IconVisibility from '@mui/icons-material/Visibility';
import IconVisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';

import { InputField } from '@/components/InputField/InputField.tsx';
import { BaseFormProps } from '@/interfaces/form.ts';
import Yup from '@/utils/yup.ts';

export interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export type RegisterFormProps = Omit<
    BaseFormProps<RegisterFormValues>,
    'onClose'
>;

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

const defaultValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

export function RegisterForm({
    initialValues = defaultValues,
    loading,
    onSubmit,
}: RegisterFormProps) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisible((prev) => !prev);
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <InputField
                            margin="normal"
                            required
                            fullWidth
                            label="First Name"
                            name="firstName"
                            autoComplete="off"
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField
                            margin="normal"
                            required
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            autoComplete="off"
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField
                            margin="normal"
                            required
                            fullWidth
                            label="Email address"
                            name="email"
                            autoComplete="email"
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={passwordVisible ? 'text' : 'password'}
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {passwordVisible ? (
                                                <IconVisibilityOff fontSize="small" />
                                            ) : (
                                                <IconVisibility fontSize="small" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={() => handleSubmit()}
                            disabled={loading}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Formik>
    );
}
