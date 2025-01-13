import { SvgIconComponent } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
    ChangeEvent,
    Fragment,
    MouseEvent,
    ReactNode,
    useCallback,
    useState,
} from 'react';

type Data<T> = T & { id: string };

export interface HeadCell {
    itemKey: string;
    label: string;
    displayed?: boolean;
    alwaysDisplayed?: boolean;
    minWidth?: number;
    sx?: TableCellProps['style'];
}

export interface ToolbarActionProps<ActionKey> {
    itemKey: ActionKey;
    icon: SvgIconComponent;
    tooltip?: string;
    disabled?: boolean;
    loading?: boolean;
}

interface EnhancedTableProps {
    headCells: Array<HeadCell>;
    numSelected: number;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
    displaySelectAllCell?: boolean;
}

interface EnhancedTableToolbarProps<ActionKey> {
    title?: string;
    numSelected: number;
    actions?: Array<ToolbarActionProps<ActionKey>>;
    onActionClick?: (
        eventKey: ActionKey,
        event: MouseEvent<HTMLButtonElement>,
    ) => void;
}

export type DataTableRenderItem<T> = (
    item: T,
    index: number,
    selected?: boolean,
    onSelectChange?: (
        event: ChangeEvent<HTMLInputElement>,
        key: string,
    ) => void,
) => ReactNode | Array<ReactNode>;

export interface DataTableProps<T, ToolbarActionKey>
    extends Pick<EnhancedTableProps, 'headCells' | 'displaySelectAllCell'>,
        Pick<TableProps, 'stickyHeader'> {
    title?: string;
    totalPages?: number;
    page: number;
    rowsPerPage?: number;
    onPageChange?: (page: number) => void;
    items: Array<Data<T>>;
    renderItem: DataTableRenderItem<T>;
    keyExtractor: (item: T, index: number) => string | number;
    toolbarActions?: EnhancedTableToolbarProps<ToolbarActionKey>['actions'];
    onToolbarActionClick?: EnhancedTableToolbarProps<ToolbarActionKey>['onActionClick'];
    hideToolbar?: boolean;
    hidePagination?: boolean;
    loading?: boolean;
    noShadow?: boolean;
    noBorder?: boolean;
}

function EnhancedTableHead({ headCells }: EnhancedTableProps) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => {
                    return (
                        <TableCell
                            key={`${headCell.itemKey}`}
                            sx={{
                                ...headCell.sx,
                                textAlign:
                                    headCell.itemKey === 'actions'
                                        ? 'center'
                                        : (headCell.sx?.textAlign ?? 'left'),
                                minWidth:
                                    headCell.itemKey === 'actions'
                                        ? 200
                                        : (headCell.minWidth ?? 150),
                            }}
                        >
                            {headCell.label}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar<ActionKey = string>({
    title,
    numSelected,
    actions,
    onActionClick,
}: EnhancedTableToolbarProps<ActionKey>) {
    return (
        <Toolbar sx={{ py: 1, pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Box sx={{ flex: '1 1 100%' }}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </Box>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete" arrow>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Box display="flex" gap={1}>
                    {actions?.map(
                        ({
                            itemKey,
                            icon: Icon,
                            tooltip,
                            disabled,
                            loading,
                        }) => (
                            <Tooltip
                                key={itemKey as string}
                                title={!loading ? tooltip : ''}
                                arrow
                            >
                                <Box position="relative">
                                    <IconButton
                                        disabled={disabled}
                                        onClick={(event) =>
                                            onActionClick?.(itemKey, event)
                                        }
                                        aria-label={`${itemKey}`}
                                    >
                                        <Icon />
                                    </IconButton>
                                    {loading && (
                                        <CircularProgress
                                            color="primary"
                                            size="2.5rem"
                                            thickness={2}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                zIndex: 1,
                                                animationDuration: '1000ms',
                                            }}
                                        />
                                    )}
                                </Box>
                            </Tooltip>
                        ),
                    )}
                </Box>
            )}
        </Toolbar>
    );
}

const StyledPaper = styled(Paper, {
    shouldForwardProp: (propName) =>
        propName !== 'noShadow' && propName !== 'noBorder',
})<{
    noShadow?: boolean;
    noBorder?: boolean;
}>(({ theme, noShadow, noBorder }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: noBorder ? 0 : '1rem',
    overflow: 'hidden',
    boxShadow: noShadow ? theme.shadows[0] : theme.shadows[1],
    transition: theme.transitions.create('background', {
        easing: theme.transitions.easing.sharp,
        duration: '500ms',
    }),
}));

export function DataTable<T, ToolbarActionKey = undefined>({
    title,
    headCells,
    page,
    onPageChange,
    rowsPerPage,
    loading,
    keyExtractor,
    items,
    renderItem,
    toolbarActions,
    onToolbarActionClick,
    stickyHeader,
    displaySelectAllCell,
    hidePagination,
    totalPages,
    noShadow,
    noBorder,
    hideToolbar,
}: DataTableProps<T, ToolbarActionKey>) {
    const [selected, setSelected] = useState<Array<string>>([]);

    const handleItemClick = useCallback(
        (event: ChangeEvent<HTMLInputElement>, id: string) => {
            if (event.target.checked) {
                setSelected(selected.concat(id));
                return;
            }
            setSelected(selected.filter((i) => i !== id));
        },
        [selected],
    );

    const handleSelectAllClick = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const newSelected = items.map((n) => n.id);
                setSelected(newSelected);
                return;
            }
            setSelected([]);
        },
        [items],
    );

    const handleChangePage = useCallback(
        (_: unknown, newPage: number) => {
            setSelected([]);
            onPageChange?.(newPage);
        },
        [onPageChange],
    );

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = rowsPerPage ? rowsPerPage - items.length : 0;

    return (
        <StyledPaper noShadow={noShadow} noBorder={noBorder}>
            {!hideToolbar && (
                <EnhancedTableToolbar
                    title={title}
                    numSelected={selected.length}
                    actions={toolbarActions}
                    onActionClick={onToolbarActionClick}
                />
            )}
            {loading && <LinearProgress />}
            <TableContainer style={{ flex: 1 }}>
                <Table
                    aria-labelledby="tableTitle"
                    size="medium"
                    stickyHeader={stickyHeader}
                >
                    <EnhancedTableHead
                        headCells={headCells}
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={items.length}
                        displaySelectAllCell={displaySelectAllCell}
                    />

                    <TableBody>
                        {items.map((row, index) => {
                            const isItemSelected = isSelected(row.id);

                            return (
                                <Fragment key={keyExtractor(row, index)}>
                                    {renderItem(
                                        row,
                                        index,
                                        isItemSelected,
                                        handleItemClick,
                                    )}
                                </Fragment>
                            );
                        })}
                        {!loading && !items.length && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={headCells.length + 1}>
                                    No result found.
                                </TableCell>
                            </TableRow>
                        )}
                        {/*{emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={headCells.length + 1} />
                            </TableRow>
                        )}*/}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" py={3}>
                {!hidePagination && (
                    <Pagination
                        count={totalPages}
                        defaultPage={1}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                    />
                )}
            </Box>
        </StyledPaper>
    );
}
