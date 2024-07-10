import { test, expect, Page, Locator } from '@playwright/test';
const dataset = JSON.parse(JSON.stringify(require("../Utils/utils-data.json")));

export class CartPage {
    page: Page;
    cart: Locator;
    cartProducts: Locator;
    productName: string;
    buyBtn: Locator;
    userAddress: Locator;
    provincia: Locator;
    localidad: Locator;
    barrio: Locator;
    cp: Locator;
    address: Locator;
    houseNumber: Locator;
    houseReference: Locator;
    addressNick: Locator;
    nombreEntrega: Locator;
    phonenumber: Locator;
    mainAddressCheck: Locator;
    saveAddress: Locator;
    deleteCartBtn: Locator;
    verifyAddress: Locator;
    deleteAddressBtn: Locator;
    cnfBtn: Locator;
    cfmDeletAddress: Locator;
    cfmDeleteCart: Locator;  
    
    

    constructor(page: Page) { //en constructor siempre colocamos los locators/
        this.page = page;
        this.cart = page.locator("//span[text()='Mi carrito']");
        this.cartProducts = page.getByText("Crema Hidratante Corporal Kaiak");//no me deja traerlo con otro locator, solo getByText dammit
        this.productName = dataset[3].productName;
        this.buyBtn = page.locator("//span[text()='Finalizar compra']");
        this.userAddress = page.locator("//h6[text()='Añadir nueva dirección']");
        this.provincia = page.locator("//div[@id='react-select-2-placeholder']");
        this.localidad = page.locator("//input[@id='react-select-3-input']");
        this.barrio = page.locator("input[value='CABALLITO']");
        this.cp = page.locator("input[name='postalCode']");
        this.address = page.locator("input[name='address']");
        this.houseNumber = page.locator("input[name='houseNumber']");
        this.houseReference = page.locator("input[name='referencePoint']");
        this.addressNick = page.locator("input[name='addressNickname']");
        this.nombreEntrega = page.locator("input[name='recipientName']");
        this.phonenumber = page.locator("input[name='phoneNumber']");
        this.mainAddressCheck = page.locator("input[name='mainAddress']");
        this.saveAddress = page.locator("//button[@type='submit']//span[1]");
        this.deleteCartBtn = page.locator("(//span[@class='MuiIconButton-label']//i)[3]");
        this.verifyAddress = page.locator("//h6[text()='Casita']");
        this.deleteAddressBtn = page.locator("(//span[@class='MuiIconButton-label']//i)[3]");
        this.cnfBtn = page.locator("//span[text()='Borrar']");
        this.cfmDeletAddress= page.locator("//h6[text()='Añadir nueva dirección']");
        this.cfmDeleteCart = page.locator("//h6[text()='Aún no tenés productos en tu carrito de compras']");
    }
    async verifyproduct() {
        if (this.cartProducts) {
          await this.cartProducts.waitFor();//esperamos a que cargue
          const text = await this.cartProducts.innerText();//almacenamos el titulo del producto
    
          if (text.includes(this.productName)) {
            console.log("El producto agregado al carrito es: " + text);
          } else {
            console.error(
              "El producto encontrado en el carrito no coincide con el productName del JSON"
            );
          }
        }
    }
  async buyButton(){
    await this.buyBtn.click();
  }
  async addAddress(){
    await this.userAddress.click();
    await this.provincia.click();
    await this.page.click("text='Ciudad Autónoma de Buenos Aires'");
    await this.localidad.click();
    await this.page.click("text='Ciudad Autónoma de Buenos Aires (CABALLITO)'");
    await expect(this.barrio).toHaveValue("CABALLITO");
    console.log(this.barrio);
    await this.cp.fill("1405");
    await this.address.fill(dataset[3].userAddress);
    await this.houseNumber.fill("473");
    await this.houseReference.fill("Entre calle 1 y 2");
    await this.addressNick.fill("Casita");
    await this.nombreEntrega.fill(dataset[3].userName);
    await this.phonenumber.fill(dataset[3].celular);
    await this.mainAddressCheck.click();
    await this.saveAddress.click();
  }
  async addressReview(){
    await this.page.goto("https://www.naturacosmeticos.com.ar/revision");
    await expect(this.verifyAddress).toHaveText("Casita");
  }
  async deleteAddress(){
    await this.deleteAddressBtn.click();
    await this.cnfBtn.click();
    await expect(this.cfmDeletAddress).toHaveText("Añadir nueva dirección");
  }
  async vaciarCarrito(){
    await this.deleteCartBtn.click();
    await expect(this.cfmDeleteCart).toHaveText("Aún no tenés productos en tu carrito de compras");
  }
}

module.exports = { CartPage };

