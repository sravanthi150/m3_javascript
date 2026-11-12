
import { test } from '@playwright/test';
import { Login } from '../../testdata/pom/login.js';
import { Products } from '../../testdata/pom/products.js';
import { products } from './productdata.js';


test('Products with POM', async ({ page }) => {

    test.slow();

    // Login
    const login = new Login(page);

    await login.loginToApp();

    // Create products using POM
    const product = new Products(page);

    // Pass multiple test data
    for (let prod of products) {

        console.log('Creating product:', prod.productname);

        await product.createProductDetails(prod);

        console.log('Product created:', prod.productname);

    }

});
