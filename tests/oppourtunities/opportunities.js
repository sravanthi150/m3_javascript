
import { test, expect } from '@playwright/test';
import { Opportunities } from '../../testdata/pom/opportunities';

test('Opportunities with POM', async ({ page }) => {

    test.setTimeout(90000);

    // Login
    await page.goto('http://localhost:8888');

    await page.locator('//input[@name="user_name"]').fill('admin');

    await page.locator('//input[@name="user_password"]').fill('admin');

    await page.locator('//input[@name="Login"]').click();

    // Click Opportunities
    await page.getByRole('link', { name: 'OPPORTUNITIES' }).click();

    // Create Opportunity
    await page.getByRole('img', { name: 'Create Opportunity...' }).click();

    const opportunities = new Opportunities(page);

    // Test data
    const opportunityData = {
        opportunityname: 'Amazon Project',
        relatedto: 'Amazon',
        amount: 50000,
        closingdate: '2026-12-30'
    };

    await opportunities.createOpportunityDetails(opportunityData);

    // Validation
    await expect(page.locator('//span[@class="dvHeaderText"]'))
        .toContainText('Amazon Project');
});
