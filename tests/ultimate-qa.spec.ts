//En este file vamos a realizar los test de la siguiente web: https://ultimateqa.com/automation
import {test, expect} from '@playwright/test';


test("Ultimate QA", async ({browser}) =>
    {
        const context = await browser.newContext();
        // Create a new page in the context
        const page = await context.newPage();
        await page.goto("https://ultimateqa.com/automation");
    });