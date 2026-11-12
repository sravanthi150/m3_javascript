const { expect } = require('@playwright/test');

class Opportunities {

    constructor(page) {
        this.page = page;

        this.opportunityLink = page.getByRole('link', { name: 'OPPORTUNITIES' });

        this.createOpportunity = page.getByRole('img', {name: 'Create Opportunity...' });

        this.opportunityName = page.locator( '//input[@name="potentialname"]');

        this.saveButton = page.locator('//input[@title="Save"]');

        this.header = page.locator('//span[@class="dvHeaderText"]' );
    }

    async createOpportunityDetails(data) {

        await this.opportunityLink.click();

        await this.createOpportunity.click();

        await this.opportunityName.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.opportunityName.fill(data.opportunityname);

        await this.saveButton.click();

        await expect(this.header).toContainText( data.opportunityname);
    }
}

module.exports = Opportunities;