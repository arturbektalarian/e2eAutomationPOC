import TwoStepVerification from  './twoStepVerification.page';
import BrowserNavigate from '../common/browserNavigate'
import LoginPage from './login.page'

class UpdateAuthCodes {
    async generateNewCodes(password) {
        await BrowserNavigate.navigateToTwoStepVerification()
        await TwoStepVerification.generateNewCodes(password)
        await TwoStepVerification.rememberCodes()
    }

    async generateNewCodesFromLogin(username, password) {
        await LoginPage.open()
        await LoginPage.login(username, password)
        await this.generateNewCodes(password)
    }
}

export default new UpdateAuthCodes()