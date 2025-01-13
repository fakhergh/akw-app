import { describe, expect, it } from 'vitest';

import { pascalCase } from '@/utils/formatter';

const input = 'joe';
const output = 'Joe';

describe('Formatter', () => {
    it('should capitalize text', () => {
        expect(pascalCase(input)).toEqual(output);
    });
});
