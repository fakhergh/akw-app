import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App.tsx';

describe('<App/> component ', () => {
    it('Should match snapshot', () => {
        const rendered = render(<App />);

        expect(rendered).toMatchSnapshot();
    });

    it('Should display count button', () => {
        render(<App />);

        const button = screen.getByTestId('count-btn');

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('count is');
    });
});
