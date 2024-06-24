//En este archivo colocaremos todos los test basados en la web: https://demo.applitools.com/app.html
import { test, expect, chromium } from '@playwright/test';
//import { customUtils } from '../Utils/utils';744444444

test("Financial Overview check", async ({ browser }) => {
    const context = await browser.newContext();
    // Create a new page in the context
    const page = await context.newPage();
    await page.goto("https://demo.applitools.com/app.html");
    page.locator("#element-header");
    const totalBalance = await page.getByText("Total Balance").first();
    await expect(totalBalance).toBeVisible();
    // Locate the balance value element
    const totalValue = await page.getByText("350");
    await expect(totalValue).toBeVisible();
    console.log(totalValue);
});

test.only("Recent Transactions Filter", async ({ browser }) => {
    // Create a new page in the context
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://demo.applitools.com/app.html");
    // Filtro filas donde el STATUS sea "Complete"
    const row =  await page.getByRole('row');
    const rowCount = await row.count();
    console.log(rowCount);
    let completeCount = 0;
    let pendingCount = 0;
    let declinedCount = 0;
    let exist = false;
        for (let i = 0; i < rowCount; i++) {
            let cellText = await row.nth(i).locator(".nowrap").locator("span").nth(1);
            let descriptionCell = await row.nth(i).locator('.cell-with-media').locator("span");
            console.log(await cellText.allInnerTexts()); //con esto identificamos donde podria estar el error que no machea el complete con cellTexts
            if ((await cellText.allInnerTexts()).toString()  === "Complete") {
                completeCount++;
                exist = true;
                console.log(await descriptionCell.allInnerTexts());
            } 
            if ((await cellText.allInnerTexts()).toString()  === "Pending") {
                pendingCount++;
                exist = true;
            }
            if ((await cellText.allInnerTexts()).toString()  === "Declined") {
                declinedCount++;
                exist = true;
            }
        }
         // Imprimo la cantidad de filas con STATUS "Complete"
        console.log("Cantidad de filas con STATUS Complete: " +completeCount + " Cantidad de Pendings: " +pendingCount + " Cantidad de declinados: "+ declinedCount);
        expect(exist,"no existen valores").toBe(true);
    });



