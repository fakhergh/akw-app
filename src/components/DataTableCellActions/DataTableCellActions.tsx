import { SvgIconComponent } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';

export interface DataTableCellActionItem<EventKey> {
    itemKey: EventKey;
    tooltip: string;
    icon: SvgIconComponent;
    iconColor?: string;
}

export interface DataTableCellActionsProps<EventKey> {
    actions: Array<DataTableCellActionItem<EventKey>>;
    onActionClick?: (key: EventKey) => void;
}

export function DataTableCellActions<EventKey>({
    actions,
    onActionClick,
}: DataTableCellActionsProps<EventKey>) {
    return (
        <TableCell
            align="center"
            sx={{
                position: 'sticky',
                right: 0,
                background: 'unset',
                borderWidth: 0,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderStyle: 'solid',
                backgroundColor: (theme) => theme.palette.background.paper,
                transition: (theme) =>
                    theme.transitions.create('background', {
                        easing: theme.transitions.easing.sharp,
                        duration: '500ms',
                    }),
            }}
        >
            {actions?.map(
                ({ itemKey, icon: Icon, iconColor = 'inherit', tooltip }) => (
                    <Tooltip key={itemKey as string} title={tooltip} arrow>
                        <IconButton
                            size="small"
                            onClick={() => onActionClick?.(itemKey)}
                        >
                            <Icon sx={{ color: iconColor }} />
                        </IconButton>
                    </Tooltip>
                ),
            )}
        </TableCell>
    );
}
