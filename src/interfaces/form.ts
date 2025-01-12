export interface BaseFieldProps {
    name: string;
}

export interface BaseFormProps<Values> {
    initialValues?: Values;
    loading?: boolean;
    onClose?: () => void;
    onSubmit: (values: Values) => void;
}
