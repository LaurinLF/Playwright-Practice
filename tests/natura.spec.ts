import { test, expect, Page } from '@playwright/test';
import { DashboardPage } from '../pageobjects/DashboardPage';
import { CartPage } from '../pageobjects/CartPage';
import { LoginPage } from '../pageobjects/LoginPage';
const dataset = JSON.parse(JSON.stringify(require("../Utils/utils-data.json")));


test("jugando con Natura - Sales Products", async ({page})=>{
    const dashboardPage = new DashboardPage(page);
    //const cartPage = new CartPage(page);
    await dashboardPage.goTo();
    await dashboardPage.acceptCookies();
    await dashboardPage.salesMenu();
    await dashboardPage.searchProductAndAddToCart();//agregamos producto al carrito
    const cartPage = await dashboardPage.navigateToCart();// vamos al carrito para verificar si esta el producto 
    await cartPage.verifyproduct();
});
test("Jugando con Natura - LoginPage", async ({page})=>
{
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goToLogin();
    await dashboardPage.acceptCookies();
    await loginPage.Login();
    await loginPage.signInButton();
    await loginPage.verifySuccesfullLoginIn();
});
test.only("Jugando con Natura - Carrito y orden de compra", async ({page})=>
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