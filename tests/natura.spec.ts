import { test, expect, Page } from '@playwright/test';
import { DashboardPage } from '../pageobjects/DashboardPage';
import { CartPage } from '../pageobjects/CartPage';
import { LoginPage } from '../pageobjects/LoginPage';
import { da } from '@faker-js/faker';
const dataset = JSON.parse(JSON.stringify(require("../Utils/utils-data.json")));
let page: Page;//armamos variable global

test.beforeAll(async ({browser})=>{
    page = await browser.newPage();
})// en los test before y afterall 

test("jugando con Natura - Sales Products", async ({})=>{
    const dashboardPage = new DashboardPage(page);
    //const cartPage = new CartPage(page);
    await dashboardPage.goTo();
    await dashboardPage.acceptCookies();
    await dashboardPage.salesMenu();
    await dashboardPage.searchProductAndAddToCart();//agregamos producto al carrito
    const cartPage = await dashboardPage.navigateToCart();// vamos al carrito para verificar si esta el producto 
    await cartPage.verifyproduct();
});
test("Jugando con Natura - LoginPage", async ({})=>
{
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goToLogin();
    await dashboardPage.acceptCookies();
    await loginPage.Login();
    await loginPage.signInButton();
    await loginPage.verifySuccesfullLoginIn();
});
test.only("Jugando con Natura - Carrito y orden de compra", async ({})=>
{
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goToLogin();
    await dashboardPage.acceptCookies();
    await loginPage.Login();
    await loginPage.signInButton();
    await loginPage.verifySuccesfullLoginIn();
    await dashboardPage.salesMenu();
    await dashboardPage.searchProductAndAddToCart();
    const cartPage = await dashboardPage.navigateToCart();
    await cartPage.buyButton();
    await cartPage.addAddress();
});
test.afterAll("Clear Address and cart", async ({})=>
{
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    await cartPage.addressReview();
    await cartPage.deleteAddress();
    await dashboardPage.goTo();
    await dashboardPage.navigateToCart();
    await cartPage.vaciarCarrito();
    console.log("Carrito vaciado exitosamente");
}
)