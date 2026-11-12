const { test } = require('@playwright/test');
test('Check Contacts Navigation', async ({ page }) => {
    await page.goto(
        'http://localhost:8888/index.php?action=index&module=Home'
    );

    console.log('URL:', page.url());
    console.log('TITLE:', await page.title());
    console.log('PAGE CONTENT:');
    console.log(
        await page.locator('body').innerText()
    );

    console.log('CONTACT LINKS:');
    console.log(
        await page.locator('a').evaluateAll(links =>
            links.map(link => ({
                text: link.innerText.trim(),
                href: link.getAttribute('href')
            })).filter(link =>
                link.text.toUpperCase().includes('CONTACT')
            )
        )
    );

});