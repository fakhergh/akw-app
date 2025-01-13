import IconCloudUpload from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { withMemo } from '@/hocs/withMemo';
import { LocalFile } from '@/interfaces/file';

export interface DropzoneAreaProps
    extends Omit<
        DropzoneOptions,
        'onDropAccepted' | 'onDragEnter' | 'onDragLeave' | 'onDrop'
    > {
    aspectRatio?: number;
    onDropAccepted: (files: Array<LocalFile>) => void;
    error: boolean;
}

const DropZone = styled(Box, {
    shouldForwardProp: (prop) =>
        prop !== 'error' &&
        prop !== 'dragEntered' &&
        prop !== 'aspectRatio' &&
        prop !== 'disabled',
})<{
    error?: boolean;
    disabled?: boolean;
    dragEntered?: boolean;
    aspectRatio?: number;
}>(({ theme, dragEntered, error, disabled, aspectRatio = 3 }) => ({
    aspectRatio,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '15rem',
    borderWidth: '.125rem',
    borderRadius: '1rem',
    backgroundColor:
        !disabled && dragEntered && error
            ? theme.palette.mode === 'dark'
                ? red['200']
                : red['50']
            : 'transparent',
    borderColor:
        !disabled && dragEntered
            ? error
                ? theme.palette.error.main
                : theme.palette.success.main
            : error
              ? theme.palette.error.main
              : theme.palette.action.disabled,
    color:
        !disabled && dragEntered
            ? error
                ? theme.palette.error.main
                : theme.palette.success.main
            : error
              ? theme.palette.error.main
              : theme.palette.action.disabled,
    borderStyle: 'dashed',
    transition: theme.transitions.create(['border-color', 'background'], {
        easing: theme.transitions.easing.sharp,
        duration: '500ms',
    }),
    cursor: 'pointer',
    '&:hover': !disabled &&
        !dragEntered && {
            borderColor: theme.palette.action.active,
            color: theme.palette.action.active,
        },
    '& div': {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    '& p,svg': {
        userSelect: 'none',
        transition: theme.transitions.create(['color'], {
            easing: theme.transitions.easing.sharp,
            duration: '500ms',
        }),
    },
}));
export const DropzoneArea = withMemo(function ({
    onDropAccepted,
    aspectRatio,
    error,
    disabled,
    ...options
}: DropzoneAreaProps) {
    const [dragEntered, setDragEntered] = useState(false);

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            disabled,
            ...options,
            onDragEnter: () => {
                setDragEntered(true);
            },
            onDragLeave: () => {
                setDragEntered(false);
            },
            onDrop: () => {
                setDragEntered(false);
            },
            onDropAccepted: (files: Array<File>) => {
                onDropAccepted(
                    files.map(
                        (file, index: number) =>
                            ({
                                id: `${Date.now()}${index}`,
                                file,
                            }) as LocalFile,
                    ),
                );
            },
        });

    return (
        <DropZone
            aspectRatio={aspectRatio}
            dragEntered={dragEntered}
            error={isDragReject || error}
            disabled={disabled}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <Box display="flex" flexDirection="column" textAlign="center" p={3}>
                <IconCloudUpload fontSize="large" />

                {isDragActive ? (
                    <Typography>
                        {isDragReject
                            ? 'File type not supported. Please upload a valid file.'
                            : 'Drop your files here'}
                    </Typography>
                ) : (
                    <Typography>
                        Drag & drop files here, or click to select
                    </Typography>
                )}
            </Box>
        </DropZone>
    );
});
