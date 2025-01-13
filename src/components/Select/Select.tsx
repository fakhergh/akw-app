import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';

export interface SelectOptionItem {
    itemKey: string;
    label: string;
    value: string;
}

export type SelectProps = MuiSelectProps & {
    options: Array<SelectOptionItem>;
    hideNoOption?: boolean;
    helperText?: string;
};

export function Select({
    label,
    options,
    fullWidth,
    hideNoOption,
    helperText,
    sx,
    error,
    ...props
}: SelectProps) {
    return (
        <FormControl
            fullWidth={fullWidth}
            sx={sx}
            error={error}
            color="success"
        >
            <InputLabel shrink>{label}</InputLabel>
            <MuiSelect {...props} label={label}>
                {!hideNoOption && (
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                )}
                {options.map((option) => {
                    return (
                        <MenuItem key={option.itemKey} value={option.value}>
                            {option.label}
                        </MenuItem>
                    );
                })}
            </MuiSelect>
            <FormHelperText sx={{ ml: 2 }}>{helperText}</FormHelperText>
        </FormControl>
    );
}
