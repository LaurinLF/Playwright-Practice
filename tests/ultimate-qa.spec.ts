//En este file vamos a realizar los test de la siguiente web: https://ultimateqa.com/automation
import { test, expect, Page } from '@playwright/test';
const dataset = JSON.parse(JSON.stringify(require("../Utils/utils-data.json")));

test("Ultimate QA - Verify link to new tab and assert title", async ({ browser }) => {
    // Create a new page in the context
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://ultimateqa.com/automation");
    const webTitle = await page.locator(".et_pb_text_inner").locator('#Automation_Practice');
    expect(webTitle).toContainText("Automation Practice");
    await page.locator('.et_pb_menu__logo-wrap').click();
    await page.getByText("SCHEDULE A FREE DISCOVERY SESSION").nth(0).click();
    await context.waitForEvent("page");// con esto hacemos que espere a que el evento que dispara el nuevo tab, temrine.(esto siempre sobre el contexto que creamos.)
    //hacemos click en el link y esperamos la nueva tab que se abra
    context.on('page', async page => {
        await page.waitForSelector(".name");
        console.log(await page.url());
        await expect(page).toHaveTitle('Push Higher Quality Software To Market Faster!');
    });//Este es el contexto y las acciones que queremos dentro de la nueva tab
    await expect(page).toHaveTitle("Homepage - Ultimate QA");


});

test.only("Ultimate QA - filling-out-forms", async ({ page }) => {
    await page.goto("https://ultimateqa.com/filling-out-forms/");
    const captchaText = await page.textContent('.et_pb_contact_captcha_question');
    if (captchaText) {
        // Extraigo los números randoms del captcha
        const captchaNums = captchaText.match(/\d+/g); //Me dejo el machete para futuro: buscar todas las ocurrencias de una expresión regular en una cadena de texto (captchaText)
        //el match devuelve un array con estos dos valores: ["12", "4"].
        if (captchaNums && captchaNums.length === 2) {
            const [num1, num2] = captchaNums.map(Number);//buscamos dentro del array
            // Calculo la respuesta (o eso intento)
            const captchaAnswer = num1 + num2;
            console.log(`Resultado del captcha: ${captchaAnswer}`);
            // Completo el form
            await page.fill('#et_pb_contact_name_1', 'Laurin Test');
            await page.fill('#et_pb_contact_message_1', 'Test1');
            await page.fill('input[name="et_pb_contact_captcha_1"]', captchaAnswer.toString());//lo hago string
            //await page.waitForTimeout(3000); Hora no me retes // Espero el resultado (esto es chanchada)
        } else {
            console.error('No estas trayendo los numeros del captcha nena');
        }
    } else {
        console.error('No te funca nada');
    }
});