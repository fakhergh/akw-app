import { useEffect, useState } from 'react';

export function useTotalPages(pagesCount?: number) {
    const [totalPages, setTotalPages] = useState(pagesCount);

    useEffect(() => {
        if (typeof pagesCount === 'number') {
            setTotalPages(pagesCount);
        }
    }, [pagesCount]);

    return totalPages;
}
