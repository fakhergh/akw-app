import IconDelete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { LocalFile, PickedFile, RemoteFile } from '@/interfaces/file';

export interface ImageWrapperProps {
    height?: number;
}

export interface DropzoneAreaPreviewProps extends ImageWrapperProps {
    files: Array<PickedFile>;
    disabled?: boolean;
    onImageDelete: (file: PickedFile) => void;
}

const ImageWrapper = styled(Box)<ImageWrapperProps>(({ theme, height }) => ({
    userSelect: 'none',
    '& img': {
        width: 'auto',
        height: height ?? 172,
        borderRadius: '1rem',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.action.disabled,
    },
    ' .actions-container': {
        display: 'flex',
        opacity: 0,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: '500ms',
        }),
    },
    '&:hover .actions-container': {
        opacity: 1,
    },

    '& .MuiButtonBase-root': {
        transform: 'scale(.9)',
        backgroundColor: 'white',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: '500ms',
        }),
        '&:hover': {
            transform: 'scale(1)',
            backgroundColor: 'white',
        },
    },
}));

export function DropzoneAreaPreview({
    files,
    height,
    disabled,
    ...props
}: DropzoneAreaPreviewProps) {
    const { onImageDelete } = props;

    //const ref = React.useRef<any>(null);

    /*const scrollToEnd = React.useCallback(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    React.useEffect(() => {
        if (files.length) {
            scrollToEnd();
        }
    }, [files.length, scrollToEnd]);
*/
    return (
        <Box display="flex" gap={2} overflow="auto" py={2}>
            {files.map((file: PickedFile) => (
                <ImageWrapper
                    position="relative"
                    key={file.id}
                    //ref={ref}
                    height={height}
                >
                    <img
                        alt="preview"
                        src={
                            file?.hasOwnProperty('url')
                                ? (file as RemoteFile).url
                                : URL.createObjectURL((file as LocalFile).file)
                        }
                        width={0}
                        height={0}
                    />
                    <Box
                        className="actions-container"
                        position="absolute"
                        width="100%"
                        height="100%"
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        justifyContent="flex-end"
                        alignItems="flex-start"
                        p={1}
                    >
                        {!disabled && (
                            <IconButton
                                color="error"
                                onClick={() => onImageDelete(file)}
                            >
                                <IconDelete />
                            </IconButton>
                        )}
                    </Box>
                </ImageWrapper>
            ))}
        </Box>
    );
}
