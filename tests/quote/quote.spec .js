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
        let sheet =await book.getWorksheet('quote')
        // /convert Excel rows into an array of objects
        let Quotes = []
        for(let row = 2; row<= sheet.rowCount; row++) {
    let subject=sheet.getRow(row).getCell(1).text.trim();
    let itemname=sheet.getRow(row).getCell(2).text.trim();
    let qty=sheet.getRow(row).getCell(3).text.trim();
    Quotes.push({
        subject,
        itemname,
        qty
        
    });
    }
    console.log(Quotes);
// Pass multiple test data
for (let quote of Quotes) {
    await page.getByRole('link', { name: 'Quotes' }).first().click();
    await page.getByRole('img', { name: /Create Quote/ }).click();
     await page.locator('//input[@name="subject"]').fill(quote.subject);


}
})