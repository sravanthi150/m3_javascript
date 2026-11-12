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
            let book = new excel.Workbook()
            await book.xlsx.readFile(path.join(__dirname,'../../testdata/crmdata.xlsx'))
            let sheet =await book.getWorksheet('contact')
            
 // /convert Excel rows into an array of objects
        let contacts = []
        for(let row = 2; row<= sheet.rowCount; row++) {
    let firstname=sheet.getRow(row).getCell(1).text.trim();
    let lastname=sheet.getRow(row).getCell(2).text.trim();
    let city=sheet.getRow(row).getCell(3).text.trim();
    contacts.push({
        firstname,
        lastname,
        city
        
    });
    }
console.log(contacts);
// Pass multiple test data
for (let contact of contacts) {
    await page.getByRole('link',{name:"Contacts"}).first().click()
    await page.getByRole('img',{name:"Create Contact..."}).click()
    await page.locator('//input[@name="firstname"]').fill(contact.firstname);
    await page.locator('//input[@name="lastname"]').fill(contact.lastname);
    await page.locator('//input[@name="mailingcity"]').fill(contact.city);
    await page.getByRole('button',{name:'Save '}).first().click()
     
}


    
})
