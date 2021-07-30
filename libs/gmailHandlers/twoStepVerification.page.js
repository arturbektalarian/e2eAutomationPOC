import fs from 'fs'
import codes from '../common/codes.json'
const PATH_FOR_CODES = './libs/common/codes.json'

class TwoStepVerification {
    /**
     * define selectors
     */
    get inputPassword () { return $(`[type='password']`) }
    get btnPasswordNext () { return $('#passwordNext') }
    get btnShowCodes () { return $(`//span[text()='Show codes']`) }
    get btnGetNewCodes () { return $(`//span[text()='Get new codes']`) }
    get btnOkOnPopUp () { return $(`(//span[text()='OK'])[2]`) }
    get textCodeElements () { return $$(`//table//tr/td/span[2]`) }

    /**
     * define methods
     */
    async generateNewCodes(password) {
        if(typeof(password) === 'undefined')
            password = process.env.PASSWORD
        
        await (await this.inputPassword).waitForDisplayed()
        await (await this.inputPassword).setValue(password)
        await (await this.btnPasswordNext).click()
        await (await this.btnShowCodes).waitForDisplayed()
        await (await this.btnShowCodes).click()
        await (await this.btnGetNewCodes).waitForDisplayed()
        try {
            const allCodes =  await this.textCodeElements
            await allCodes[0].waitForDisplayed()
            await allCodes.forEach(async (code, i) => {
                codes[`${await i + 1}`].code = await code.getText()
                codes[`${await i + 1}`].status = false
            })
        } catch(err) {}
        await (await this.btnGetNewCodes).click()
        await (await this.btnOkOnPopUp).click()
        await browser.waitUntil(async () => (await (await this.textCodeElements)[9].isDisplayed()) === true)
        await (await this.textCodeElements)[9].waitForDisplayed()
    }

    /**
     * a method to remember all codes for a future use
     */
    async rememberCodes() {
        for(let i = 1; i <= 10; i++) {
            codes[`${i}`].code = await (await this.textCodeElements)[i-1].getText()
            codes[`${i}`].status = false
        }

        await fs.writeFileSync(PATH_FOR_CODES, JSON.stringify(codes), async (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.")
        })
    }
}

export default new TwoStepVerification();