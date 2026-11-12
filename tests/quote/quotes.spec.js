import { test } from '@playwright/test';
import { Login } from '../../testdata/pom/login.js';
import { Quote } from '../../testdata/pom/quote.js';
import { quotes } from '../../testdata/quotes.js';

test('Create Multiple Quotes', async ({ page }) => {

    let loginobj = new Login(page);
    await loginobj.loginToApp();

    let quoteobj = new Quote(page);

    for (let data of quotes) {

        await quoteobj.createQuoteMethod();

        await quoteobj.createQuoteDetails(data);

        // Validation
        await quoteobj.validations(data);

        console.log(data.subject + ' created successfully');
    }
});