//En este file vamos a realizar los test de la siguiente web: https://ultimateqa.com/automation
import { test, expect, Page } from '@playwright/test';
import exp from 'constants';
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
//Este queda comentado ya que tiene un captcha de imagenes que no se puede resolver
/*test("Ultimate QA - UpClick Form and  image CAPTCHA", async ({ page, browser }) => {
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
test("Ultimate QA - filling-out-forms", async ({ page }) => {
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
    await page.locator("//a[contains(text(),'Go to the next sprint')]").click();
});
test("Sample Application Lifecycle - Sprint 2", async ({ page }) => {

    await page.goto("https://ultimateqa.com/sample-application-lifecycle-sprint-2/");
    await page.waitForSelector('input[name="firstname"]');
    await page.locator('input[name="firstname"]').fill(dataset[0].name);
    await page.locator("input[name=lastname]").fill(dataset[0].lastname);
    await page.locator("//a[contains(text(),'Go to sprint 3')]").click();
});
test("Sample Application Lifecycle - Sprint 3", async ({ page }) => {

    await page.goto("https://ultimateqa.com/sample-application-lifecycle-sprint-3/");
    await page.waitForSelector('input[name="firstname"]');
    await page.locator("input[value='other']").click();
    await page.locator('input[name="firstname"]').fill(dataset[0].name);
    await page.locator("input[name=lastname]").fill(dataset[0].lastname);
    await page.locator("//a[contains(text(),'Go to sprint 4')]").click();
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
    await page.locator("//a[contains(text(),'Go to sprint 5')]").click();
});
test("Sample Application Lifecycle - Sprint 5", async ({ page }) => {

    await page.goto("https://ultimateqa.com/sample-application-lifecycle-sprint-5/");
    await page.waitForSelector('input[name="firstname"]');
    await page.locator("(//input[@value='female'])[1]").click();
    await page.locator('(//input[@name="firstname"])[1]').fill(dataset[0].name);
    await page.locator("(//input[@name='lastname'])[1]").fill(dataset[0].lastname);
    await page.locator("(//input[@value='female'])[2]").click();
    await page.locator('(//input[@name="firstname"])[2]').fill(dataset[1].name);
    await page.locator("(//input[@name='lastname'])[2]").fill(dataset[1].lastname);
    await page.locator("//input[@type='submit']").click();
});
test("Ultimate QA - Skills Improved", async ({ page }) => {

    await page.goto("https://ultimateqa.com/complicated-page");
    const webTitle = await page.locator("span#Skills_Improved");
    expect(webTitle).toContainText('Skills Improved:');
    const subTitle = await page.locator('span#Section_of_Buttons');
    expect(subTitle).toContainText('Section of Buttons');
    await page.locator('a.et_pb_button.et_pb_button_0').click();
    const subTitlte2 = await page.locator('//span[@id="Section_of_Random_Stuff"]');
    expect(subTitlte2).toContainText('Section of Random Stuff');
    const subSection = await page.locator('(//span[text()="Login"])[1]');
    expect(subSection).toContainText('Login');
    //Completamos el form con datos de chola
    await page.locator('(//span[text()="Login"])[1]').click();
    await page.locator("(//input[@data-original_id='name'])[1]").fill(dataset[0].name);
    await page.locator("(//input[@data-field_type='email'])[1]").fill(dataset[0].email);
    await page.locator('(//textarea[@data-field_type="text"])[1]').fill(dataset[0].message);
    //aca viene el captcha de numeritos. 
    //la expresion de $eval viene de evaluar, lit esta evaluando y ejecuta una función en el contexto del navegador (la página web) con un elemento seleccionado mediante un selector CSS. 
    const captchaText = await page.$eval("(//span[@class='et_pb_contact_captcha_question'])[1]", element => element.textContent);
    if (captchaText) {
        // misma logica que use en el otro captcha, saco los numeros.
        const numbers = captchaText.match(/\d+/g);//con el match me trae un array con lo verificado, en este caso los numeritos.
        if (numbers && numbers.length === 2) {
            const num1 = parseInt(numbers[0], 10);//convertimos el string en numereli
            const num2 = parseInt(numbers[1], 10);
            const resultado = num1 + num2;
            // coloco el resultado en el campo del captcha
            await page.fill("(//input[@class='input et_pb_contact_captcha'])[1]", resultado.toString());
            // submiteo
            await page.click("(//button[@type='submit'])[1]");
        }
    }
});
test("Ultimate QA - Login", async ({ page }) => {
    await page.goto('https://ultimateqa.com/complicated-page#Section_of_Random_Stuff');
    const LoginPage = await page.locator("(//span[text()='Login'])[3]");
    expect(LoginPage).toContainText("Login");
    await page.locator("(//input[@name='log'])[1]").fill(dataset[2].username);
    await page.locator("(//input[@type='password'])[1]").fill(dataset[2].password);
    //no orpimimos submit porque no hay manera de registrarse en la pagina y tampoco de verificar si colocamos datos erroneos. preguntar a Hora como abordar
    //vamos al toggle.
    await page.locator("//div[contains(@class,'et_pb_module et_pb_toggle')]//h5[1]").click();
    const toggle = await page.locator("//div[contains(@class,'et_pb_module et_pb_toggle')]//div[1]");
    expect(toggle).toContainText('Inside of toggle');
    await page.locator("(//input[@data-field_type='input'])[2]").fill(dataset[2].name);
    await page.locator("(//input[@data-field_type='email'])[2]").fill(dataset[2].email);
    await page.locator("(//textarea[@data-original_id='message'])[2]").fill(dataset[2].message);
    //otro captcha de suma mas
    const suma = await page.$eval("(//span[@class='et_pb_contact_captcha_question'])[2]", element => element.textContent);
    if (suma) {
        // misma logica que use en el otro captcha, saco los numeros.
        const numbers = suma.match(/\d+/g);//con el match me trae un array con lo verificado, en este caso los numeritos.
        if (numbers && numbers.length === 2) {
            const num1 = parseInt(numbers[0], 10);//convertimos el string en numereli
            const num2 = parseInt(numbers[1], 10);
            const resultado = num1 + num2;
            // coloco el resultado en el campo del captcha
            await page.fill("(//input[@class='input et_pb_contact_captcha'])[2]", resultado.toString());
            // submiteo
            await page.click("(//button[@class='et_pb_contact_submit et_pb_button'])[2]");
            //Nos vamos a verificar si hay 0 comentarios
            await expect(page.getByText("0 Comments").nth(1)).toBeVisible();//habia muchos 0 comments, identificamos el que queremos con el nth(1).
        }
    }
});
test('Filling out forms 2 and number captcha', async ({ page }) => {
    await page.goto("https://ultimateqa.com/filling-out-forms/");
    await page.locator("(//input[@class='input'])[1]").fill(dataset[1].name);
    await page.locator("(//textarea[@data-original_id='message'])[1]").fill(dataset[1].message1);
    await page.locator("(//button[@type='submit'])[1]").click();
    await page.locator("(//input[@class='input'])[2]").fill(dataset[0].name);
    await page.locator("#et_pb_contact_message_1").fill(dataset[0].message);
    //Hacemos un intento fallido para ver su comportamiento.
    const captchaError = await page.textContent('span.et_pb_contact_captcha_question');
    if (captchaError) {
        const correctNumbers = captchaError.match(/\d+/g);
        if (correctNumbers && correctNumbers.length === 2) {
            // const num0 = parseInt(correctNumbers[0], 10);
            // const num1 = parseInt(correctNumbers[1], 10);// no es necesario traer los numeros del primero captcha ya que siempre le voy a dar un resultado incorrecto.
            const wrongResult = "0";
            //aca coloco el resultado erroneo
            await page.fill("//input[@class='input et_pb_contact_captcha']", wrongResult.toString());
            //submiteo
            await page.click("(//button[@type='submit'])[2]");
            //verifico que este mal
            await page.waitForSelector("//li[text()='You entered the wrong number in captcha.']");
            const errorMessage = await page.locator("//li[text()='You entered the wrong number in captcha.']");//como es una lista dentro de un div, tuve que acceder directamente a la li indicandole sino no me tomaba el locator.
            expect(errorMessage).toContainText("You entered the wrong number in captcha.");
        }
    }
    //Resultado correcto del captcha
    const captchaQuestion = await page.textContent('span.et_pb_contact_captcha_question');
    if (captchaQuestion) {
        // misma logica que use en el otro captcha, saco los numeros.
        const numbers = captchaQuestion.match(/\d+/g);//con el match me trae un array con lo verificado, en este caso los numeritos// los guardo en una const.
        if (numbers && numbers.length === 2) {
            const num2 = parseInt(numbers[0], 10);//convertimos el string en numereli
            const num3 = parseInt(numbers[1], 10);
            const resultado = num2 + num3;
            // coloco el resultado en el campo del captcha
            await page.fill("//input[@class='input et_pb_contact_captcha']", resultado.toString());
            // submiteo
            await page.click("(//button[@type='submit'])[2]");
        }
    }
});
test("Simple locator by ID", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.locator("#idExample").click();
});
test("Simple locator by Classname", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.locator(".buttonClass").click();
});
test("Simple locator by Name class", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.locator("(//button[@type='submit'])[1]").click();
});
test("Simple clickeable Icon", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.locator("span.et-waypoint.et_pb_animation_top").click();
    const iconLink = await page.locator(".entry-title");
    expect(iconLink).toHaveText('Link success');//verificamos que efectivamente nos lleve al link derivado del icon
});
test("Simple Radio Buttons", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.locator("(//input[@name='gender'])[2]").click();
});
test("Simple Checkboxes", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.getByText(" Female").click();//probando otras maneras
});
test("Simple Dropdown", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.locator("//div[@class='et_pb_blurb_description']//select[1]").click();
    await page.selectOption("//div[@class='et_pb_blurb_description']//select[1]", { value: "audi" });
    const carSelected = await page.locator("//div[@class='et_pb_blurb_description']//select[1]");
    expect(carSelected).toContainText('Audi');
});
test("Tab and assertion", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.locator("//a[contains(text(),'Tab 2')]").click();
    const tab2 = page.locator("(//div[@class='et_pb_tab_content'])[2]");
    expect(tab2).toContainText('Tab 2 content');
});
// jugando con tablas de ID's plot twist: no me salio, me da todo 0. 
test.only("HTML Table with unique id", async ({ page }) => {
    await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
    await page.locator("#htmlTableId");
    const filas = page.getByRole('row');
    const count = await filas.count();
    let title = 0;
    let work = 0;
    let salary = 0;
    let exist = true;
    for (let i = 0; i < count; i++) {
        let cellText = await filas.nth(i).locator(".nowrap").locator("span").nth(1);
        let descriptionCell = await filas.nth(i).locator('.cell-with-media').locator("span");
        console.log(await cellText.allInnerTexts()); //con esto identificamos donde podria estar el error que no machea el complete con cellTexts
        if ((await cellText.allInnerTexts()).toString()  === "Software Development Engineer in Test") {
            title++;
            exist = true;
            console.log(await descriptionCell.allInnerTexts());
        } 
        if ((await cellText.allInnerTexts()).toString()  === "Automation Testing Architect") {
            work++;
            exist = true;
        }
        if ((await cellText.allInnerTexts()).toString()  === "Quality Assurance Engineer") {
            salary++;
            exist = true;
        }
    }
     // Imprimo la cantidad de filas con STATUS "Complete"
    console.log("Titulos de puestos: " +title + " Roles: " +work + " Diferencia de salarios: "+ salary);
    expect(exist,"no existen valores").toBe(true);
});