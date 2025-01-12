import { FilledInputProps } from '@mui/material/FilledInput';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';
import * as React from 'react';

import { BaseFieldProps } from '@/interfaces/form';

export interface InputFieldProps
    extends BaseFieldProps,
        Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'> {
    InputProps?: Partial<FilledInputProps>;
    withHelperText?: boolean;
}

export function InputField({
    name,
    role,
    InputProps,
    withHelperText = true,
    type,
    ...props
}: InputFieldProps) {
    const [{ value, onChange, onBlur }, { error }] = useField(name);

    const ariaLabel = props['aria-label'];

    const inputProps = React.useMemo(
        () => ({
            role: role,
            'aria-label': ariaLabel,
        }),
        [role, ariaLabel],
    );

    return (
        <TextField
            {...props}
            type={type}
            inputProps={inputProps}
            name={name}
            value={value}
            onChange={onChange(name)}
            onBlur={onBlur(name)}
            color={error ? 'error' : 'primary'}
            error={!!error}
            helperText={withHelperText ? error : undefined}
            InputProps={{
                ...InputProps,
                sx: {
                    borderRadius: '1rem',
                },
            }}
            sx={{ m: 0 }}
            InputLabelProps={{ shrink: true }}
        />
    );
}
