import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Drawer } from '@/components/Drawer/Drawer';
import { drawerWidth } from '@/styles/theme';

describe('<Drawer/>', () => {
    it('Should match snapshot', () => {
        const rendered = render(
            <Drawer drawerWidth={drawerWidth} items={[]} />,
        );

        expect(rendered).toMatchSnapshot();
    });
});
