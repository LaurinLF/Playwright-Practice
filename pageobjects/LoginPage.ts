import {test, expect, Page, Locator} from '@playwright/test';
const dataset = JSON.parse(JSON.stringify(require("../Utils/utils-data.json")));

// aca escribimos la logica del login
export class LoginPage
{
    page: Page;
    userName: Locator;
    password: Locator;
    signInBtn: Locator;
    succesSignIn: Locator;

    constructor(page: Page){ //en constructor colocamos los locatos que luego vamos a reemplazar en el codigo donde manejamos la logica para que quede mas prolijo todo. 
        this.page = page;
        this.userName = page.locator("//input[@placeholder='Ingresá tu e-mail']");
        this.password = page.locator("input[name='password']");
        this.signInBtn = page.locator("//span[text()='Entrar']");
        this.succesSignIn = page.locator("//h6[text()='Hola Laura!']");
     

    }
    async Login()
    {// pa que rellene el form del login traemos la info default del JSON
        await this.userName.fill(dataset[3].naturaUsername);
        await this.password.fill(dataset[3].natuaraPassword);
        await this.page.waitForLoadState();
    }
    async goToLogin (){
        await this.page.goto("https://www.naturacosmeticos.com.ar/login");
    
    }
    async signInButton (){
        await this.signInBtn.click();
        await this.signInBtn.waitFor();
    }
    async verifySuccesfullLoginIn(){
            if (this.succesSignIn) {
              await this.succesSignIn.waitFor();//esperamos a que cargue
              const text = await this.succesSignIn.innerText();//almacenamos el nombre del user logueado
        
              if (text.includes("Hola Laura!")) {
                console.log("User logueado correctamente");
              } else {
                console.error(
                  "No se encontro el user correcto."
                );
              }
            }
    }
}

module.exports = {LoginPage}// exportamos