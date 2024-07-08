import { test, expect, Page, Locator } from '@playwright/test';


export class SalesMenu {
    page: Page;
    clickSaleMenu: Locator;


    constructor(page: any) {
        this.page = page;
        this.clickSaleMenu = page.locator("//p[text()='Click Sale']");
    }
}

module.exports = { SalesMenu };