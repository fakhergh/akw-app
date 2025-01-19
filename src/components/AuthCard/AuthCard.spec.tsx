import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AuthCard } from '@/components/AuthCard/AuthCard';

describe('<AuthCard/>', () => {
    it('Should matches snapshot', () => {
        const { container } = render(<AuthCard />);
        expect(container).toMatchSnapshot();
    });
});
