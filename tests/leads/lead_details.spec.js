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
let sheet =await book.getWorksheet('Sheet1')
// /convert Excel rows into an array of objects
let leads = []

for(let row = 2; row<= sheet.rowCount; row++) {
    let firstname=sheet.getRow(row).getCell(1).value
    let lastname=sheet.getRow(row).getCell(2).value
    let company =sheet.getRow(row).getCell(3).value
    leads.push({
        firstname,
        lastname,
        company
    })
}
console.log(leads);
//  pass multiple test data
 for(let lead of leads) {
     console.log('creating lead:',lead.firstname);
    await page.getByRole('link',{name:'Leads'}).first().click()
    await page.getByRole('img',{name:'Create Lead..'}).click()
    await page.locator('input[name="firstname"]').fill(lead.firstname)
    await page.locator('input[name="lastname"]').fill(lead.lastname)
    await page.locator('input[name="company"]').fill(lead.company)
    await page.getByRole('button',{name:'Save'}).first().click()
}
})