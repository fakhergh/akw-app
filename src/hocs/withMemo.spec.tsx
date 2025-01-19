import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { describe, expect, it } from 'vitest';

import { withMemo } from '@/hocs/withMemo';

function TestComponent({ count }: { count: number }) {
    const [renders, setRenders] = useState(0);

    useEffect(() => {
        setRenders((prev) => prev + 1);
    }, [count]);

    return (
        <div>
            <span>Renders: {renders}</span>
            <span>Count: {count}</span>
        </div>
    );
}

const MemoizedTestComponent = withMemo(TestComponent);

describe('withMemo HOC', () => {
    it('Should not re-render the component with the same props', () => {
        const { rerender, getByText } = render(
            <MemoizedTestComponent count={0} />,
        );

        const rendersCount = getByText(/Renders/);
        expect(rendersCount).toHaveTextContent('Renders: 1');

        rerender(<MemoizedTestComponent count={0} />);
        expect(rendersCount).toHaveTextContent('Renders: 1');
    });

    it('should re-render the component when props change', () => {
        const { rerender, getByText } = render(
            <MemoizedTestComponent count={0} />,
        );

        const rendersCount = getByText(/Renders/);

        expect(rendersCount).toHaveTextContent('Renders: 1');

        rerender(<MemoizedTestComponent count={1} />);

        expect(rendersCount).toHaveTextContent('Renders: 2');
    });
});
