import { SelectChangeEvent } from '@mui/material/Select';
import { useField } from 'formik';
import * as React from 'react';

import { Select, SelectProps } from '@/components/Select/Select';
import { BaseFieldProps } from '@/interfaces/form';

export interface SelectFieldProps
    extends BaseFieldProps,
        Omit<SelectProps, 'name' | 'value' | 'onChange'> {}

export function SelectField({ name, ...props }: SelectFieldProps) {
    const [{ value }, { error }, { setValue }] = useField(name);

    const onChange = React.useCallback(
        (event: SelectChangeEvent<unknown>) => setValue(event.target.value),
        [setValue],
    );

    return (
        <Select
            {...props}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error}
        />
    );
}
