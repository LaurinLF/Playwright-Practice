//En este file vamos a realizar los test de la siguiente web: https://ultimateqa.com/automation
import { test, expect, Page } from '@playwright/test';
const dataset = JSON.parse(JSON.stringify(require("../Utils/utils-data.json")));


test.skip("Ultimate QA - Verify link to new tab and assert title", async ({ browser }) => {
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
//Este queda comentado ya que tiene un captcha de imagenes que no se puede resolver
/*test("Ultimate QA - UpClick Form and CAPTCHA", async ({ page, browser }) => {
    await page.goto("https://forms.clickup.com/2314027/p/f/26ktb-6387/56LKNUZ9BDYXSC73SY/unlock-your-automation-potentialwitha-free-framework-assessment");
    await page.locator('[data-test="form__body-item__Name"]').getByPlaceholder('Enter text').click();
    await page.locator('[data-test="form__body-item__Name"]').getByPlaceholder('Enter text').fill('laurin test');
    await page.getByPlaceholder('Enter email').fill('laurines@test.com');
    await page.locator('[data-test="form__body-item__Role"]').getByPlaceholder('Enter text').fill('Queti');
    await page.locator('[data-test="form__body-item__Company Name"]').getByPlaceholder('Enter text').fill('Wonderland');
    await page.locator('[data-test="select__dropdown__toggle"]').click();
    await page.getByText('Test automation optimization').click();
    await page.getByPlaceholder('Please include all').click();
    await page.getByPlaceholder('Please include all').fill('Me identifico como un mensaje');
    await page.pause();
    // intentemos acceder al CAPTCHA del mal
    const frameSelector = 'iframe[src*="recaptcha"]';
    await page.waitForSelector(frameSelector);//esperamos
    const frameHandle = await page.$(frameSelector);
    if (!frameHandle) {
        console.error('reCAPTCHA iframe not found');
        await browser.close();
        return;
    }
    const frame = await frameHandle.contentFrame();//tenemos que tener un frame para acceder al iframe
    if (!frame) {
        console.error('Unable to access content frame of reCAPTCHA iframe');
        await browser.close();
        return;
    }
    // Hacemos clickete en el reCAPTCHA iframe
    const checkboxSelector = '.recaptcha-checkbox-border';
    await frame.waitForSelector(checkboxSelector);
    await frame.click(checkboxSelector);
    await page.locator("button[data-test='form__submit-btn']").click();

});*/
test.skip("Ultimate QA - filling-out-forms", async ({ page }) => {
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
test("Sample Application Lifecycle - Sprint 1", async ({ page }) => {
    
    await page.goto("https://ultimateqa.com/sample-application-lifecycle-sprint-1/");
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(dataset[0].name);
    await page.locator("//input[@type='submit']").click();
});
test("Sample Application Lifecycle - Sprint 2", async ({ page }) => {
    
    await page.goto("https://ultimateqa.com/sample-application-lifecycle-sprint-2/");
    await page.waitForSelector('input[name="firstname"]');
    await page.locator('input[name="firstname"]').fill(dataset[0].name);
    await page.locator("input[name=lastname]").fill(dataset[0].lastname);
    await page.locator("//input[@type='submit']").click();
});
test("Sample Application Lifecycle - Sprint 3", async ({ page }) => {
    
    await page.goto("https://ultimateqa.com/sample-application-lifecycle-sprint-3/");
    await page.waitForSelector('input[name="firstname"]');
    await page.locator("input[value='other']").click();
    await page.locator('input[name="firstname"]').fill(dataset[0].name);
    await page.locator("input[name=lastname]").fill(dataset[0].lastname);
    await page.locator("//input[@type='submit']").click();
});
test("Sample Application Lifecycle - Sprint 4", async ({ page }) => {
    
    await page.goto("https://ultimateqa.com/sample-application-lifecycle-sprint-4/");
    await page.waitForSelector('input[name="firstname"]');
    await page.locator("(//input[@value='other'])[1]").click();
    await page.locator('(//input[@name="firstname"])[1]').fill(dataset[0].name);
    await page.locator("(//input[@name='lastname'])[1]").fill(dataset[0].lastname);
    await page.locator("(//input[@value='female'])[2]").click();
    await page.locator('//input[@id="f2"]').fill(dataset[1].name);
    await page.locator("(//input[@name='lastname'])[2]").fill(dataset[1].lastname);
    await page.locator("(//input[@type='submit'])[2]").click();
});



