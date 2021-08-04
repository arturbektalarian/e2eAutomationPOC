import Page from './page';
import GmailInbox from './gmailInbox.page'
import constants from '../common/constants'
import codes from '../common/codes.json'
import fs from 'fs'
const PATH_FOR_CODES = './libs/common/codes.json'
let codeNumber
let index
let tryAnotherWay = 'Try another way'


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('#identifierId') }
    get btnNext () { return $('#identifierNext') }
    get inputPassword () { return $(`input[name='password']`) }
    get btnPwdNext () { return $('#passwordNext') }
    get textLanguage () { return $(`#lang-chooser [aria-selected='true'] span`)}

    // handle with better css or xpath
    get btnOtherOptionTooManyAttempts () { return $(`//button[text()='${tryAnotherWay}']`) }
    get btnOtherOption () { return $(`//span[text()='${tryAnotherWay}']`) }

    get btnChallengeTypeEight () { return $(`[data-challengetype='8']`)}
    get inputBackUpPin () { return $('#backupCodePin')}
    get btnNextSecondaryAuth () { return $('(//button)[1]')}

    // challenge
    get headingTextElementId () { return $('#headingText') }

    /**
     * a method to enter username and password
     * @param {string} username 
     * @param {string} password 
     */
    async loginUsernameAndPassword(username, password) {
        if(typeof(username) === 'undefined')
            username = constants.emails.TEST_1
        if(typeof(password) === 'undefined')
            password = process.env.PASSWORD
        await (await this.inputUsername).waitForDisplayed()
        if(await (await (await this.textLanguage).getText()).includes('Русский'))
            tryAnotherWay = 'Другой способ'
        await browser.pause(constants.timeout.ONE_SECOND_TIMEOUT)
        await (await this.inputUsername).setValue(username);
        await (await this.btnNext).click();
        await (await this.inputPassword).waitForDisplayed();
        await (await this.inputPassword).setValue(password);
        await (await this.btnPwdNext).click();
    }

    /**
     * a method to login into a gmail account
     * e.g. to login using username and password
     * @param {string} username 
     * @param {string} password 
     * @param {string} backupPin
     */
    async login (username, password, backupPin) {
        backupPin = process.env.AUTH_CODE
        for(let i = 1; i <= constants.TOTAL_NUMBER_OF_AUTH_CODES; i++) {
            if(i == constants.TOTAL_NUMBER_OF_AUTH_CODES && codes[`${i}`].status === true) {
                console.log('RAN OUT OF THE VALID AUTH CODE! PLEASE UPDATE THE PIN CODES.')
                process.env.AUTH_ENDED = true
            }
            if(i == constants.TOTAL_NUMBER_OF_AUTH_CODES - 1 && codes[`${i}`].status === true) {
                process.env.AUTH_ENDING = 'yes'
            }
            if(codes[`${i}`].status === false) {
                codeNumber = codes[`${i}`].code
                index = i
                process.env.AUTH_ENDING = 'no'
                i = 11
            }
        }
        if(typeof(backupPin) === 'undefined')
            backupPin = codeNumber

        await this.loginUsernameAndPassword(username, password)
        // pause to avoid google challenge by automation
        await browser.pause(constants.timeout.FIVE_SECONDS_TIMEOUT)
        if(await (await this.btnChallengeTypeEight).isDisplayed())
            await (await this.btnChallengeTypeEight).click()
        else {
            try {
                console.log('HERE IS THE ELEMENT ' + tryAnotherWay + ' lalala' + JSON.stringify(this.btnOtherOptionTooManyAttempts))
                if(await (await this.btnOtherOptionTooManyAttempts).isDisplayed()) {
                    await (await this.btnOtherOptionTooManyAttempts).click()
                    await (await this.btnChallengeTypeEight).click()
                }
                else {
                    await (await this.btnOtherOption).click();
                    await (await this.btnChallengeTypeEight).click()
                }
            } catch (err) {}
        }
        await (await this.inputBackUpPin).waitForDisplayed();
        await (await this.inputBackUpPin).setValue(backupPin);
        await (await this.btnNextSecondaryAuth).waitForDisplayed()
        // pause until second button appears
        await browser.pause(constants.timeout.ONE_SECOND_TIMEOUT)
        await (await this.btnNextSecondaryAuth).click();
        await (await GmailInbox.btnGoogleAppsMenu).waitForDisplayed(false, constants.timeout.LONG_TIMEOUT)
        codes[`${index}`].status = true
        await fs.writeFileSync(PATH_FOR_CODES, JSON.stringify(codes), async (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.")
        })
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

export default new LoginPage();
