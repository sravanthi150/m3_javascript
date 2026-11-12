
import { test } from '@playwright/test';
import { Login } from '../../testdata/Logindata.js';
import { Leads } from '../../testdata/pom/leads.js';
import { leaddata } from '../../testdata/leaddata.js';

test('Create Multiple Leads', async ({ page }) => {

    let loginobj = new Login(page);

    await loginobj.actions('admin', 'admin');

    let leadobj = new Leads(page);

    for (let data of leaddata) {

        await leadobj.leadmethod();

        await leadobj.createlead(data);

        await leadobj.validations(data.lastname);

    }

});
