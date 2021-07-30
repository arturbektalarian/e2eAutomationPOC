class GmailInbox {
    /**
     * define selectors using getter methods
     */
    get btnGoogleAppsMenu () { return $(`[aria-label='Google apps']`) }

    /**
     * methods to encapsule automation code to interact with the page
     */
    async openGoogleSheet () {
        await (await this.btnGoogleAppsMenu).waitForDisplayed();
        await (await this.btnGoogleAppsMenu).click();
        // click on sheet
    }
}

export default new GmailInbox();
