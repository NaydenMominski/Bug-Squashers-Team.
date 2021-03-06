const { expect } = require('chai');
const { setupDriver } = require('../../utils/setup-driver');
const webdriver = require('selenium-webdriver');


describe('Items routes', () => {
    let driver = null;

    const appUrl = 'http://localhost:3004';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    afterEach(() => {
        return driver.quit();
    });

    it('expect h3 with text "Search for a property for Sell"', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('h3')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('Search for a property for Sell');
                done();
            });
    });
});
