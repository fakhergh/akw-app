import { useCallback, useEffect } from 'react';

import {
    KycSubmissionForm,
    KycSubmissionFormProps,
    KycSubmissionFormValues,
} from '@/components/KycSubmissionForm/KycSubmissionForm';
import { LocalFile } from '@/interfaces/file';
import {
    CreateKycSubmissionDto,
    useCreateKycSubmission,
} from '@/services/kycSubmissionService';

export type KycSubmissionFormContainerProps = Omit<
    KycSubmissionFormProps,
    'onSubmit' | 'loading'
>;

export function KycSubmissionFormContainer(
    props: KycSubmissionFormContainerProps,
) {
    const { onClose } = props;

    const {
        mutate: createKycSubmission,
        data,
        isPending,
    } = useCreateKycSubmission();

    const onSubmit = useCallback(
        (values: KycSubmissionFormValues) => {
            const createKycSubmissionDto: CreateKycSubmissionDto = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                address: values.address,
                phoneNumber: values.phoneNumber,
                gender: values.gender as 'MALE' | 'FEMALE',
                documents: values.documents.map(
                    (document) => (document as LocalFile).file,
                ),
            };

            createKycSubmission(createKycSubmissionDto);
        },
        [createKycSubmission],
    );

    useEffect(() => {
        if (data) {
            onClose?.();
        }
    }, [data, onClose]);

    return (
        <KycSubmissionForm {...props} loading={isPending} onSubmit={onSubmit} />
    );
}
