import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NavBar } from '@/components/NavBar/NavBar';

describe('<NavBar/>', () => {
    it('should match snapshot', () => {
        const rendered = render(<NavBar />);

        expect(rendered).toMatchSnapshot();
    });
});
