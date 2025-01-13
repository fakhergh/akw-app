import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AppBar } from '@/components/AppBar/AppBar';
import { drawerWidth } from '@/styles/theme';

describe('<AppBar/>', () => {
    it('Should match snapshot', () => {
        const rendered = render(<AppBar drawerWidth={drawerWidth} />);

        expect(rendered).toMatchSnapshot();
    });

    it('Should toggle open', () => {
        const toggleMenu = vi.fn();

        render(
            <AppBar drawerWidth={drawerWidth} onMenuButtonClick={toggleMenu} />,
        );

        const menuButton = screen.getByTestId('menu-button');

        fireEvent.click(menuButton);

        expect(toggleMenu).toBeCalled();
    });
});
