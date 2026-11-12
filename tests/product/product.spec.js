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
        let sheet =await book.getWorksheet('product')

 // /convert Excel rows into an array of objects
        let products = []
        for(let row = 2; row<= sheet.rowCount; row++) {
    let productname=sheet.getRow(row).getCell(1).text.trim();
    let productsatus=sheet.getRow(row).getCell(2).text.trim();
    products.push({
        productname,
        productsatus
        
    });
}
console.log(products);
// //  pass multiple test data
// for(let product of products) {
//     await page.getByRole('link', { name: 'PRODUCTS' }).first().click();
//     await page.getByRole('img', { name: 'Create Product..' }).click();
//     await page.locator('//input[@name="productname"]').fill(product.productsname);
//     await page.locator('//input[@name="discontinued"]').fill(product.productsatus)

//     await page.getByRole('button',{name:'Save '}).first().click()
//      console.log('products created:', product.productname);
   
// Pass multiple test data
for (let product of products) {

    console.log('Creating product:', product.productname);

    await page.getByRole('link', { name: 'PRODUCTS' }).first().click();

    await page.getByRole('img', { name: 'Create Product...' }).click();

    await page.locator('//input[@name="productname"]')
        .fill(product.productname);

    await page.locator('//input[@name="discontinued"]')
        .check();

    await page.getByRole('button', { name: 'Save' }).first().click();

    console.log('Product created:', product.productname);
}




})