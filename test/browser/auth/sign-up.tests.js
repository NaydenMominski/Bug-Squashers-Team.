const { expect } = require('chai');
const { setupDriver } = require('../../../utils/setup-driver');
const ui = require('../../../utils/ui');

const async = require('../../../utils/async');

describe('Items routes', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    const appUrl = 'http://localhost:3004/auth/sign-up';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        return driver.get(appUrl);
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('Valid create many items', () => {
        it('expect to create user', () => {
            return async()
            .then(() => ui.setValue('input[name="username"]', 'testuser'))
            .then(() => ui.setValue('input[name="password"]', 'test12345'))
            .then(() => ui.setValue('input[name="password2"]', 'test12345'))
            .then(() => ui.click('input[value="Submit"]'))
            .then(() => ui.setValue('input[name="username"]', 'testuser'))
            .then(() => ui.setValue('input[name="password"]', 'test12345'))
            .then(() => ui.click('input[value="Login"]'));
        });
    });
});
