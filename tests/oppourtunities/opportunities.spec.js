
const { test } = require('@playwright/test');
test('Check vTiger Home Page', async ({ page }) => {
    await page.goto('http://localhost:8888/index.php?action=index&module=Home');
    console.log('Page URL:', page.url());
    console.log('Page title:', await page.title());

    console.log('Page content:', (await page.locator('body').innerText()).substring(0, 2000));

    await page.screenshot({
        path: 'vtiger-home.png',
        fullPage: true
    });

    await page.pause();

});
