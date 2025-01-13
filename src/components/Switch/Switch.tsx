import { styled } from '@mui/material/styles';
import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

export type SwitchProps = MuiSwitchProps;

export const Switch = styled(MuiSwitch)<SwitchProps>({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
    '&.MuiSwitch-sizeSmall': {
        width: 46,
        height: 34,
        '& .Mui-checked': {
            transform: 'translateX(13px)',
        },
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 10,
            height: 10,
            margin: 8,
        },
    },
});
