// export class  Org{
//     #orgname
//     #website
//     #employees
//     constructor (page){
//         this.page=page
//         this.#orgname=page.locator('//input[@name="accountname"]')
//         this.#website=page.locator(' //input[@name="website"]')
//         this.#employees=page.locator('//input[@name="employees"]')

    
//     }
//     async launch(url){
//         await this.page.goto(url)

//     }
//     async actions(orgname,website,employees){
//          await this.#orgname.fill(orgname)
//          await this.#website.fill(website)
//          await this.#employees.fill(employees)
//     }
// }