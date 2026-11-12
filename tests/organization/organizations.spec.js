import {test} from '@playwright/test'


test('organization module',async ({page}) => {
    test.slow()
    //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.click('//input[@id="submitButton"]')
    //! creating the organizationg
    await page.getByRole('link',{name:'ORGANIZATIONS'}).click()
    await page.getByRole('img',{name:'Create Organization'}).click()
    await page.locator('//input[@name="accountname"]').fill('sales')
    await page.locator(' //input[@name="website"]').fill('www.amazon.in')
    await page.locator('//input[@id="phone"]').fill('123456')
    await page.locator('//input[@name="employees"]').fill('rama')
    await page.locator('//select[@name="industry"]').selectOption({index:4})
    // validating the organization
    let organization=await page.locator('//input[@name="accountname"]').inputValue()
    if (organization.includes('sales')){
        console.log("organization is entered successfully");

    }
    else{
        console.log("organization is not entered");
    }
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()




})