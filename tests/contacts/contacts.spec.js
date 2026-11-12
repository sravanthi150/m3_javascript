import {test} from '@playwright/test'


test('contact module',async ({page}) => {
    test.slow()
    //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.click('//input[@id="submitButton"]')
    // creating the contact module
    await page.getByRole('link',{name:"Contacts"}).click()
    await page.getByRole('img',{name:"Create Contact..."}).click()
    await page.locator('//input[@name="firstname"]').fill('Messa')
    await page.locator('//input[@name="lastname"]').fill('sravanthi')
    await page.locator('//input[@name="reference"]').check()
    await page.locator('//input[@name="imagename"]').setInputFiles('tests/contacts/contacts.spec.js')
    await page.locator('//input[@name="mailingcity"]').fill('hyderabad')
    // await page.getByRole('button',{name:'Save' }).click()
    await page.setDefaultTimeout(30000)
    // validating 
    let city = await page.locator('//input[@name="mailingcity"]').fill('hyderabad')
    if(city == ('telangana')){
        console.log("city created successfully");
    }
    else{
        console.log("city is not created");
    }
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()


})