import { useField } from 'formik';
import { useCallback } from 'react';

import {
    DropzoneArea,
    DropzoneAreaProps,
} from '@/components/DropZoneArea/DropZoneArea';
import { withMemo } from '@/hocs/withMemo';
import { PickedFile } from '@/interfaces/file';
import { BaseFieldProps } from '@/interfaces/form';

export interface DropzoneAreaFieldProps
    extends BaseFieldProps,
        Omit<DropzoneAreaProps, 'onDropAccepted' | 'error'> {}

export const DropzoneAreaField = withMemo(function ({
    name,
    ...props
}: DropzoneAreaFieldProps) {
    const [{ value }, { error }, { setValue }] =
        useField<Array<PickedFile>>(name);

    const onDropAccepted = useCallback(
        (files: Array<PickedFile>) => setValue([...value, ...files]),
        [setValue, value],
    );

    return (
        <DropzoneArea
            {...props}
            onDropAccepted={onDropAccepted}
            error={!!error}
        />
    );
});
