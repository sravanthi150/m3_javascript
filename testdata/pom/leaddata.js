
import { expect } from '@playwright/test';

export class Leads {

    #lead;
    #createlead;
    #salutationtype;
    #firstname;
    #lastname;
    #company;
    #save;
    #validation;

    constructor(page) {
        this.#lead = page.getByRole('link', { name: 'Leads' });
        this.#createlead = page.getByRole('img', { name: 'Create Lead...' });
        this.#salutationtype = page.locator('//select[@name="salutationtype"]');
        this.#firstname = page.locator('//input[@name="firstname"]');
        this.#lastname = page.locator('//input[@name="lastname"]');
        this.#company = page.locator('//input[@name="company"]');
        this.#save = page.locator('(//input[@title="Save [Alt+S]"])[1]');
        this.#validation = page.locator('//span[@class="dvHeaderText"]');
    }

    async leadmethod() {
        await this.#lead.first().click();
    }

    async createlead(data) {

        await this.#createlead.click();

        await this.#salutationtype.selectOption({ label: 'Ms.' });

        await this.#firstname.fill(data.firstname);
        await this.#lastname.fill(data.lastname);
        await this.#company.fill(data.company);

        await this.#save.click();
    }

    async validations(lastname) {
        await expect(this.#validation).toContainText(lastname);
    }
}
