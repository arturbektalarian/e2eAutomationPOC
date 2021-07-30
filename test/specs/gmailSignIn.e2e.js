import GmailInbox from  '../../libs/gmailHandlers/gmailInbox.page';
import GoogleSheet from '../pageobjects/googleSheet/gSheetEditor.page';
import BrowserNavigate from '../../libs/common/browserNavigate'
import Constants from '../../libs/common/constants'
import gSheetEditorPage from '../pageobjects/googleSheet/gSheetEditor.page';
import ConnectorAddon from '../pageobjects/googleSheet/connectorAddon.page'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000000

describe('Awesome Table Connector sheet add-on ->', () => {
    it('shoud open the connector add-on', async () => {
        await (await GmailInbox.btnGoogleAppsMenu).waitForDisplayed()
        await BrowserNavigate.navigateToGoogleSheet(
            Constants.googleSheets.allDataConnectors.SPREADSHEET_ID,
            Constants.googleSheets.allDataConnectors.SHEET_ID)
        await (await GoogleSheet.containerDocsEditor).waitForDisplayed()
        await GoogleSheet.openATConnectorAddon()
        await browser.pause(10000) // pause for demo
    });
});