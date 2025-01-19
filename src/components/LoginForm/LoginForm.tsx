import IconVisibility from '@mui/icons-material/Visibility';
import IconVisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';

import { InputField } from '@/components/InputField/InputField';
import { BaseFormProps } from '@/interfaces/form';
import Yup from '@/utils/yup';

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface LoginFormProps
    extends Omit<BaseFormProps<LoginFormValues>, 'onClose'> {
    userType: 'admin' | 'user';
}

const defaultValues: LoginFormValues = {
    email: '',
    password: '',
};

const adminDefaultValues: LoginFormValues = {
    email: 'admin@gmail.com',
    password: '0000',
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

export function LoginForm({
    loading,
    onSubmit,
    userType,
    initialValues = userType === 'admin' ? adminDefaultValues : defaultValues,
}: LoginFormProps) {
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
                            data-testid="email-input"
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
                            data-testid="password-input"
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
                            data-testid="submit-btn"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={() => handleSubmit()}
                            disabled={loading}
                            color={userType === 'admin' ? 'success' : 'primary'}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Formik>
    );
}
