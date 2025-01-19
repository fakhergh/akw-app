import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useTotalPages } from '@/hooks/useTotalPages';

describe('useTotalPages', () => {
    const initialValue = 10;
    const nextValue = 5;

    it('Should return the same initial value as result', () => {
        const { result } = renderHook(() => useTotalPages(initialValue));

        expect(result.current).toBe(initialValue);
    });

    it('Should return the next value value as result', () => {
        const { result, rerender } = renderHook(
            ({ totalPages }: { totalPages: number }) =>
                useTotalPages(totalPages),
            {
                initialProps: {
                    totalPages: initialValue,
                },
            },
        );

        rerender({ totalPages: nextValue });

        expect(result.current).toBe(nextValue);
    });

    it('Should return update the state when the next value value is undefined', () => {
        const { result, rerender } = renderHook(
            ({ totalPages }: { totalPages?: number }) =>
                useTotalPages(totalPages),
            {
                initialProps: {
                    totalPages: initialValue as number | undefined,
                },
            },
        );

        rerender({ totalPages: undefined });

        expect(result.current).toBe(initialValue);
    });

    it('Should correctly set totalPages when next value is a number', () => {
        const { result, rerender } = renderHook(
            ({ totalPages }: { totalPages?: number }) =>
                useTotalPages(totalPages),
            {
                initialProps: { totalPages: undefined as number | undefined },
            },
        );

        expect(result.current).toBeUndefined();

        rerender({ totalPages: 8 });

        expect(result.current).toBe(8);
    });
});
