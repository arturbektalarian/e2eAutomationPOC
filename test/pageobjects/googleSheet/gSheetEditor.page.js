import constants from "../../../libs/common/constants"

class GoogleSheet {
    /**
     * define selectors using getter methods
     */
    get containerDocsEditor () { return $('#docs-editor') };
    get btnDocsExtensionMenu () { return $('#docs-extensions-menu') }
    get btnATConnectorAddon () { return $(`//span[text()='INTERNAL DEV - EDITOR Awesome Table Connector']`) }
    get btnImportData () { return $(`//div[text()='Import data']`) }
    get loaderWaiting () { return $('.spinner.message') }
    get sideBarConent () { return $('.script-application-sidebar-content') }
    get iframeAddon () { return $('#sandboxFrame') }
    get iframeUserHtml () { return $('#userHtmlFrame') }

    /**
     * define methods
     */
    async openATConnectorAddon () {
        await (await this.btnDocsExtensionMenu).waitForDisplayed()
        await (await this.btnDocsExtensionMenu).click()
        await (await this.btnATConnectorAddon).waitForDisplayed()
        await browser.pause(constants.timeout.ONE_SECOND_TIMEOUT)
        await (await this.btnATConnectorAddon).moveTo()
        await (await this.btnATConnectorAddon).click()
        await (await this.btnImportData).click()
        await (await this.loaderWaiting).waitForDisplayed()
        await (await this.sideBarConent).waitForDisplayed()
    }
}

export default new GoogleSheet();