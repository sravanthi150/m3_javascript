export class Login{
   #username 
   #password
   #loginbutton
   constructor(page){
    this.page=page
    this.#username = page.locator('//input[@name="user_name"]')
    this.#password = page.locator('//input[@name="user_password"]')
    this.#loginbutton = page.locator('//input[@id="submitButton"]')
   }
   async loginToApp() {
     await this.page.goto('http://localhost:8888');
   
   
       await this.#username.fill('admin');
       await this.#password.fill('admin');
       await this.#loginbutton.click();
   }
}