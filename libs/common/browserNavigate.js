class BrowserNavigate {
    /**
     * a method to navigate to a google sheet by id
     */
    async navigateToGoogleSheet(spreadsheetId, sheetId) {
        await browser.url(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=${sheetId}`)
    }

    async navigateToTwoStepVerification() {
        await browser.url('https://myaccount.google.com/signinoptions/two-step-verification')
    }

}

export default new BrowserNavigate()