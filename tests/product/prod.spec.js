import { test } from '@playwright/test';
import path from 'path';

test('product module', async ({ page }) => {

    test.slow();

    //! login to the application
    await page.goto('http://localhost:8888/');

    await page.locator('//input[@name="user_name"]').fill('admin');
    await page.locator('//input[@name="user_password"]').fill('admin');
    await page.locator('//input[@id="submitButton"]').click();

    // creation
    await page.getByRole('link', { name: 'PRODUCTS' }).first().click();

    await page.getByRole('img', { name: /Create Product/ }).click();

    await page.locator('//input[@name="productname"]').fill('abc');

    // discontinued checkbox
    let prod = page.locator('//input[@value="T"]');
    await prod.check();

    // validating
    let result = await prod.isChecked();

    if (result === true) {
        console.log('Product handler is checked');
    } else {
        console.log('Product handler is not checked');
    }

    // sales start date
    await page.locator('//input[@name="sales_start_date"]').click()

    console.log('Product created successfully');

    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover();
    await page.locator('//a[text()="Sign Out"]').click();

});