import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'kotani-pay/3.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * This endpoint is used to check for the health of the application
   *
   * @summary Check for the application health
   * @throws FetchError<503, types.HealthControllerCheckResponse503> The Health Check is not successful
   */
  healthController_check(): Promise<FetchResponse<200, types.HealthControllerCheckResponse200>> {
    return this.core.fetch('/health', 'get');
  }

  /**
   * This endpoint will help you create an integrator
   *
   * @summary Create an integrator
   * @throws FetchError<400, types.IntegratorControllerCreateIntegratorResponse400>
   * @throws FetchError<401, types.IntegratorControllerCreateIntegratorResponse401>
   */
  integratorController_createIntegrator(body: types.IntegratorControllerCreateIntegratorBodyParam): Promise<FetchResponse<200, types.IntegratorControllerCreateIntegratorResponse200>> {
    return this.core.fetch('/api/v3/integrator', 'post', body);
  }

  /**
   * This endpoint is used to retrieve an integrator details
   *
   * @summary Get an Integrator Details.
   * @throws FetchError<400, types.IntegratorControllerGetIntegratorResponse400>
   * @throws FetchError<401, types.IntegratorControllerGetIntegratorResponse401>
   * @throws FetchError<404, types.IntegratorControllerGetIntegratorResponse404>
   */
  integratorController_getIntegrator(): Promise<FetchResponse<200, types.IntegratorControllerGetIntegratorResponse200>> {
    return this.core.fetch('/api/v3/integrator', 'get');
  }

  /**
   * Login to your integrator account. This endpoint allows you to login to your account
   *
   * @summary Authentication Login
   * @throws FetchError<400, types.AuthControllerAuthLoginResponse400>
   * @throws FetchError<500, types.AuthControllerAuthLoginResponse500>
   */
  authController_authLogin(body: types.AuthControllerAuthLoginBodyParam): Promise<FetchResponse<200, types.AuthControllerAuthLoginResponse200>> {
    return this.core.fetch('/api/v3/auth/login', 'post', body);
  }

  /**
   * This endpoint is used to generate an the API Key which can be used to authorize
   * transactions and more
   *
   * @summary Generate API Key.
   * @throws FetchError<400, types.AuthControllerGenerateApiKeyResponse400>
   * @throws FetchError<403, types.AuthControllerGenerateApiKeyResponse403>
   * @throws FetchError<404, types.AuthControllerGenerateApiKeyResponse404>
   * @throws FetchError<500, types.AuthControllerGenerateApiKeyResponse500>
   */
  authController_generateApiKey(): Promise<FetchResponse<200, types.AuthControllerGenerateApiKeyResponse200>> {
    return this.core.fetch('/api/v3/auth/api-key', 'get');
  }

  /**
   * This endpoint will create a fiat wallet for the integrator.
   *
   * @summary Create a Fiat Wallet
   * @throws FetchError<400, types.FiatWalletControllerCreateFiatWalletResponse400>
   * @throws FetchError<401, types.FiatWalletControllerCreateFiatWalletResponse401>
   */
  fiatWalletController_createFiatWallet(body: types.FiatWalletControllerCreateFiatWalletBodyParam): Promise<FetchResponse<200, types.FiatWalletControllerCreateFiatWalletResponse200>> {
    return this.core.fetch('/api/v3/wallet/fiat', 'post', body);
  }

  /**
   * This endpoint will return all the fiat wallets created by the integrator.
   *
   * @summary Get Integrator Fiat Wallets
   * @throws FetchError<401, types.FiatWalletControllerGetUsersFiatWalletResponse401>
   */
  fiatWalletController_getUsersFiatWallet(): Promise<FetchResponse<200, types.FiatWalletControllerGetUsersFiatWalletResponse200>> {
    return this.core.fetch('/api/v3/wallet/fiat', 'get');
  }

  /**
   * This endpoint will return the fiat wallet created by the integrator.
   *
   * @summary Get Integrator Fiat Wallet by Wallet ID
   * @throws FetchError<401, types.FiatWalletControllerGetFiatWalletResponse401>
   * @throws FetchError<404, types.FiatWalletControllerGetFiatWalletResponse404>
   */
  fiatWalletController_getFiatWallet(metadata: types.FiatWalletControllerGetFiatWalletMetadataParam): Promise<FetchResponse<200, types.FiatWalletControllerGetFiatWalletResponse200>> {
    return this.core.fetch('/api/v3/wallet/fiat/{id}', 'get', metadata);
  }

  /**
   * This endpoint will update the fiat wallet created by the integrator.
   *
   * @summary Update Integrator Fiat Wallet by Wallet ID
   * @throws FetchError<401, types.FiatWalletControllerUpdateFiatWalletResponse401>
   * @throws FetchError<404, types.FiatWalletControllerUpdateFiatWalletResponse404>
   */
  fiatWalletController_updateFiatWallet(body: types.FiatWalletControllerUpdateFiatWalletBodyParam, metadata: types.FiatWalletControllerUpdateFiatWalletMetadataParam): Promise<FetchResponse<200, types.FiatWalletControllerUpdateFiatWalletResponse200>> {
    return this.core.fetch('/api/v3/wallet/fiat/{id}', 'patch', body, metadata);
  }

  /**
   * This endpoint will return the fiat wallet created by the integrator.
   *
   * @summary Get Integrator Fiat Wallet by Currency
   * @throws FetchError<401, types.FiatWalletControllerGetFiatWalletByCurrencyResponse401>
   * @throws FetchError<404, types.FiatWalletControllerGetFiatWalletByCurrencyResponse404>
   */
  fiatWalletController_getFiatWalletByCurrency(metadata: types.FiatWalletControllerGetFiatWalletByCurrencyMetadataParam): Promise<FetchResponse<200, types.FiatWalletControllerGetFiatWalletByCurrencyResponse200>> {
    return this.core.fetch('/api/v3/wallet/fiat/currency/{currency}', 'get', metadata);
  }

  /**
   * This endpoint will transfer the deposit balance of the fiat wallet to the main balance.
   *
   * @summary Transfer Deposit Balance
   * @throws FetchError<401, types.FiatWalletControllerTransferDepositBalanceResponse401>
   * @throws FetchError<404, types.FiatWalletControllerTransferDepositBalanceResponse404>
   */
  fiatWalletController_transferDepositBalance(body: types.FiatWalletControllerTransferDepositBalanceBodyParam): Promise<FetchResponse<200, types.FiatWalletControllerTransferDepositBalanceResponse200>> {
    return this.core.fetch('/api/v3/wallet/transfer/deposit-balance', 'post', body);
  }

  /**
   * The crypto wallet will contain the specified chain and coins an integrator desires to
   * hold and one can create as many wallets as needed.
   *
   * @summary Create a Crypto wallet
   * @throws FetchError<400, types.CryptoWalletControllerCreateCryptoWalletResponse400>
   * @throws FetchError<401, types.CryptoWalletControllerCreateCryptoWalletResponse401>
   */
  cryptoWalletController_createCryptoWallet(body: types.CryptoWalletControllerCreateCryptoWalletBodyParam): Promise<FetchResponse<200, types.CryptoWalletControllerCreateCryptoWalletResponse200>> {
    return this.core.fetch('/api/v3/wallet/crypto', 'post', body);
  }

  /**
   * This endpoint will return all the crypto wallets created by the integrator.
   *
   * @summary Get Integrator Crypto Wallets
   * @throws FetchError<401, types.CryptoWalletControllerGetUsersCryptoWalletsResponse401>
   */
  cryptoWalletController_getUsersCryptoWallets(): Promise<FetchResponse<200, types.CryptoWalletControllerGetUsersCryptoWalletsResponse200>> {
    return this.core.fetch('/api/v3/wallet/crypto', 'get');
  }

  /**
   * This endpoint will return the crypto wallet created by the integrator by passing the
   * wallet id.
   *
   * @summary Get Integrator Crypto Wallet by Wallet ID
   * @throws FetchError<401, types.CryptoWalletControllerGetFiatWalletResponse401>
   */
  cryptoWalletController_getFiatWallet(metadata: types.CryptoWalletControllerGetFiatWalletMetadataParam): Promise<FetchResponse<200, types.CryptoWalletControllerGetFiatWalletResponse200>> {
    return this.core.fetch('/api/v3/wallet/crypto/{id}', 'get', metadata);
  }

  /**
   * An integrator can use this endpoint to create the customers who will be either receiving
   * or sending money using mobile money.
   *
   * @summary Create a mobile money customer
   * @throws FetchError<400, types.MobileMoneyCustomerControllerCreateCustomerResponse400>
   * @throws FetchError<401, types.MobileMoneyCustomerControllerCreateCustomerResponse401>
   */
  mobileMoneyCustomerController_createCustomer(body: types.MobileMoneyCustomerControllerCreateCustomerBodyParam): Promise<FetchResponse<200, types.MobileMoneyCustomerControllerCreateCustomerResponse200>> {
    return this.core.fetch('/api/v3/customer/mobile-money', 'post', body);
  }

  /**
   * An integrator can use this endpoint to get all the customers who will be either
   * receiving or sending money using mobile money.
   *
   * @summary Get all mobile money customers
   * @throws FetchError<400, types.MobileMoneyCustomerControllerGetUserCustomersResponse400>
   * @throws FetchError<401, types.MobileMoneyCustomerControllerGetUserCustomersResponse401>
   * @throws FetchError<404, types.MobileMoneyCustomerControllerGetUserCustomersResponse404>
   */
  mobileMoneyCustomerController_getUserCustomers(): Promise<FetchResponse<200, types.MobileMoneyCustomerControllerGetUserCustomersResponse200>> {
    return this.core.fetch('/api/v3/customer/mobile-money', 'get');
  }

  /**
   * An integrator can use this endpoint to update the customers who will be either receiving
   * or sending money using mobile money.
   *
   * @summary Update a mobile money customer
   * @throws FetchError<401, types.MobileMoneyCustomerControllerUpdateCustomerResponse401>
   * @throws FetchError<404, types.MobileMoneyCustomerControllerUpdateCustomerResponse404>
   */
  mobileMoneyCustomerController_updateCustomer(body: types.MobileMoneyCustomerControllerUpdateCustomerBodyParam, metadata: types.MobileMoneyCustomerControllerUpdateCustomerMetadataParam): Promise<FetchResponse<200, types.MobileMoneyCustomerControllerUpdateCustomerResponse200>> {
    return this.core.fetch('/api/v3/customer/mobile-money/{customer_key}', 'patch', body, metadata);
  }

  /**
   * An integrator can use this endpoint to get the customer who will be either receiving or
   * sending money using mobile money by passing customer key.
   *
   * @summary Get a mobile money customer by customer key
   */
  mobileMoneyCustomerController_getCustomerDetails(metadata: types.MobileMoneyCustomerControllerGetCustomerDetailsMetadataParam): Promise<FetchResponse<200, types.MobileMoneyCustomerControllerGetCustomerDetailsResponse200>> {
    return this.core.fetch('/api/v3/customer/mobile-money/{customer_key}', 'get', metadata);
  }

  /**
   * An integrator can use this endpoint to get the customer who will be either receiving or
   * sending money using mobile money by passing phone number.
   *
   * @summary Get a mobile money customer by Phone
   * @throws FetchError<401, types.MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse401>
   * @throws FetchError<404, types.MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse404>
   */
  mobileMoneyCustomerController_getCustomerDetailsByPhone(metadata: types.MobileMoneyCustomerControllerGetCustomerDetailsByPhoneMetadataParam): Promise<FetchResponse<200, types.MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse200>> {
    return this.core.fetch('/api/v3/customer/mobile-money/phone/{phone_number}', 'get', metadata);
  }

  /**
   * This api will withdraw fiat from the integrator’s fiat wallet to the customer’s mobile
   * money wallet.
   *
   * @summary Withdraw Fiat to Mobile Money
   * @throws FetchError<400, types.WithdrawControllerMobileMoneyResponse400>
   * @throws FetchError<401, types.WithdrawControllerMobileMoneyResponse401>
   */
  withdrawController_mobileMoney(body: types.WithdrawControllerMobileMoneyBodyParam): Promise<FetchResponse<200, types.WithdrawControllerMobileMoneyResponse200>> {
    return this.core.fetch('/api/v3/withdraw/mobile-money', 'post', body);
  }

  /**
   * This endpoint will return the status of the withdrawal request.
   *
   * @summary Get Withdrawal Mobile Money Status
   * @throws FetchError<401, types.WithdrawControllerGetWithdrawalStatusResponse401>
   * @throws FetchError<404, types.WithdrawControllerGetWithdrawalStatusResponse404>
   */
  withdrawController_getWithdrawalStatus(metadata: types.WithdrawControllerGetWithdrawalStatusMetadataParam): Promise<FetchResponse<200, types.WithdrawControllerGetWithdrawalStatusResponse200>> {
    return this.core.fetch('/api/v3/withdraw/status/{reference_id}', 'get', metadata);
  }

  /**
   * An integrator’s customers can initiate a deposit from their respective mobile money
   * wallets.     An STK push will be sent to the customer and the respective amount will be
   * deducted from their mobile money wallets and deposited into the integrator’s fiat wallet
   *
   * @summary Deposit via mobile money
   * @throws FetchError<400, types.DepositMobileMoneyControllerMobileMoneyResponse400>
   * @throws FetchError<401, types.DepositMobileMoneyControllerMobileMoneyResponse401>
   */
  depositMobileMoneyController_mobileMoney(body: types.DepositMobileMoneyControllerMobileMoneyBodyParam): Promise<FetchResponse<200, types.DepositMobileMoneyControllerMobileMoneyResponse200>> {
    return this.core.fetch('/api/v3/deposit/mobile-money', 'post', body);
  }

  /**
   * An integrator can use this endpoint to check the status of a deposit
   *
   * @summary Get Deposit on Mobile Money status
   * @throws FetchError<400, types.DepositMobileMoneyControllerGetWithdrawalStatusResponse400>
   * @throws FetchError<401, types.DepositMobileMoneyControllerGetWithdrawalStatusResponse401>
   * @throws FetchError<404, types.DepositMobileMoneyControllerGetWithdrawalStatusResponse404>
   */
  depositMobileMoneyController_getWithdrawalStatus(metadata: types.DepositMobileMoneyControllerGetWithdrawalStatusMetadataParam): Promise<FetchResponse<200, types.DepositMobileMoneyControllerGetWithdrawalStatusResponse200>> {
    return this.core.fetch('/api/v3/deposit/mobile-money/status/{reference_id}', 'get', metadata);
  }

  /**
   * Customer Completed transaction using Checkout Url
   *
   * @summary Deposit via bank checkout
   * @throws FetchError<400, types.DepositBankCheckoutControllerMobileMoneyResponse400>
   * @throws FetchError<401, types.DepositBankCheckoutControllerMobileMoneyResponse401>
   */
  depositBankCheckoutController_mobileMoney(body: types.DepositBankCheckoutControllerMobileMoneyBodyParam): Promise<FetchResponse<200, types.DepositBankCheckoutControllerMobileMoneyResponse200>> {
    return this.core.fetch('/api/v3/deposit/bank/checkout', 'post', body);
  }

  /**
   * An integrator can use this endpoint to check the status of a deposit
   *
   * @summary Get Deposit status
   * @throws FetchError<400, types.DepositBankCheckoutControllerGetWithdrawalStatusResponse400>
   * @throws FetchError<401, types.DepositBankCheckoutControllerGetWithdrawalStatusResponse401>
   * @throws FetchError<404, types.DepositBankCheckoutControllerGetWithdrawalStatusResponse404>
   */
  depositBankCheckoutController_getWithdrawalStatus(metadata: types.DepositBankCheckoutControllerGetWithdrawalStatusMetadataParam): Promise<FetchResponse<200, types.DepositBankCheckoutControllerGetWithdrawalStatusResponse200>> {
    return this.core.fetch('/api/v3/deposit/bank/checkout/status/{reference_id}', 'get', metadata);
  }

  /**
   * An integrator can use this endpoint to get the exchange rate between two currencies
   *
   * @summary Get exchange rate
   * @throws FetchError<401, types.RateControllerGetRatesResponse401>
   */
  rateController_getRates(metadata: types.RateControllerGetRatesMetadataParam): Promise<FetchResponse<200, types.RateControllerGetRatesResponse200>> {
    return this.core.fetch('/api/v3/rate/{from}/{to}', 'get', metadata);
  }

  /**
   * An integrator can use this endpoint to get the exchange rate between two currencies
   *
   * @summary Get Onramp Exchange rate
   * @throws FetchError<401, types.RateControllerGetOnrampRatesResponse401>
   */
  rateController_getOnrampRates(body: types.RateControllerGetOnrampRatesBodyParam): Promise<FetchResponse<200, types.RateControllerGetOnrampRatesResponse200>> {
    return this.core.fetch('/api/v3/rate/onramp', 'post', body);
  }

  /**
   * An integrator can use this endpoint to get the exchange rate between two currencies
   *
   * @summary Get Offramp Exchange rate
   * @throws FetchError<401, types.RateControllerGetOffRampRatesResponse401>
   */
  rateController_getOffRampRates(body: types.RateControllerGetOffRampRatesBodyParam): Promise<FetchResponse<200, types.RateControllerGetOffRampRatesResponse200>> {
    return this.core.fetch('/api/v3/rate/offramp', 'post', body);
  }

  /**
   * An integrator can use this endpoint to get the exchange rate between two fiat currencies
   *
   * @summary Get Fiat to Fiat exchange rate
   * @throws FetchError<401, types.RateControllerGetFiatToFiatRateResponse401>
   */
  rateController_getFiatToFiatRate(body: types.RateControllerGetFiatToFiatRateBodyParam): Promise<FetchResponse<200, types.RateControllerGetFiatToFiatRateResponse200>> {
    return this.core.fetch('/api/v3/rate/fiat', 'post', body);
  }

  /**
   * An integrator can use this endpoint to get all the exchange rates available
   *
   * @summary Get all exchange rates
   * @throws FetchError<401, types.RateControllerRatesResponse401>
   */
  rateController_rates(): Promise<FetchResponse<200, types.RateControllerRatesResponse200>> {
    return this.core.fetch('/api/v3/rate', 'get');
  }

  /**
   * This Api Handles fetching of payment providers
   *
   * @summary Get Payment Providers
   */
  paymentProviderController_providers(body: types.PaymentProviderControllerProvidersBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/v3/providers', 'post', body);
  }

  /**
   * This Api Handles payout to bank, currently only supports SA Banks
   *
   * @summary BANK WITHDRAWAL
   * @throws FetchError<400, types.WithdrawTransactionControllerMobileMoneyResponse400>
   * @throws FetchError<401, types.WithdrawTransactionControllerMobileMoneyResponse401>
   */
  withdrawTransactionController_mobileMoney(body: types.WithdrawTransactionControllerMobileMoneyBodyParam): Promise<FetchResponse<200, types.WithdrawTransactionControllerMobileMoneyResponse200>> {
    return this.core.fetch('/api/v3/withdraw/v2/bank', 'post', body);
  }

  /**
   * This Api Handles payout to bank, currently only supports SA Banks
   *
   * @summary BANK WITHDRAWAL STATUS
   */
  withdrawTransactionController_getWithdrawTransaction(metadata: types.WithdrawTransactionControllerGetWithdrawTransactionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/v3/withdraw/v2/bank/status/{referenceId}', 'get', metadata);
  }

  /**
   * This Api Handles fetching of supporting banks
   *
   * @summary GET SUPPORTING BANKS
   */
  withdrawSupportedBanksController_getSupportingBanks(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/v3/withdraw/v2/bank/supporting-banks', 'get');
  }

  /**
   * This api will create a new kyc basic details
   *
   * @summary Create Kyc Basic Details
   */
  kycController_createKyc(body: types.KycControllerCreateKycBodyParam): Promise<FetchResponse<200, types.KycControllerCreateKycResponse200>> {
    return this.core.fetch('/api/v3/kyc', 'post', body);
  }

  /**
   * This api will create a new kyc address
   *
   * @summary Create Kyc Address
   */
  kycController_createAddress(body: types.KycControllerCreateAddressBodyParam): Promise<FetchResponse<200, types.KycControllerCreateAddressResponse200>> {
    return this.core.fetch('/api/v3/kyc/address', 'post', body);
  }

  /**
   * This api will create a new kyc document
   *
   * @summary Create Kyc Document
   */
  kycController_createDocument(body: types.KycControllerCreateDocumentBodyParam): Promise<FetchResponse<200, types.KycControllerCreateDocumentResponse200>> {
    return this.core.fetch('/api/v3/kyc/document', 'post', body);
  }

  /**
   * This api will get kyc status
   *
   * @summary Get Kyc Status
   */
  kycController_verifyKyc(metadata: types.KycControllerVerifyKycMetadataParam): Promise<FetchResponse<200, types.KycControllerVerifyKycResponse200>> {
    return this.core.fetch('/api/v3/kyc/status/{kycId}', 'get', metadata);
  }

  /**
   * This api will get all integrator kyc users
   *
   * @summary Get Integrator Kyc Users
   * @throws FetchError<401, types.KycControllerIntegratorKycUsersResponse401>
   */
  kycController_integratorKycUsers(): Promise<FetchResponse<200, types.KycControllerIntegratorKycUsersResponse200>> {
    return this.core.fetch('/api/v3/kyc/integrator/users', 'get');
  }

  /**
   * NB: This API is Deprecated. Please use /offramp endpoint. This endpoint will create a
   * request for off ramp and returns escrow address from which the integrator will send
   * funds to.The request id generated will be used in /onchain/mobile-money api
   *
   * @summary Generate Off Ramp Request
   * @throws FetchError<400, types.OfframpMobileMoneyControllerOnchainRequestResponse400>
   * @throws FetchError<401, types.OfframpMobileMoneyControllerOnchainRequestResponse401>
   */
  offrampMobileMoneyController_onchainRequest(body: types.OfframpMobileMoneyControllerOnchainRequestBodyParam): Promise<FetchResponse<200, types.OfframpMobileMoneyControllerOnchainRequestResponse200>> {
    return this.core.fetch('/api/v3/offramp/crypto-to-fiat/mobile-money/request', 'post', body);
  }

  /**
   * NB: This endpoint is deprecated.Please use /offramp endpoint.  This endpoint will
   * withdraw from crypto transaction details you provided  into customer mobile money wallet
   *
   * @summary Send customer fiat from your crypto wallet
   * @throws FetchError<400, types.OfframpMobileMoneyControllerOnchainResponse400>
   * @throws FetchError<401, types.OfframpMobileMoneyControllerOnchainResponse401>
   */
  offrampMobileMoneyController_onchain(body: types.OfframpMobileMoneyControllerOnchainBodyParam): Promise<FetchResponse<200, types.OfframpMobileMoneyControllerOnchainResponse200> | FetchResponse<201, types.OfframpMobileMoneyControllerOnchainResponse201>> {
    return this.core.fetch('/api/v3/offramp/crypto-to-fiat/mobile-money', 'post', body);
  }

  /**
   * NB: This endpoint is deprecated. Please use /offramp endpoint.  This endpoint will
   * return the status of the withdrawal request.
   *
   * @summary Get Offramp MobileMoney Status
   * @throws FetchError<401, types.OfframpMobileMoneyControllerGetWithdrawalStatusResponse401>
   * @throws FetchError<404, types.OfframpMobileMoneyControllerGetWithdrawalStatusResponse404>
   */
  offrampMobileMoneyController_getWithdrawalStatus(metadata: types.OfframpMobileMoneyControllerGetWithdrawalStatusMetadataParam): Promise<FetchResponse<200, types.OfframpMobileMoneyControllerGetWithdrawalStatusResponse200>> {
    return this.core.fetch('/api/v3/offramp/crypto-to-fiat/mobile-money/status/{reference_id}', 'get', metadata);
  }

  /**
   * This endpoint will return all the chains and coins that are supported by off ramp
   *
   * @summary Off Ramp Supported Chains
   * @throws FetchError<401, types.OfframpMobileMoneyControllerSupportedChainsResponse401>
   */
  offrampMobileMoneyController_supportedChains(): Promise<FetchResponse<200, types.OfframpMobileMoneyControllerSupportedChainsResponse200>> {
    return this.core.fetch('/api/v3/offramp/crypto-to-fiat/supported-chains', 'get');
  }

  /**
   * This endpoint will create a offramp request for a customer
   *
   * @summary Offramp to Mobile Money
   * @throws FetchError<400, types.OffRampControllerCreateOfframpResponse400>
   * @throws FetchError<401, types.OffRampControllerCreateOfframpResponse401>
   */
  offRampController_createOfframp(body: types.OffRampControllerCreateOfframpBodyParam): Promise<FetchResponse<200, types.OffRampControllerCreateOfframpResponse200>> {
    return this.core.fetch('/api/v3/offramp', 'post', body);
  }

  /**
   * This endpoint will return the status of the withdrawal request.
   *
   * @summary Get Offramp MobileMoney Status
   * @throws FetchError<401, types.OffRampControllerGetOfframpStatusResponse401>
   * @throws FetchError<404, types.OffRampControllerGetOfframpStatusResponse404>
   */
  offRampController_getOfframpStatus(metadata: types.OffRampControllerGetOfframpStatusMetadataParam): Promise<FetchResponse<200, types.OffRampControllerGetOfframpStatusResponse200>> {
    return this.core.fetch('/api/v3/offramp/{referenceId}', 'get', metadata);
  }

  /**
   * Api is Deprecated, user /onramp api by Passing MobileMoney Object.Crypto deposits are
   * where a customer’s mobile money wallet account is deducted a specific fiat amount which
   * is then converted to a specified stablecoin amount and sent to the integrator’s crypto
   * wallet. From there, the money/ stablecoin is transferred to the customer’s public
   * address that matches the chain. This can also be called on-ramp
   *
   * @summary Onramp Mobile Money to Crypto
   * @throws FetchError<400, types.OnrampMobileMoneyControllerOnchainResponse400>
   * @throws FetchError<401, types.OnrampMobileMoneyControllerOnchainResponse401>
   * @throws FetchError<404, types.OnrampMobileMoneyControllerOnchainResponse404>
   */
  onrampMobileMoneyController_onchain(body: types.OnrampMobileMoneyControllerOnchainBodyParam): Promise<FetchResponse<200, types.OnrampMobileMoneyControllerOnchainResponse200>> {
    return this.core.fetch('/api/v3/onramp/fiat-to-crypto/mobile-money', 'post', body);
  }

  /**
   * This API is deprecated, use /onramp/<referenceId>  This endpoint will be used to get the
   * status of the deposit onchain request
   *
   * @summary Get Onramp Status
   * @throws FetchError<400, types.OnrampMobileMoneyControllerGetWithdrawalStatusResponse400>
   * @throws FetchError<401, types.OnrampMobileMoneyControllerGetWithdrawalStatusResponse401>
   * @throws FetchError<404, types.OnrampMobileMoneyControllerGetWithdrawalStatusResponse404>
   */
  onrampMobileMoneyController_getWithdrawalStatus(metadata: types.OnrampMobileMoneyControllerGetWithdrawalStatusMetadataParam): Promise<FetchResponse<200, types.OnrampMobileMoneyControllerGetWithdrawalStatusResponse200>> {
    return this.core.fetch('/api/v3/onramp/fiat-to-crypto/mobile-money/status/{reference_id}', 'get', metadata);
  }

  /**
   * This endpoint will be used to get the supported chains for deposit onchain
   *
   * @summary Get Onramp MobileMoney Supported Chains
   * @throws FetchError<400, types.OnrampMobileMoneyControllerGetSupportedChainsResponse400>
   * @throws FetchError<401, types.OnrampMobileMoneyControllerGetSupportedChainsResponse401>
   */
  onrampMobileMoneyController_getSupportedChains(): Promise<FetchResponse<200, types.OnrampMobileMoneyControllerGetSupportedChainsResponse200>> {
    return this.core.fetch('/api/v3/onramp/supported-chains', 'get');
  }

  /**
   * NB: Api Is Deprecated, kindly use /onramp Api without passing Bank or MobileMoney
   * objects.  This api give you the opportunity to withdraw from your kotanipay fiat wallet
   * to a crypto address
   *
   * @summary Send from Fiat Wallet to Crypto Wallet
   * @throws FetchError<400, types.OnrampFiatWalletControllerOnchainWalletWithdrawalResponse400>
   * @throws FetchError<401, types.OnrampFiatWalletControllerOnchainWalletWithdrawalResponse401>
   */
  onrampFiatWalletController_onchainWalletWithdrawal(body: types.OnrampFiatWalletControllerOnchainWalletWithdrawalBodyParam): Promise<FetchResponse<200, types.OnrampFiatWalletControllerOnchainWalletWithdrawalResponse200> | FetchResponse<201, types.OnrampFiatWalletControllerOnchainWalletWithdrawalResponse201>> {
    return this.core.fetch('/api/v3/onramp/fiat-to-crypto/wallet', 'post', body);
  }

  /**
   * NB: Api Is Deprecated, kindly use /onramp/<reference_id>. This api give you the
   * opportunity to check transaction status of onchain/wallet withdrawal
   *
   * @summary Get transaction status
   */
  onrampFiatWalletController_onchainWalletWithdrawalStatus(metadata: types.OnrampFiatWalletControllerOnchainWalletWithdrawalStatusMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/v3/onramp/fiat-to-crypto/wallet/status/{reference_id}', 'get', metadata);
  }

  /**
   * This endpoint will send token to any crypto wallet
   *
   * @summary Send Token to Crypto Wallet
   * @throws FetchError<400, types.OnrampControllerCreateOnrampCryptoResponse400>
   * @throws FetchError<401, types.OnrampControllerCreateOnrampCryptoResponse401>
   */
  onrampController_createOnrampCrypto(body: types.OnrampControllerCreateOnrampCryptoBodyParam): Promise<FetchResponse<200, types.OnrampControllerCreateOnrampCryptoResponse200>> {
    return this.core.fetch('/api/v3/onramp/crypto', 'post', body);
  }

  /**
   * This endpoint will be used to get the status of the transaction
   *
   * @summary Get Status Response
   * @throws FetchError<400, types.OnrampControllerGetOnrampCryptoResponse400>
   * @throws FetchError<401, types.OnrampControllerGetOnrampCryptoResponse401>
   * @throws FetchError<404, types.OnrampControllerGetOnrampCryptoResponse404>
   */
  onrampController_getOnrampCrypto(metadata: types.OnrampControllerGetOnrampCryptoMetadataParam): Promise<FetchResponse<200, types.OnrampControllerGetOnrampCryptoResponse200>> {
    return this.core.fetch('/api/v3/onramp/crypto/{referenceId}', 'get', metadata);
  }

  /**
   * You can create an onramp request with either mobile money or bank checkout
   *
   * @summary Create Onramp
   * @throws FetchError<400, types.OnrampControllerOnrampResponse400>
   * @throws FetchError<401, types.OnrampControllerOnrampResponse401>
   */
  onrampController_onramp(body: types.OnrampControllerOnrampBodyParam): Promise<FetchResponse<200, types.OnrampControllerOnrampResponse200>> {
    return this.core.fetch('/api/v3/onramp', 'post', body);
  }

  /**
   * This endpoint will be used to get the status of the transaction
   *
   * @summary Get Status Response
   * @throws FetchError<400, types.OnrampControllerGetOnrampResponse400>
   * @throws FetchError<401, types.OnrampControllerGetOnrampResponse401>
   * @throws FetchError<404, types.OnrampControllerGetOnrampResponse404>
   */
  onrampController_getOnramp(metadata: types.OnrampControllerGetOnrampMetadataParam): Promise<FetchResponse<200, types.OnrampControllerGetOnrampResponse200>> {
    return this.core.fetch('/api/v3/onramp/{referenceId}', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AuthControllerAuthLoginBodyParam, AuthControllerAuthLoginResponse200, AuthControllerAuthLoginResponse400, AuthControllerAuthLoginResponse500, AuthControllerGenerateApiKeyResponse200, AuthControllerGenerateApiKeyResponse400, AuthControllerGenerateApiKeyResponse403, AuthControllerGenerateApiKeyResponse404, AuthControllerGenerateApiKeyResponse500, CryptoWalletControllerCreateCryptoWalletBodyParam, CryptoWalletControllerCreateCryptoWalletResponse200, CryptoWalletControllerCreateCryptoWalletResponse400, CryptoWalletControllerCreateCryptoWalletResponse401, CryptoWalletControllerGetFiatWalletMetadataParam, CryptoWalletControllerGetFiatWalletResponse200, CryptoWalletControllerGetFiatWalletResponse401, CryptoWalletControllerGetUsersCryptoWalletsResponse200, CryptoWalletControllerGetUsersCryptoWalletsResponse401, DepositBankCheckoutControllerGetWithdrawalStatusMetadataParam, DepositBankCheckoutControllerGetWithdrawalStatusResponse200, DepositBankCheckoutControllerGetWithdrawalStatusResponse400, DepositBankCheckoutControllerGetWithdrawalStatusResponse401, DepositBankCheckoutControllerGetWithdrawalStatusResponse404, DepositBankCheckoutControllerMobileMoneyBodyParam, DepositBankCheckoutControllerMobileMoneyResponse200, DepositBankCheckoutControllerMobileMoneyResponse400, DepositBankCheckoutControllerMobileMoneyResponse401, DepositMobileMoneyControllerGetWithdrawalStatusMetadataParam, DepositMobileMoneyControllerGetWithdrawalStatusResponse200, DepositMobileMoneyControllerGetWithdrawalStatusResponse400, DepositMobileMoneyControllerGetWithdrawalStatusResponse401, DepositMobileMoneyControllerGetWithdrawalStatusResponse404, DepositMobileMoneyControllerMobileMoneyBodyParam, DepositMobileMoneyControllerMobileMoneyResponse200, DepositMobileMoneyControllerMobileMoneyResponse400, DepositMobileMoneyControllerMobileMoneyResponse401, FiatWalletControllerCreateFiatWalletBodyParam, FiatWalletControllerCreateFiatWalletResponse200, FiatWalletControllerCreateFiatWalletResponse400, FiatWalletControllerCreateFiatWalletResponse401, FiatWalletControllerGetFiatWalletByCurrencyMetadataParam, FiatWalletControllerGetFiatWalletByCurrencyResponse200, FiatWalletControllerGetFiatWalletByCurrencyResponse401, FiatWalletControllerGetFiatWalletByCurrencyResponse404, FiatWalletControllerGetFiatWalletMetadataParam, FiatWalletControllerGetFiatWalletResponse200, FiatWalletControllerGetFiatWalletResponse401, FiatWalletControllerGetFiatWalletResponse404, FiatWalletControllerGetUsersFiatWalletResponse200, FiatWalletControllerGetUsersFiatWalletResponse401, FiatWalletControllerTransferDepositBalanceBodyParam, FiatWalletControllerTransferDepositBalanceResponse200, FiatWalletControllerTransferDepositBalanceResponse401, FiatWalletControllerTransferDepositBalanceResponse404, FiatWalletControllerUpdateFiatWalletBodyParam, FiatWalletControllerUpdateFiatWalletMetadataParam, FiatWalletControllerUpdateFiatWalletResponse200, FiatWalletControllerUpdateFiatWalletResponse401, FiatWalletControllerUpdateFiatWalletResponse404, HealthControllerCheckResponse200, HealthControllerCheckResponse503, IntegratorControllerCreateIntegratorBodyParam, IntegratorControllerCreateIntegratorResponse200, IntegratorControllerCreateIntegratorResponse400, IntegratorControllerCreateIntegratorResponse401, IntegratorControllerGetIntegratorResponse200, IntegratorControllerGetIntegratorResponse400, IntegratorControllerGetIntegratorResponse401, IntegratorControllerGetIntegratorResponse404, KycControllerCreateAddressBodyParam, KycControllerCreateAddressResponse200, KycControllerCreateDocumentBodyParam, KycControllerCreateDocumentResponse200, KycControllerCreateKycBodyParam, KycControllerCreateKycResponse200, KycControllerIntegratorKycUsersResponse200, KycControllerIntegratorKycUsersResponse401, KycControllerVerifyKycMetadataParam, KycControllerVerifyKycResponse200, MobileMoneyCustomerControllerCreateCustomerBodyParam, MobileMoneyCustomerControllerCreateCustomerResponse200, MobileMoneyCustomerControllerCreateCustomerResponse400, MobileMoneyCustomerControllerCreateCustomerResponse401, MobileMoneyCustomerControllerGetCustomerDetailsByPhoneMetadataParam, MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse200, MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse401, MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse404, MobileMoneyCustomerControllerGetCustomerDetailsMetadataParam, MobileMoneyCustomerControllerGetCustomerDetailsResponse200, MobileMoneyCustomerControllerGetUserCustomersResponse200, MobileMoneyCustomerControllerGetUserCustomersResponse400, MobileMoneyCustomerControllerGetUserCustomersResponse401, MobileMoneyCustomerControllerGetUserCustomersResponse404, MobileMoneyCustomerControllerUpdateCustomerBodyParam, MobileMoneyCustomerControllerUpdateCustomerMetadataParam, MobileMoneyCustomerControllerUpdateCustomerResponse200, MobileMoneyCustomerControllerUpdateCustomerResponse401, MobileMoneyCustomerControllerUpdateCustomerResponse404, OffRampControllerCreateOfframpBodyParam, OffRampControllerCreateOfframpResponse200, OffRampControllerCreateOfframpResponse400, OffRampControllerCreateOfframpResponse401, OffRampControllerGetOfframpStatusMetadataParam, OffRampControllerGetOfframpStatusResponse200, OffRampControllerGetOfframpStatusResponse401, OffRampControllerGetOfframpStatusResponse404, OfframpMobileMoneyControllerGetWithdrawalStatusMetadataParam, OfframpMobileMoneyControllerGetWithdrawalStatusResponse200, OfframpMobileMoneyControllerGetWithdrawalStatusResponse401, OfframpMobileMoneyControllerGetWithdrawalStatusResponse404, OfframpMobileMoneyControllerOnchainBodyParam, OfframpMobileMoneyControllerOnchainRequestBodyParam, OfframpMobileMoneyControllerOnchainRequestResponse200, OfframpMobileMoneyControllerOnchainRequestResponse400, OfframpMobileMoneyControllerOnchainRequestResponse401, OfframpMobileMoneyControllerOnchainResponse200, OfframpMobileMoneyControllerOnchainResponse201, OfframpMobileMoneyControllerOnchainResponse400, OfframpMobileMoneyControllerOnchainResponse401, OfframpMobileMoneyControllerSupportedChainsResponse200, OfframpMobileMoneyControllerSupportedChainsResponse401, OnrampControllerCreateOnrampCryptoBodyParam, OnrampControllerCreateOnrampCryptoResponse200, OnrampControllerCreateOnrampCryptoResponse400, OnrampControllerCreateOnrampCryptoResponse401, OnrampControllerGetOnrampCryptoMetadataParam, OnrampControllerGetOnrampCryptoResponse200, OnrampControllerGetOnrampCryptoResponse400, OnrampControllerGetOnrampCryptoResponse401, OnrampControllerGetOnrampCryptoResponse404, OnrampControllerGetOnrampMetadataParam, OnrampControllerGetOnrampResponse200, OnrampControllerGetOnrampResponse400, OnrampControllerGetOnrampResponse401, OnrampControllerGetOnrampResponse404, OnrampControllerOnrampBodyParam, OnrampControllerOnrampResponse200, OnrampControllerOnrampResponse400, OnrampControllerOnrampResponse401, OnrampFiatWalletControllerOnchainWalletWithdrawalBodyParam, OnrampFiatWalletControllerOnchainWalletWithdrawalResponse200, OnrampFiatWalletControllerOnchainWalletWithdrawalResponse201, OnrampFiatWalletControllerOnchainWalletWithdrawalResponse400, OnrampFiatWalletControllerOnchainWalletWithdrawalResponse401, OnrampFiatWalletControllerOnchainWalletWithdrawalStatusMetadataParam, OnrampMobileMoneyControllerGetSupportedChainsResponse200, OnrampMobileMoneyControllerGetSupportedChainsResponse400, OnrampMobileMoneyControllerGetSupportedChainsResponse401, OnrampMobileMoneyControllerGetWithdrawalStatusMetadataParam, OnrampMobileMoneyControllerGetWithdrawalStatusResponse200, OnrampMobileMoneyControllerGetWithdrawalStatusResponse400, OnrampMobileMoneyControllerGetWithdrawalStatusResponse401, OnrampMobileMoneyControllerGetWithdrawalStatusResponse404, OnrampMobileMoneyControllerOnchainBodyParam, OnrampMobileMoneyControllerOnchainResponse200, OnrampMobileMoneyControllerOnchainResponse400, OnrampMobileMoneyControllerOnchainResponse401, OnrampMobileMoneyControllerOnchainResponse404, PaymentProviderControllerProvidersBodyParam, RateControllerGetFiatToFiatRateBodyParam, RateControllerGetFiatToFiatRateResponse200, RateControllerGetFiatToFiatRateResponse401, RateControllerGetOffRampRatesBodyParam, RateControllerGetOffRampRatesResponse200, RateControllerGetOffRampRatesResponse401, RateControllerGetOnrampRatesBodyParam, RateControllerGetOnrampRatesResponse200, RateControllerGetOnrampRatesResponse401, RateControllerGetRatesMetadataParam, RateControllerGetRatesResponse200, RateControllerGetRatesResponse401, RateControllerRatesResponse200, RateControllerRatesResponse401, WithdrawControllerGetWithdrawalStatusMetadataParam, WithdrawControllerGetWithdrawalStatusResponse200, WithdrawControllerGetWithdrawalStatusResponse401, WithdrawControllerGetWithdrawalStatusResponse404, WithdrawControllerMobileMoneyBodyParam, WithdrawControllerMobileMoneyResponse200, WithdrawControllerMobileMoneyResponse400, WithdrawControllerMobileMoneyResponse401, WithdrawTransactionControllerGetWithdrawTransactionMetadataParam, WithdrawTransactionControllerMobileMoneyBodyParam, WithdrawTransactionControllerMobileMoneyResponse200, WithdrawTransactionControllerMobileMoneyResponse400, WithdrawTransactionControllerMobileMoneyResponse401 } from './types';
