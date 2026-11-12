
export class Products {

    constructor(page) {
        this.page = page;

        // Products module
        this.productLink = page.getByRole('link', { name: 'PRODUCTS' });
        // Create Product
        this.createProduct = page.getByRole('img', {name: /Create Product/ });

        // Product fields
        this.productName = page.locator('//input[@name="productname"]');

        this.productCode = page.locator('//input[@name="productcode"]');

        this.unitPrice = page.locator('//input[@name="unit_price"]');

        // Save button
        this.saveButton = page.locator('//input[type="submit"][name="button"]');
    }

    async createProductDetails(data) {

        await this.productLink.first().click();

        await this.createProduct.click();

        await this.productName.waitFor({
            state: 'visible'
        });

        await this.productName.fill(data.productname);

        await this.productCode.fill(data.productcode);

        await this.unitPrice.fill(String(data.unitpre));
        // await this.saveButton.click();
    }
}
