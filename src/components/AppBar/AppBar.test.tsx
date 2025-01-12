import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppBar } from '@/components/AppBar/AppBar';
import { drawerWidth } from '@/styles/theme';

describe('<AppBar/>', () => {
    it('Should match snapshot', () => {
        const rendered = render(<AppBar drawerWidth={drawerWidth} />);

        expect(rendered).toMatchSnapshot();
    });
});
