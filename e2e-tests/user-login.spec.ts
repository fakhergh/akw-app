import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/auth/login');
});

test.describe('User login', () => {
    test('Should display login form title', async ({ page }) => {
        const loginTitle = page.getByRole('heading', { name: 'Login' });

        await expect(loginTitle).toBeVisible();
    });

    test('Should navigate to admin login page', async ({ page }) => {
        const loginAsAdminBtn = page.getByRole('button', {
            name: 'Login as admin',
        });

        await loginAsAdminBtn.click();

        expect(page.url()).toBe('http://localhost:3000/admin/auth/login');
    });
});
