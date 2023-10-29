describe('Epam Test Suite', () => {
    beforeEach( async () => {
        await browser.url("https://www.epam.com/");
        await browser.maximizeWindow();
    })

    it("Check page title", async () => {
        await expect(browser).toHaveTitle("EPAM | Software Engineering & Product Development Services");
    })

    it("Check the ability to switch Light / Dark mode", async () => {
        await $('header > div > div > section > div').click()
        await expect($('.light-mode')).toBeDisplayed()
    })
    
    it("Check the ability to switch language", async () => {
        await $('ul span > div').click();
        await $('header > div > div > ul li:nth-of-type(6) > a').click();
        await expect(browser).toHaveTitle("EPAM Ukraine - найбільша ІТ-компанія в Україні | Вакансії");
    })
    
    it("Check the policies list", async () => {
    const expectedArray = ['INVESTORS', 'OPEN SOURCE', 'COOKIE POLICY', 'PRIVACY POLICY', 'WEB ACCESSIBILITY', 'APPLICANT PRIVACY NOTICE'];
    const actualArray = [];
    await $('div.policies').scrollIntoView();
    await $$('div.policies > div ul > li').map(async el => actualArray.push(await el.getText()));
    await expect(actualArray).toEqual(expectedArray);
    });


    it("Check that allow to switch location list by region", async () => {
        const expectedRegions = ['AMERICAS', 'EMEA', 'APAC'];
        const actualRegions = [];
        await $('div.section:nth-child(16)').scrollIntoView();
        await $$('.js-tabs-controls div > a').map(async el => actualRegions.push(await el.getText()));
        await expect(actualRegions).toEqual(expectedRegions);

        await $('div.js-tabs-controls div:nth-of-type(2) > a').click();
        await expect($('.owl-item > div[data-country="belarus"]')).toBeDisplayed();
        await $('.owl-item > div[data-country="belarus"]').scrollIntoView();
        await $('.owl-item > div[data-country="belarus"]').click();
        await $('.owl-item > div[data-country="belarus"]').isSelected();
    })
    
    it("Check the search function", async () => {
        await $('button.header-search__button').click();
        const searchInput = await $("#new_form_search");
        const searchBtn = await $(".custom-search-button");

        await searchInput.setValue("AI");
        await searchBtn.click();
        
        await expect(browser).toHaveTitle("Search Our Website | EPAM");
    })

    it("Check contact form's fields validation", async () => {
        await browser.url("https://www.epam.com/about/who-we-are/contact");
        await $('div.section__wrapper > div:nth-of-type(5)').scrollIntoView();
        
        const name = await $('input[name = "user_first_name"]').getAttribute('aria-required')
        const lastName = await $('input[name = "user_last_name"]').getAttribute('aria-required')
        const email = await $('input[name = "user_email"]').getAttribute('aria-required')
        const phone = await $('input[name = "user_phone"]').getAttribute('aria-required')
        const location = await $('[name = "user_country"]').getAttribute('data-required')
        const dropdown = await $('div.dropdown-list-ui').getAttribute('data-required')
        const gdprConsent = await $('input[name="gdprConsent"]').getAttribute('aria-required')
        
        await expect(name).toEqual('true');
        await expect(lastName).toEqual('true');
        await expect(email).toEqual('true');
        await expect(phone).toEqual('true');
        await expect(location).toEqual('true');
        await expect(dropdown).toEqual('true');
        await expect(gdprConsent).toEqual('true');
    })

    it("Check that the Company logo on the header lead to the main page", async () => {
        await browser.url("https://www.epam.com/about");
        await $("header a.desktop-logo").click();
        await expect(browser).toHaveUrl("https://www.epam.com/");    
    })

   it("Check that allows to download report ", async () => {
        await browser.url("https://www.epam.com/about");
        const fs = require("fs");
        const downloadButton = await $('a[href$=".pdf"]');
        await downloadButton.scrollIntoView();
        await downloadButton.click();
        const filePath = "/Users/Iryna_Dziadura/Downloads/EPAM_Corporate_Overview_2023.pdf";
        const fileExists = await fs.existsSync(filePath);
        await expect(fileExists).toBe(true);
    })
});
