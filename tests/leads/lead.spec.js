import {test} from '@playwright/test'

test('lead module',async ({page}) => {
    test.slow()
    //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.click('//input[@id="submitButton"]')
    //! creating the lead
    await page.getByRole('link',{name:'Leads'}).click()
    await page.getByRole('img',{name:'Create Lead...'}).click()
    await page.locator('//select[@name="salutationtype"]').selectOption({value:'Ms.'})
    await page.locator('//input[@name="firstname"]').fill('meesa')
    await page.locator('//input[@name="lastname"]').fill('sravanthi')
    let name = await page.locator('//input[@name="lastname"]').inputValue()
    await page.locator('//input[@name="company"]').fill('testyanta')
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    let lastname =  await page.locator('//span[@class="dvHeaderText"]').textContent('sravanthi')
    console.log(lastname);
    //! validating the lead
    if (lastname?.includes('meesa sravanthi')) {
    console.log('lead is created');
    } else {
    console.log('lead is not created');
    }
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})