
const { expect } = require('@playwright/test');

class Opportunities {

    constructor(page) {
        this.page = page;

        // vTiger module navigation
        this.opportunityLink = page.locator(
            '//a[contains(translate(normalize-space(.), "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"), "POTENTIALS")]'
        );

        this.createOpportunity = page.locator(
            '//img[contains(@alt, "Create Opportunity")]'
        );

        this.opportunityName = page.locator(
            '//input[@name="potentialname"]'
        );

        this.saveButton = page.locator(
            '//input[@title="Save"]'
        );

        this.header = page.locator(
            '//span[@class="dvHeaderText"]'
        );
    }

    async createOpportunityDetails(data) {

        await this.opportunityLink.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.opportunityLink.click();

        await this.createOpportunity.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.createOpportunity.click();

        await this.opportunityName.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.opportunityName.fill(data.opportunityname);

        await this.saveButton.click();

        await expect(this.header).toContainText(
            data.opportunityname
        );
    }
}

module.exports = Opportunities;
