import {test} from '@playwright/test'


test('oppourtunities module',async ({page}) => {
    test.slow()
    //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.click('//input[@id="submitButton"]')
    // creation of oppurtunity
    await page.getByRole('link',{name:'Opportunities'}).click()
    await page.getByRole('img',{name:'Create Opportunity...'}).click()
    await page.locator('//input[@name="potentialname"]').fill('infasta solutions')
    
    // await page.locator('//input[@id="related_to_display"]').selectOption([{value:"organizations"}])
    await page.locator('//select[@name="opportunity_type"]').selectOption([{index:2}])
    await page.locator('//select[@name="sales_stage"]').selectOption([{value:"Qualification"}])
    await page.locator('//textarea[@class="detailedViewTextBox"]').fill('hi , whats going on?')
    // validate 
    let org =await page.locator('//input[@name="potentialname"]').inputValue();
    if(org.includes('infasta solutions')){
        console.log("oppurtunities name is entered");
    }
    else{
        console.log("oppurtunities name is not entered");
    }
//! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})