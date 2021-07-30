
class ConnectorAddon {
    /** define elements */
    get btnStripeConnector () { return $(`//span[contains(@class,'ProviderButton')]/span[text()='Stripe']`) }

    /** define methods */
}

export default new ConnectorAddon()