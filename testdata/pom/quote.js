import { expect } from '@playwright/test';

export class Quote {

    constructor(page) {
        this.page = page;

        // Quotes module
        this.quoteLink = page.locator('//a[contains(@href,"Quotes")]');

        // Create Quote button
        this.createQuoteButton = page.locator(
            '//img[contains(@title,"Create") or contains(@alt,"Create")]'
        );

        // Quote details
        this.subject = page.locator('//input[@name="subject"]');
        this.validTill = page.locator('//input[@name="validtill"]');
        this.quoteStage = page.locator('//select[@name="quotestage"]');

        this.saveButton = page.locator('//input[@title="Save"]');
        this.header = page.locator('//span[@class="dvHeaderText"]');
    }
async createQuoteMethod() {

    console.log('Current URL:', this.page.url());

    console.log(
        'Quote link count:',
        await this.page.locator('a').filter({ hasText: /quotes/i }).count()
    );

    console.log(
        await this.page.locator('body').innerText()
    );
}
async createQuoteDetails(data) {

    console.log('Current URL:', this.page.url());

    console.log('Page title:', await this.page.title());

    console.log('Subject locator count:', await this.subject.count());

    console.log('Available input fields:');

    console.log(
        await this.page.locator('input').evaluateAll(inputs =>
            inputs.map(input => ({
                name: input.name,
                id: input.id,
                title: input.title,
                type: input.type
            }))
        )
    );
}
async validations(data) {

    console.log('Current URL:', this.page.url());

    console.log('Page title:', await this.page.title());

    console.log('Page text:');

    console.log(
        (await this.page.locator('body').innerText()).substring(0, 2000)
    );
}
   
}