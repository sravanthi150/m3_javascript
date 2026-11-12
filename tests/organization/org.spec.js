import {test} from'@playwright/test'
import excel from 'exceljs'
import path from 'path'

test('Multiple_data',async({page}) => {
    test.slow()

        // login
        await page.goto('http://localhost:8888')
        await page.locator('//input[@name="user_name"]').fill('admin')
        await page.locator('//input[@name="user_password"]').fill('admin')
        await page.locator('//input[@id="submitButton"]').click()
        // Read Excel file
        let book = new excel.Workbook()
        await book.xlsx.readFile(path.join(__dirname,'../../testdata/crmdata.xlsx'))
        let sheet =await book.getWorksheet('org')
        // /convert Excel rows into an array of objects
        let organization = []
        for(let row = 2; row<= sheet.rowCount; row++) {
    let orgname=sheet.getRow(row).getCell(1).text.trim();
    let website=sheet.getRow(row).getCell(2).text.trim();
    let employees =sheet.getRow(row).getCell(3).text.trim();
    organization.push({
        orgname,
        website,
        employees
    });
}
console.log(organization);
//  pass multiple test data
 for(let org of organization) {
     console.log('creating org:',org.orgname);
    await page.getByRole('link',{name:'ORGANIZATIONS'}).first().click()
    await page.getByRole('img',{name:'Create Organization...'}).click()
    await page.locator('//input[@name="accountname"]').fill(String(org.orgname));
    await page.locator('//input[@name="website"]').fill(String(org.website));
    console.log(org.website);
    await page.locator('//input[@name="employees"]').fill(String(org.employees));
    await page.getByRole('button',{name:'Save '}).first().click()
     console.log('Organization created:', org.orgname);
   

    
 }
})