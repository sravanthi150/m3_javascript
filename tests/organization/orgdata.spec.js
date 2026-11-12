
import { test } from '@playwright/test';
import { Login } from '../../testdata/pom/login.js';
import { Organization } from '../../testdata/pom/organization.js';
import { orgdata } from './orgdata.js';

test('Organization with POM', async ({ page }) => {

    test.slow();

    // Login
    const login = new Login(page);
    await login.loginToApp();

    // Create organization using POM
    const organization = new Organization(page);

    for (let org of orgdata) {

        console.log('Creating organization:', org.orgname);

        await organization.createOrg(org);

        console.log('Organization created:', org.orgname);
    }
});
