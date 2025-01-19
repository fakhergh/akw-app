import { render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { LoginForm, LoginFormValues } from '@/components/LoginForm/LoginForm';

const values: LoginFormValues = {
    email: 'joe.hattab@gmail.com',
    password: '0000',
};

const mockOnSubmit = vi.fn();

describe('<LoginForm/>', () => {
    it('Should matches snapshot', () => {
        const { container } = render(
            <LoginForm userType="user" onSubmit={mockOnSubmit} />,
        );

        expect(container).toMatchSnapshot();
    });

    it('Should renders the form fields correctly', () => {
        const { getByTestId } = render(
            <LoginForm userType="user" onSubmit={mockOnSubmit} />,
        );

        expect(getByTestId('email-input')).toBeInTheDocument();
        expect(getByTestId('password-input')).toBeInTheDocument();
        expect(getByTestId('submit-btn')).toBeInTheDocument();
    });

    it('Should calls onSubmit with correct values when the form is submitted', async () => {
        const onSubmit = vi.fn();

        const { getByTestId } = render(
            <LoginForm userType="user" onSubmit={onSubmit} />,
        );

        const emailInput = getByTestId('email-input').querySelector('input');
        const passwordInput =
            getByTestId('password-input').querySelector('input');
        const submitButton = getByTestId('submit-btn');

        await userEvent.type(emailInput!, values.email);
        await userEvent.type(passwordInput!, values.password);
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith(values, expect.anything());
        });
    });
});
