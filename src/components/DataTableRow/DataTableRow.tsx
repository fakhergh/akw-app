import { SvgIconComponent } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import TableCell from '@mui/material/TableCell';
import BaseTableRow from '@mui/material/TableRow';
import * as React from 'react';

import {
    DataTableCellActionItem,
    DataTableCellActions,
} from '@/components/DataTableCellActions/DataTableCellActions';
import { Switch } from '@/components/Switch/Switch';
import { formatDate } from '@/utils/date';

export interface DataTableCellProps<Key> {
    itemKey: Key;
    value: string | number | boolean | undefined | null;
    type: 'text' | 'switch' | 'checkbox' | 'badge' | 'icon' | 'date';
    color?:
        | 'primary'
        | 'secondary'
        | 'default'
        | 'error'
        | 'info'
        | 'success'
        | 'warning';
    iconColor?:
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning';
    loading?: boolean;
    icon?: SvgIconComponent | null;
    action?: {
        icon: SvgIconComponent;
        onClick: (value: string | number | boolean) => void;
    } | null;
    disabled?: boolean;
}

export interface DataTableRowProps<Key, ActionKey> {
    columns: Array<DataTableCellProps<Key>>;
    actions?: Array<DataTableCellActionItem<ActionKey>>;
    onValueChange?: (key: Key, value: boolean) => void;
    onActionClick?: (key: ActionKey) => void;
}

export function DataTableRow<Key = string, ActionKey = string>({
    columns,
    actions,
    onValueChange,
    onActionClick,
}: DataTableRowProps<Key, ActionKey>) {
    const renderedCell = React.useCallback(
        ({ action, icon: Icon, ...column }: DataTableCellProps<Key>) => {
            const ActionIcon = action?.icon;

            switch (column.type) {
                case 'text':
                    return (
                        <Box
                            display="flex"
                            alignItems="center"
                            color={
                                column.color
                                    ? `${column.color}.main`
                                    : undefined
                            }
                        >
                            {column.value ?? '--'}
                            {!!ActionIcon && (
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        action?.onClick?.(column.value!)
                                    }
                                >
                                    <ActionIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    );
                case 'switch':
                    return (
                        <>
                            {column.loading && <CircularProgress size="1em" />}
                            {!column.loading && (
                                <Switch
                                    size="small"
                                    checked={column.value as boolean}
                                    onChange={(_, checked) =>
                                        onValueChange?.(column.itemKey, checked)
                                    }
                                    disabled={column.disabled}
                                    inputProps={{
                                        'aria-label': `${column.itemKey}`,
                                    }}
                                />
                            )}
                        </>
                    );
                case 'checkbox':
                    return (
                        <>
                            {column.loading ? (
                                <CircularProgress size="1em" />
                            ) : (
                                <Checkbox
                                    checked={column.value as boolean}
                                    onChange={(_, checked) => {
                                        onValueChange?.(
                                            column.itemKey,
                                            checked,
                                        );
                                    }}
                                    disabled={column.disabled}
                                />
                            )}
                        </>
                    );
                case 'badge':
                    return (
                        <Chip
                            label={column.value}
                            color={column.color}
                            size="small"
                        />
                    );
                case 'icon':
                    return (
                        <SvgIcon color={column.iconColor} fontSize="small">
                            {!!Icon && <Icon />}
                        </SvgIcon>
                    );
                case 'date':
                    return formatDate(column.value as string);
                default:
                    return null;
            }
        },
        [onValueChange],
    );

    return (
        <BaseTableRow>
            {columns.map((column) => (
                <TableCell key={`${column.itemKey}`} align="left">
                    {renderedCell(column)}
                </TableCell>
            ))}
            {!!actions && (
                <DataTableCellActions<ActionKey>
                    actions={actions}
                    onActionClick={onActionClick}
                />
            )}
        </BaseTableRow>
    );
}
