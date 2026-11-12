import {test} from'@playwright/test'
import excel from 'exceljs'
import path from 'path'

test('Multiple_data',async({page}) => {
    test.slow(40000)

        // login
        await page.goto('http://localhost:8888')
        await page.locator('//input[@name="user_name"]').fill('admin')
        await page.locator('//input[@name="user_password"]').fill('admin')
        await page.locator('//input[@id="submitButton"]').click()
        // Read Excel file
                let book = new excel.Workbook()
                await book.xlsx.readFile(path.join(__dirname,'../../testdata/crmdata.xlsx'))
                let sheet =await book.getWorksheet('oppourtunitie')
                // convert Excel rows into an array of objects
                // convert Excel rows into an array of objects
        let oppourtunities = []
        for(let row = 2; row<= sheet.rowCount; row++) {
    let oppourtunityname=sheet.getRow(row).getCell(1).text.trim();
    let description=sheet.getRow(row).getCell(2).text.trim();
    // let salesstage=sheet.getRow(row).getCell(3).text.trim();
    
    oppourtunities.push({
        oppourtunityname,
        description
        
    });
}
console.log(oppourtunities);
//  pass multiple test data
//  for(let oppourtunity of oppourtunities) {
//      console.log('Creating opportunity:', opportunity.opportunityname);
//      await page.getByRole('link', { name: 'Opportunities' }).click();
//       await page.getByRole('img', { name: 'Create Opportunity...' }).click();

        
     
    
//     await page.locator('//input[@name="potentialname"]').fill(oppourtunity.oppourtunityname);
//      await page.locator('//textarea[@class="detailedViewTextBox"]').fill(oppourtunity.description);
//     await page.locator('//select[@name="sales_stage"]').selectOption({label:oppurtunity.salesstage});
    
//      // Save
//         await page.getByRole('button', { name: 'Save' }).first().click();

//         console.log('Opportunity created:', oppourtunity.oppourtunityname);
//         console.log('Description:', opportunity.description);
//         console.log('Sales Stage:', opportunity.salesstage);
//  }
//     // logout
//     await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover();
//     await page.locator('//a[text()="Sign Out"]').click();
    
   

    
 

// });
for (let oppourtunity of oppourtunities) {

    console.log('Creating opportunity:', oppourtunity.oppourtunityname);

    await page.getByRole('link', { name: 'Opportunities' }).first().click();
    await page.getByRole('img', { name: 'Create Opportunity...' }).click();

    await page.locator('//input[@name="potentialname"]').fill(oppourtunity.oppourtunityname);

    await page.locator('//textarea[@class="detailedViewTextBox"]').fill(oppourtunity.description);

    // await page.locator('//select[@name="sales_stage"]').selectOption({ label: oppourtunity.salesstage });

    await page.getByRole('button', { name: 'Save' }).first().click();

    console.log('Opportunity created:', oppourtunity.oppourtunityname);
    console.log('Description:', oppourtunity.description);
    
}
//  Logout (outside the loop)
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover();

    await page.getByRole('link', {
        name: 'Sign Out'
    }).click();

    console.log('All opportunities created successfully');
});