
import { test, expect } from '@playwright/test';
import { windowhandling } from '../utilies/window';

test('quote module', async ({ page }) => {

    test.slow();

    //! Login to the application
    await page.goto('http://localhost:8888/');

    await page.locator('//input[@name="user_name"]').fill('admin');
    await page.locator('//input[@name="user_password"]').fill('admin');
    await page.locator('//input[@id="submitButton"]').click();

    //! Quote creation
    await page.getByRole('link', { name: 'Quotes' }).first().click();

    await page.getByRole('img', { name: /Create Quote/ }).click();

    // Enter quote subject
    await page.locator('//input[@name="subject"]').fill('abc');

    //! Select product using popup
    const newtab = await windowhandling(
        page,
        page.locator('//img[contains(@src,"products")]').click()
    );

    await newtab.waitForLoadState('domcontentloaded');
    

    await newtab.waitForLoadState('domcontentloaded');

    // Select product
    await newtab.locator("//a[@id='popup_product_17']").click();

    // Wait for product details to populate
    await expect(page.locator('#qty1')).toBeVisible();

    //! Enter quantity
    await page.locator('#qty1').fill('2');

    //! Save quote
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click();

    //! Validation
    await page.waitForLoadState('domcontentloaded');

    const QName = await page.locator("//span[@class='lvtHeaderText']").textContent();

    if (QName && QName.includes('abc')) {
        console.log('Quote created successfully:', QName);
    } else {
        console.log('Quote not found');
    }

    //! Logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover();

    await page.getByRole('link', { name: 'Sign Out' }).click();

});
