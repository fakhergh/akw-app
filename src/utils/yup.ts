import * as yup from 'yup';

yup.setLocale({
    mixed: {
        default: 'This field is invalid.',
        required: 'This field is required.',
        notNull: 'This field cannot be null.',
        notOneOf: ({ values }): string =>
            `This value must not be one of: ${values.join(', ')}.`,
        notType: ({ type }): string => `This field must be of type: ${type}.`,
    },
    string: {
        length: ({ length }): string =>
            `This field must be exactly ${length} characters long.`,
        min: ({ min }): string =>
            `This field must be at least ${min} characters long.`,
        max: ({ max }): string =>
            `This field must be no more than ${max} characters long.`,
        matches: ({ regex }): string =>
            `This field must match the pattern: ${regex}.`,
        email: 'This field must be a valid email address.',
        url: 'This field must be a valid URL.',
        trim: 'This field cannot contain leading or trailing spaces.',
        lowercase: 'This field must be lowercase.',
        uppercase: 'This field must be uppercase.',
    },
    number: {
        min: ({ min }): string => `This field must be at least ${min}.`,
        max: ({ max }): string => `This field must be no more than ${max}.`,
        lessThan: ({ less }): string => `This field must be less than ${less}.`,
        moreThan: ({ more }): string =>
            `This field must be greater than ${more}.`,
        positive: 'This field must be a positive number.',
        negative: 'This field must be a negative number.',
        integer: 'This field must be an integer.',
    },
    date: {
        min: ({ min }): string => `This date must be later than ${min}.`,
        max: ({ max }): string => `This date must be earlier than ${max}.`,
    },
    object: {
        noUnknown: ({ path }): string =>
            `This field contains an unknown key: ${path}.`,
    },
    array: {
        min: ({ min }): string =>
            `This array must contain at least ${min} items.`,
        max: ({ max }): string =>
            `This array must contain no more than ${max} items.`,
    },
});

export default yup;
