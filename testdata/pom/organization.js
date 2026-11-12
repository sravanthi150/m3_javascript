
export class Organization {

    constructor(page) {
        this.page = page;

        this.organizationLink = page.getByRole('link', { name: 'ORGANIZATIONS' });

        this.createOrganization = page.getByRole('img', { name: 'Create Organization' });

        this.orgName = page.locator('//input[name="account_name"]');
        this.website = page.locator('//input[name="website"]');
        this.employees = page.locator('//input[name="employees"]');

        this.saveButton = page.locator('input[title="Save"]');
    }
    async createOrg(data) {

    await this.organizationLink.first().click();

    await this.createOrganization.click();

    await this.page.waitForTimeout(2000);

    console.log('Current URL:', this.page.url());

    console.log('Page title:', await this.page.title());

    console.log('Account name count:',
        await this.page.locator('input[name="account_name"]').count());

    console.log('Accountname count:',
        await this.page.locator('input[name="accountname"]').count());
}
    
    
}
