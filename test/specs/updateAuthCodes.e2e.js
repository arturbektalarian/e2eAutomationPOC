import GmailInbox from  '../../libs/gmailHandlers/gmailInbox.page';
import TwoStepVerification from  '../../libs/gmailHandlers/twoStepVerification.page';
import Constants from '../../libs/common/constants'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000000

describe('Generate new codes', () => {
    it('should login with valid credentials', async () => {
        await (await GmailInbox.btnGoogleAppsMenu).waitForDisplayed(false, Constants.timeout.LONG_TIMEOUT)
        await browser.url('https://myaccount.google.com/signinoptions/two-step-verification')

        await TwoStepVerification.generateNewCodes()
        await TwoStepVerification.rememberCodes()
    })
})