import { test, expect, Page, Locator } from '@playwright/test';
import { CartPage } from './CartPage';

export class DashboardPage {
    cart: Locator;
    page: Page;
    productsContainer: Locator;
    clickSaleMenu: Locator;
    buyButton: Locator;
    cartIcon: Locator;



    constructor(page: Page) {
        this.page = page;
        this.cart = page.locator("//span[text()='Mi carrito']");
        this.productsContainer = page.getByText("Jabón líquido Tododia frambuesa y pimienta rosa");
        this.clickSaleMenu = page.locator("(//a[@data-testid='category-link']//p)[1]");
        this.buyButton = page.locator("//span[text()='Comprar']");
        this.cartIcon = page.locator("//button[@data-testid='basket-badge']//span[1]");

    

    }
    async goTo(){ // primero vamos al link indicado de dashboard
        await this.page.goto("https://www.naturacosmeticos.com.ar/");

    }

    async searchProductAndAddToCart() {
        await this.productsContainer.click();
        await this.buyButton.click();
    }
    async navigateToCart()
    {
        await this.cartIcon.click();
        await this.cart.click();
        return new CartPage(this.page);
    }
    async salesMenu(){
        await this.clickSaleMenu.click();
    }
    async acceptCookies() {
        await this.page.waitForSelector(".ot-sdk-container");
        await this.page.click("#onetrust-accept-btn-handler");
      }
}
module.exports = {DashboardPage};