// describe('Test Suite for e-shop site', () => {
//     beforeEach(async () => {
//         await browser.url("https://demowebshop.tricentis.com/");
//         await browser.maximizeWindow();
//     })

//     let number = Math.ceil((Math.random() * 1000) + 10);
//     let email = "irynka" + number + "@test.com";
//     let password = "test" + number;
    
//     it("should allow register a User ", async () => {
        
//         await $("div.header li:nth-of-type(1) > a").click();
//         await $("#gender-female").click()
//         await $("#FirstName").click()
//         await $("#FirstName").setValue("Iryna" + number)
//         await $("#LastName").click()
//         await $("#LastName").setValue("Dziadura" + number)
//         await $("#Email").click()
//         await $("#Email").setValue(email)
//         await $("#Password").click()
//         await $("#Password").setValue(password)
//         await $("#ConfirmPassword").click()
//         await $("#ConfirmPassword").setValue("test" + number)
//         await $("#register-button").click()
//         await expect($('div.result')).toHaveText("Your registration completed")
//     })

//     it("should allow login a User ", async () => {
//         await $('a.ico-logout').click();
//         await $('a.ico-login').click()
//         await $('#Email').click()
//         await $('#Email').setValue(email)
//         await $('#Password').click();
//         await $('#Password').setValue(password)
//         await $('input[value="Log in"]').click();
//         await expect($('a.ico-logout')).toBeDisplayed();
//     })

//     it("‘Computers’ group should have 3 sub-groups with correct names", async () => {
//         const computer = await $('ul.top-menu > li:nth-of-type(2) > a');    
//         await expect(computer).toHaveText('COMPUTERS');
//         await computer.moveTo()
//         const group1 = await $("ul.top-menu > li:nth-of-type(2) li:nth-of-type(1) > a")
//         const group2 = await $("ul.top-menu > li:nth-of-type(2) li:nth-of-type(2) > a")
//         const group3 = await $("ul.top-menu > li:nth-of-type(2) li:nth-of-type(3) > a")
//         await expect(group1).toHaveText('Desktops');
//         await expect(group2).toHaveText('Notebooks');
//         await expect(group3).toHaveText('Accessories');
//     })

//     it("should allows sorting items 'Name: A to Z'", async () => {
//         const currentArray = [];
//         const BooksTab = await $("ul.top-menu > li:nth-of-type(1) > a");
//         await BooksTab.click();

//         const productGrid = await $$("div.product-grid > div > div > div.details > h2 > a");
//         for (let i = 0; i < productGrid.length; i++) {
//             currentArray.push(await productGrid[i].getText());
//         }
//         const sortedArray = currentArray.sort();

//         const sortedSiteArray = [];
//         const sortDropdown = await $("#products-orderby");
//         await sortDropdown.selectByVisibleText("Name: A to Z");
//         const productGridSorted = await $$("div.product-grid > div > div > div.details > h2 > a");
//         for (let i = 0; i < productGridSorted.length; i++) {
//             sortedSiteArray.push(await productGridSorted[i].getText());
//         }
//         expect(sortedArray).toEqual(sortedSiteArray);
//     })

//     it("should allows sorting items 'Name: Z to A", async () => {
//         const currArray = [];
//         const BooksTab = await $("ul.top-menu > li:nth-of-type(1) > a");
//         await BooksTab.click();

//         const productGrid = await $$("div.product-grid > div > div > div.details > h2 > a");
//         for (let i = 0; i < productGrid.length; i++) {
//             currArray.push(await productGrid[i].getText());
//         }
//         const sortedArray = currArray.sort().reverse()

//         const sortedSiteArray = [];
//         const sortDropdown = await $("#products-orderby");
//         await sortDropdown.selectByVisibleText("Name: Z to A");
//         const productGridSorted = await $$("div.product-grid > div > div > div.details > h2 > a");
//         for (let i = 0; i < productGridSorted.length; i++) {
//             sortedSiteArray.push(await productGridSorted[i].getText());
//         }
//         expect(sortedArray).toEqual(sortedSiteArray);
//     });

//     it("should allows changing number of items on page'", async () => {
//         const currArray = [];
//         const ApparelTab = await $("ul.top-menu > li:nth-of-type(4) > a");;
//         await ApparelTab.click();

//         const selectedOptions = await $("#products-pagesize")

//         await selectedOptions.selectByVisibleText('12');
//         let numberElPage = await $('select#products-pagesize > option[selected="selected"]')
//         const getValueFromOptions = await numberElPage.getText()
//         let num = await Number(getValueFromOptions)

//         const productGrid = await $$("div.product-grid > div > div > div.details > h2 > a");
//         for (let i = 0; i < productGrid.length; i++) {
//             currArray.push(await productGrid[i].getText());
//         }
//         const lengthOfArray = await productGrid.length
//         let result;
//         await lengthOfArray <= num ? result = true : result = false
//         expect(result).toEqual(true);
//     })

//     it("should allows adding an item to the Wishlistr", async () => {
//         await $("ul.top-menu > li:nth-of-type(4) > a").click();
//         await $("div.product-grid > div:nth-of-type(1) div.details a").click();
//         await $("#add-to-wishlist-button-5").click();
//         await $("a.ico-wishlist").click();
//         await expect($("div.wishlist-content")).toBeDisplayed();
//     })

//     it("should allows adding an item to the card", async () => {
//         const ApparelTab = await $("ul.top-menu > li:nth-of-type(4) > a");
//         await ApparelTab.click()
//         await $('input[value="Add to cart"]').click();
//         await $('#add-to-cart-button-5').click()
//         await $("a.ico-cart").click();
//         await expect($("div.order-summary-content")).toBeDisplayed(); 
//     })

//     it("should allows removing an item from the card", async () => {
//         await $("a.ico-cart").click();
//         await $('input[type="checkbox"]').click()
//         await $('input[name = "updatecart"]').click()
//         await expect($('.order-summary-content')).toHaveText('Your Shopping Cart is empty!')
//         await expect($("div.order-summary-content")).toBeDisplayed();
//     })

//     it("should allows checkout an item ", async () => {
//         const ApparelTab = await $("ul.top-menu > li:nth-of-type(4) > a");
//         await ApparelTab.click()
//         await $('input[value="Add to cart"]').click();
//         await $('#add-to-cart-button-5').click()
//         await $("a.ico-cart").click();
//         await $(".totals").scrollIntoView();
//         await $("input#termsofservice").click();
//         await $('#checkout').click()
//         await expect($('.page-title')).toBeDisplayed();
//     })

// })
