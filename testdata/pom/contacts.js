
const { expect } = require('@playwright/test');
class Contacts {
    constructor(page) {
        this.page = page;

        // this.contactLink = page.getByRole('link', {name: 'CONTACTS' });
        this.contactLink = page.locator('//a[contains(translate(normalize-space(.), "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"), "CONTACTS")]');
        this.createContact = page.getByRole('img', {name: 'Create Contact...' });
        this.firstName = page.locator( '//input[@name="firstname"]' );
        this.lastName = page.locator('//input[@name="lastname"]' );
        this.saveButton = page.locator('//input[@title="Save"]' );
        this.header = page.locator('//span[@class="dvHeaderText"]' );
    }

async createContactDetails(data) {

    console.log('Current URL:', this.page.url());
    console.log('Page title:', await this.page.title());
    console.log(
        'Contacts links:',
        await this.page.locator('a').evaluateAll(links =>
            links
                .filter(link =>
                    link.innerText.toUpperCase().includes('CONTACT')
                )
                .map(link => ({
                    text: link.innerText.trim(),
                    href: link.getAttribute('href')
                }))
        )
    );

    await this.contactLink.click();
    await this.createContact.click();
    await this.lastName.waitFor({
        state: 'visible',
        timeout: 15000
    });

    await this.firstName.fill(data.firstname);
    await this.lastName.fill(data.lastname);
    await this.saveButton.click();
    await expect(this.header).toContainText(
        data.firstname + ' ' + data.lastname
    );
}


    
 }


