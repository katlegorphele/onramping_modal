import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type AuthControllerAuthLoginBodyParam = FromSchema<typeof schemas.AuthControllerAuthLogin.body>;
export type AuthControllerAuthLoginResponse200 = FromSchema<typeof schemas.AuthControllerAuthLogin.response['200']>;
export type AuthControllerAuthLoginResponse400 = FromSchema<typeof schemas.AuthControllerAuthLogin.response['400']>;
export type AuthControllerAuthLoginResponse500 = FromSchema<typeof schemas.AuthControllerAuthLogin.response['500']>;
export type AuthControllerGenerateApiKeyResponse200 = FromSchema<typeof schemas.AuthControllerGenerateApiKey.response['200']>;
export type AuthControllerGenerateApiKeyResponse400 = FromSchema<typeof schemas.AuthControllerGenerateApiKey.response['400']>;
export type AuthControllerGenerateApiKeyResponse403 = FromSchema<typeof schemas.AuthControllerGenerateApiKey.response['403']>;
export type AuthControllerGenerateApiKeyResponse404 = FromSchema<typeof schemas.AuthControllerGenerateApiKey.response['404']>;
export type AuthControllerGenerateApiKeyResponse500 = FromSchema<typeof schemas.AuthControllerGenerateApiKey.response['500']>;
export type CryptoWalletControllerCreateCryptoWalletBodyParam = FromSchema<typeof schemas.CryptoWalletControllerCreateCryptoWallet.body>;
export type CryptoWalletControllerCreateCryptoWalletResponse200 = FromSchema<typeof schemas.CryptoWalletControllerCreateCryptoWallet.response['200']>;
export type CryptoWalletControllerCreateCryptoWalletResponse400 = FromSchema<typeof schemas.CryptoWalletControllerCreateCryptoWallet.response['400']>;
export type CryptoWalletControllerCreateCryptoWalletResponse401 = FromSchema<typeof schemas.CryptoWalletControllerCreateCryptoWallet.response['401']>;
export type CryptoWalletControllerGetFiatWalletMetadataParam = FromSchema<typeof schemas.CryptoWalletControllerGetFiatWallet.metadata>;
export type CryptoWalletControllerGetFiatWalletResponse200 = FromSchema<typeof schemas.CryptoWalletControllerGetFiatWallet.response['200']>;
export type CryptoWalletControllerGetFiatWalletResponse401 = FromSchema<typeof schemas.CryptoWalletControllerGetFiatWallet.response['401']>;
export type CryptoWalletControllerGetUsersCryptoWalletsResponse200 = FromSchema<typeof schemas.CryptoWalletControllerGetUsersCryptoWallets.response['200']>;
export type CryptoWalletControllerGetUsersCryptoWalletsResponse401 = FromSchema<typeof schemas.CryptoWalletControllerGetUsersCryptoWallets.response['401']>;
export type DepositBankCheckoutControllerGetWithdrawalStatusMetadataParam = FromSchema<typeof schemas.DepositBankCheckoutControllerGetWithdrawalStatus.metadata>;
export type DepositBankCheckoutControllerGetWithdrawalStatusResponse200 = FromSchema<typeof schemas.DepositBankCheckoutControllerGetWithdrawalStatus.response['200']>;
export type DepositBankCheckoutControllerGetWithdrawalStatusResponse400 = FromSchema<typeof schemas.DepositBankCheckoutControllerGetWithdrawalStatus.response['400']>;
export type DepositBankCheckoutControllerGetWithdrawalStatusResponse401 = FromSchema<typeof schemas.DepositBankCheckoutControllerGetWithdrawalStatus.response['401']>;
export type DepositBankCheckoutControllerGetWithdrawalStatusResponse404 = FromSchema<typeof schemas.DepositBankCheckoutControllerGetWithdrawalStatus.response['404']>;
export type DepositBankCheckoutControllerMobileMoneyBodyParam = FromSchema<typeof schemas.DepositBankCheckoutControllerMobileMoney.body>;
export type DepositBankCheckoutControllerMobileMoneyResponse200 = FromSchema<typeof schemas.DepositBankCheckoutControllerMobileMoney.response['200']>;
export type DepositBankCheckoutControllerMobileMoneyResponse400 = FromSchema<typeof schemas.DepositBankCheckoutControllerMobileMoney.response['400']>;
export type DepositBankCheckoutControllerMobileMoneyResponse401 = FromSchema<typeof schemas.DepositBankCheckoutControllerMobileMoney.response['401']>;
export type DepositMobileMoneyControllerGetWithdrawalStatusMetadataParam = FromSchema<typeof schemas.DepositMobileMoneyControllerGetWithdrawalStatus.metadata>;
export type DepositMobileMoneyControllerGetWithdrawalStatusResponse200 = FromSchema<typeof schemas.DepositMobileMoneyControllerGetWithdrawalStatus.response['200']>;
export type DepositMobileMoneyControllerGetWithdrawalStatusResponse400 = FromSchema<typeof schemas.DepositMobileMoneyControllerGetWithdrawalStatus.response['400']>;
export type DepositMobileMoneyControllerGetWithdrawalStatusResponse401 = FromSchema<typeof schemas.DepositMobileMoneyControllerGetWithdrawalStatus.response['401']>;
export type DepositMobileMoneyControllerGetWithdrawalStatusResponse404 = FromSchema<typeof schemas.DepositMobileMoneyControllerGetWithdrawalStatus.response['404']>;
export type DepositMobileMoneyControllerMobileMoneyBodyParam = FromSchema<typeof schemas.DepositMobileMoneyControllerMobileMoney.body>;
export type DepositMobileMoneyControllerMobileMoneyResponse200 = FromSchema<typeof schemas.DepositMobileMoneyControllerMobileMoney.response['200']>;
export type DepositMobileMoneyControllerMobileMoneyResponse400 = FromSchema<typeof schemas.DepositMobileMoneyControllerMobileMoney.response['400']>;
export type DepositMobileMoneyControllerMobileMoneyResponse401 = FromSchema<typeof schemas.DepositMobileMoneyControllerMobileMoney.response['401']>;
export type FiatWalletControllerCreateFiatWalletBodyParam = FromSchema<typeof schemas.FiatWalletControllerCreateFiatWallet.body>;
export type FiatWalletControllerCreateFiatWalletResponse200 = FromSchema<typeof schemas.FiatWalletControllerCreateFiatWallet.response['200']>;
export type FiatWalletControllerCreateFiatWalletResponse400 = FromSchema<typeof schemas.FiatWalletControllerCreateFiatWallet.response['400']>;
export type FiatWalletControllerCreateFiatWalletResponse401 = FromSchema<typeof schemas.FiatWalletControllerCreateFiatWallet.response['401']>;
export type FiatWalletControllerGetFiatWalletByCurrencyMetadataParam = FromSchema<typeof schemas.FiatWalletControllerGetFiatWalletByCurrency.metadata>;
export type FiatWalletControllerGetFiatWalletByCurrencyResponse200 = FromSchema<typeof schemas.FiatWalletControllerGetFiatWalletByCurrency.response['200']>;
export type FiatWalletControllerGetFiatWalletByCurrencyResponse401 = FromSchema<typeof schemas.FiatWalletControllerGetFiatWalletByCurrency.response['401']>;
export type FiatWalletControllerGetFiatWalletByCurrencyResponse404 = FromSchema<typeof schemas.FiatWalletControllerGetFiatWalletByCurrency.response['404']>;
export type FiatWalletControllerGetFiatWalletMetadataParam = FromSchema<typeof schemas.FiatWalletControllerGetFiatWallet.metadata>;
export type FiatWalletControllerGetFiatWalletResponse200 = FromSchema<typeof schemas.FiatWalletControllerGetFiatWallet.response['200']>;
export type FiatWalletControllerGetFiatWalletResponse401 = FromSchema<typeof schemas.FiatWalletControllerGetFiatWallet.response['401']>;
export type FiatWalletControllerGetFiatWalletResponse404 = FromSchema<typeof schemas.FiatWalletControllerGetFiatWallet.response['404']>;
export type FiatWalletControllerGetUsersFiatWalletResponse200 = FromSchema<typeof schemas.FiatWalletControllerGetUsersFiatWallet.response['200']>;
export type FiatWalletControllerGetUsersFiatWalletResponse401 = FromSchema<typeof schemas.FiatWalletControllerGetUsersFiatWallet.response['401']>;
export type FiatWalletControllerTransferDepositBalanceBodyParam = FromSchema<typeof schemas.FiatWalletControllerTransferDepositBalance.body>;
export type FiatWalletControllerTransferDepositBalanceResponse200 = FromSchema<typeof schemas.FiatWalletControllerTransferDepositBalance.response['200']>;
export type FiatWalletControllerTransferDepositBalanceResponse401 = FromSchema<typeof schemas.FiatWalletControllerTransferDepositBalance.response['401']>;
export type FiatWalletControllerTransferDepositBalanceResponse404 = FromSchema<typeof schemas.FiatWalletControllerTransferDepositBalance.response['404']>;
export type FiatWalletControllerUpdateFiatWalletBodyParam = FromSchema<typeof schemas.FiatWalletControllerUpdateFiatWallet.body>;
export type FiatWalletControllerUpdateFiatWalletMetadataParam = FromSchema<typeof schemas.FiatWalletControllerUpdateFiatWallet.metadata>;
export type FiatWalletControllerUpdateFiatWalletResponse200 = FromSchema<typeof schemas.FiatWalletControllerUpdateFiatWallet.response['200']>;
export type FiatWalletControllerUpdateFiatWalletResponse401 = FromSchema<typeof schemas.FiatWalletControllerUpdateFiatWallet.response['401']>;
export type FiatWalletControllerUpdateFiatWalletResponse404 = FromSchema<typeof schemas.FiatWalletControllerUpdateFiatWallet.response['404']>;
export type HealthControllerCheckResponse200 = FromSchema<typeof schemas.HealthControllerCheck.response['200']>;
export type HealthControllerCheckResponse503 = FromSchema<typeof schemas.HealthControllerCheck.response['503']>;
export type IntegratorControllerCreateIntegratorBodyParam = FromSchema<typeof schemas.IntegratorControllerCreateIntegrator.body>;
export type IntegratorControllerCreateIntegratorResponse200 = FromSchema<typeof schemas.IntegratorControllerCreateIntegrator.response['200']>;
export type IntegratorControllerCreateIntegratorResponse400 = FromSchema<typeof schemas.IntegratorControllerCreateIntegrator.response['400']>;
export type IntegratorControllerCreateIntegratorResponse401 = FromSchema<typeof schemas.IntegratorControllerCreateIntegrator.response['401']>;
export type IntegratorControllerGetIntegratorResponse200 = FromSchema<typeof schemas.IntegratorControllerGetIntegrator.response['200']>;
export type IntegratorControllerGetIntegratorResponse400 = FromSchema<typeof schemas.IntegratorControllerGetIntegrator.response['400']>;
export type IntegratorControllerGetIntegratorResponse401 = FromSchema<typeof schemas.IntegratorControllerGetIntegrator.response['401']>;
export type IntegratorControllerGetIntegratorResponse404 = FromSchema<typeof schemas.IntegratorControllerGetIntegrator.response['404']>;
export type KycControllerCreateAddressBodyParam = FromSchema<typeof schemas.KycControllerCreateAddress.body>;
export type KycControllerCreateAddressResponse200 = FromSchema<typeof schemas.KycControllerCreateAddress.response['200']>;
export type KycControllerCreateDocumentBodyParam = FromSchema<typeof schemas.KycControllerCreateDocument.body>;
export type KycControllerCreateDocumentResponse200 = FromSchema<typeof schemas.KycControllerCreateDocument.response['200']>;
export type KycControllerCreateKycBodyParam = FromSchema<typeof schemas.KycControllerCreateKyc.body>;
export type KycControllerCreateKycResponse200 = FromSchema<typeof schemas.KycControllerCreateKyc.response['200']>;
export type KycControllerIntegratorKycUsersResponse200 = FromSchema<typeof schemas.KycControllerIntegratorKycUsers.response['200']>;
export type KycControllerIntegratorKycUsersResponse401 = FromSchema<typeof schemas.KycControllerIntegratorKycUsers.response['401']>;
export type KycControllerVerifyKycMetadataParam = FromSchema<typeof schemas.KycControllerVerifyKyc.metadata>;
export type KycControllerVerifyKycResponse200 = FromSchema<typeof schemas.KycControllerVerifyKyc.response['200']>;
export type MobileMoneyCustomerControllerCreateCustomerBodyParam = FromSchema<typeof schemas.MobileMoneyCustomerControllerCreateCustomer.body>;
export type MobileMoneyCustomerControllerCreateCustomerResponse200 = FromSchema<typeof schemas.MobileMoneyCustomerControllerCreateCustomer.response['200']>;
export type MobileMoneyCustomerControllerCreateCustomerResponse400 = FromSchema<typeof schemas.MobileMoneyCustomerControllerCreateCustomer.response['400']>;
export type MobileMoneyCustomerControllerCreateCustomerResponse401 = FromSchema<typeof schemas.MobileMoneyCustomerControllerCreateCustomer.response['401']>;
export type MobileMoneyCustomerControllerGetCustomerDetailsByPhoneMetadataParam = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetCustomerDetailsByPhone.metadata>;
export type MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse200 = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetCustomerDetailsByPhone.response['200']>;
export type MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse401 = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetCustomerDetailsByPhone.response['401']>;
export type MobileMoneyCustomerControllerGetCustomerDetailsByPhoneResponse404 = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetCustomerDetailsByPhone.response['404']>;
export type MobileMoneyCustomerControllerGetCustomerDetailsMetadataParam = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetCustomerDetails.metadata>;
export type MobileMoneyCustomerControllerGetCustomerDetailsResponse200 = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetCustomerDetails.response['200']>;
export type MobileMoneyCustomerControllerGetUserCustomersResponse200 = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetUserCustomers.response['200']>;
export type MobileMoneyCustomerControllerGetUserCustomersResponse400 = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetUserCustomers.response['400']>;
export type MobileMoneyCustomerControllerGetUserCustomersResponse401 = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetUserCustomers.response['401']>;
export type MobileMoneyCustomerControllerGetUserCustomersResponse404 = FromSchema<typeof schemas.MobileMoneyCustomerControllerGetUserCustomers.response['404']>;
export type MobileMoneyCustomerControllerUpdateCustomerBodyParam = FromSchema<typeof schemas.MobileMoneyCustomerControllerUpdateCustomer.body>;
export type MobileMoneyCustomerControllerUpdateCustomerMetadataParam = FromSchema<typeof schemas.MobileMoneyCustomerControllerUpdateCustomer.metadata>;
export type MobileMoneyCustomerControllerUpdateCustomerResponse200 = FromSchema<typeof schemas.MobileMoneyCustomerControllerUpdateCustomer.response['200']>;
export type MobileMoneyCustomerControllerUpdateCustomerResponse401 = FromSchema<typeof schemas.MobileMoneyCustomerControllerUpdateCustomer.response['401']>;
export type MobileMoneyCustomerControllerUpdateCustomerResponse404 = FromSchema<typeof schemas.MobileMoneyCustomerControllerUpdateCustomer.response['404']>;
export type OffRampControllerCreateOfframpBodyParam = FromSchema<typeof schemas.OffRampControllerCreateOfframp.body>;
export type OffRampControllerCreateOfframpResponse200 = FromSchema<typeof schemas.OffRampControllerCreateOfframp.response['200']>;
export type OffRampControllerCreateOfframpResponse400 = FromSchema<typeof schemas.OffRampControllerCreateOfframp.response['400']>;
export type OffRampControllerCreateOfframpResponse401 = FromSchema<typeof schemas.OffRampControllerCreateOfframp.response['401']>;
export type OffRampControllerGetOfframpStatusMetadataParam = FromSchema<typeof schemas.OffRampControllerGetOfframpStatus.metadata>;
export type OffRampControllerGetOfframpStatusResponse200 = FromSchema<typeof schemas.OffRampControllerGetOfframpStatus.response['200']>;
export type OffRampControllerGetOfframpStatusResponse401 = FromSchema<typeof schemas.OffRampControllerGetOfframpStatus.response['401']>;
export type OffRampControllerGetOfframpStatusResponse404 = FromSchema<typeof schemas.OffRampControllerGetOfframpStatus.response['404']>;
export type OfframpMobileMoneyControllerGetWithdrawalStatusMetadataParam = FromSchema<typeof schemas.OfframpMobileMoneyControllerGetWithdrawalStatus.metadata>;
export type OfframpMobileMoneyControllerGetWithdrawalStatusResponse200 = FromSchema<typeof schemas.OfframpMobileMoneyControllerGetWithdrawalStatus.response['200']>;
export type OfframpMobileMoneyControllerGetWithdrawalStatusResponse401 = FromSchema<typeof schemas.OfframpMobileMoneyControllerGetWithdrawalStatus.response['401']>;
export type OfframpMobileMoneyControllerGetWithdrawalStatusResponse404 = FromSchema<typeof schemas.OfframpMobileMoneyControllerGetWithdrawalStatus.response['404']>;
export type OfframpMobileMoneyControllerOnchainBodyParam = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchain.body>;
export type OfframpMobileMoneyControllerOnchainRequestBodyParam = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchainRequest.body>;
export type OfframpMobileMoneyControllerOnchainRequestResponse200 = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchainRequest.response['200']>;
export type OfframpMobileMoneyControllerOnchainRequestResponse400 = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchainRequest.response['400']>;
export type OfframpMobileMoneyControllerOnchainRequestResponse401 = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchainRequest.response['401']>;
export type OfframpMobileMoneyControllerOnchainResponse200 = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchain.response['200']>;
export type OfframpMobileMoneyControllerOnchainResponse201 = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchain.response['201']>;
export type OfframpMobileMoneyControllerOnchainResponse400 = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchain.response['400']>;
export type OfframpMobileMoneyControllerOnchainResponse401 = FromSchema<typeof schemas.OfframpMobileMoneyControllerOnchain.response['401']>;
export type OfframpMobileMoneyControllerSupportedChainsResponse200 = FromSchema<typeof schemas.OfframpMobileMoneyControllerSupportedChains.response['200']>;
export type OfframpMobileMoneyControllerSupportedChainsResponse401 = FromSchema<typeof schemas.OfframpMobileMoneyControllerSupportedChains.response['401']>;
export type OnrampControllerCreateOnrampCryptoBodyParam = FromSchema<typeof schemas.OnrampControllerCreateOnrampCrypto.body>;
export type OnrampControllerCreateOnrampCryptoResponse200 = FromSchema<typeof schemas.OnrampControllerCreateOnrampCrypto.response['200']>;
export type OnrampControllerCreateOnrampCryptoResponse400 = FromSchema<typeof schemas.OnrampControllerCreateOnrampCrypto.response['400']>;
export type OnrampControllerCreateOnrampCryptoResponse401 = FromSchema<typeof schemas.OnrampControllerCreateOnrampCrypto.response['401']>;
export type OnrampControllerGetOnrampCryptoMetadataParam = FromSchema<typeof schemas.OnrampControllerGetOnrampCrypto.metadata>;
export type OnrampControllerGetOnrampCryptoResponse200 = FromSchema<typeof schemas.OnrampControllerGetOnrampCrypto.response['200']>;
export type OnrampControllerGetOnrampCryptoResponse400 = FromSchema<typeof schemas.OnrampControllerGetOnrampCrypto.response['400']>;
export type OnrampControllerGetOnrampCryptoResponse401 = FromSchema<typeof schemas.OnrampControllerGetOnrampCrypto.response['401']>;
export type OnrampControllerGetOnrampCryptoResponse404 = FromSchema<typeof schemas.OnrampControllerGetOnrampCrypto.response['404']>;
export type OnrampControllerGetOnrampMetadataParam = FromSchema<typeof schemas.OnrampControllerGetOnramp.metadata>;
export type OnrampControllerGetOnrampResponse200 = FromSchema<typeof schemas.OnrampControllerGetOnramp.response['200']>;
export type OnrampControllerGetOnrampResponse400 = FromSchema<typeof schemas.OnrampControllerGetOnramp.response['400']>;
export type OnrampControllerGetOnrampResponse401 = FromSchema<typeof schemas.OnrampControllerGetOnramp.response['401']>;
export type OnrampControllerGetOnrampResponse404 = FromSchema<typeof schemas.OnrampControllerGetOnramp.response['404']>;
export type OnrampControllerOnrampBodyParam = FromSchema<typeof schemas.OnrampControllerOnramp.body>;
export type OnrampControllerOnrampResponse200 = FromSchema<typeof schemas.OnrampControllerOnramp.response['200']>;
export type OnrampControllerOnrampResponse400 = FromSchema<typeof schemas.OnrampControllerOnramp.response['400']>;
export type OnrampControllerOnrampResponse401 = FromSchema<typeof schemas.OnrampControllerOnramp.response['401']>;
export type OnrampFiatWalletControllerOnchainWalletWithdrawalBodyParam = FromSchema<typeof schemas.OnrampFiatWalletControllerOnchainWalletWithdrawal.body>;
export type OnrampFiatWalletControllerOnchainWalletWithdrawalResponse200 = FromSchema<typeof schemas.OnrampFiatWalletControllerOnchainWalletWithdrawal.response['200']>;
export type OnrampFiatWalletControllerOnchainWalletWithdrawalResponse201 = FromSchema<typeof schemas.OnrampFiatWalletControllerOnchainWalletWithdrawal.response['201']>;
export type OnrampFiatWalletControllerOnchainWalletWithdrawalResponse400 = FromSchema<typeof schemas.OnrampFiatWalletControllerOnchainWalletWithdrawal.response['400']>;
export type OnrampFiatWalletControllerOnchainWalletWithdrawalResponse401 = FromSchema<typeof schemas.OnrampFiatWalletControllerOnchainWalletWithdrawal.response['401']>;
export type OnrampFiatWalletControllerOnchainWalletWithdrawalStatusMetadataParam = FromSchema<typeof schemas.OnrampFiatWalletControllerOnchainWalletWithdrawalStatus.metadata>;
export type OnrampMobileMoneyControllerGetSupportedChainsResponse200 = FromSchema<typeof schemas.OnrampMobileMoneyControllerGetSupportedChains.response['200']>;
export type OnrampMobileMoneyControllerGetSupportedChainsResponse400 = FromSchema<typeof schemas.OnrampMobileMoneyControllerGetSupportedChains.response['400']>;
export type OnrampMobileMoneyControllerGetSupportedChainsResponse401 = FromSchema<typeof schemas.OnrampMobileMoneyControllerGetSupportedChains.response['401']>;
export type OnrampMobileMoneyControllerGetWithdrawalStatusMetadataParam = FromSchema<typeof schemas.OnrampMobileMoneyControllerGetWithdrawalStatus.metadata>;
export type OnrampMobileMoneyControllerGetWithdrawalStatusResponse200 = FromSchema<typeof schemas.OnrampMobileMoneyControllerGetWithdrawalStatus.response['200']>;
export type OnrampMobileMoneyControllerGetWithdrawalStatusResponse400 = FromSchema<typeof schemas.OnrampMobileMoneyControllerGetWithdrawalStatus.response['400']>;
export type OnrampMobileMoneyControllerGetWithdrawalStatusResponse401 = FromSchema<typeof schemas.OnrampMobileMoneyControllerGetWithdrawalStatus.response['401']>;
export type OnrampMobileMoneyControllerGetWithdrawalStatusResponse404 = FromSchema<typeof schemas.OnrampMobileMoneyControllerGetWithdrawalStatus.response['404']>;
export type OnrampMobileMoneyControllerOnchainBodyParam = FromSchema<typeof schemas.OnrampMobileMoneyControllerOnchain.body>;
export type OnrampMobileMoneyControllerOnchainResponse200 = FromSchema<typeof schemas.OnrampMobileMoneyControllerOnchain.response['200']>;
export type OnrampMobileMoneyControllerOnchainResponse400 = FromSchema<typeof schemas.OnrampMobileMoneyControllerOnchain.response['400']>;
export type OnrampMobileMoneyControllerOnchainResponse401 = FromSchema<typeof schemas.OnrampMobileMoneyControllerOnchain.response['401']>;
export type OnrampMobileMoneyControllerOnchainResponse404 = FromSchema<typeof schemas.OnrampMobileMoneyControllerOnchain.response['404']>;
export type PaymentProviderControllerProvidersBodyParam = FromSchema<typeof schemas.PaymentProviderControllerProviders.body>;
export type RateControllerGetFiatToFiatRateBodyParam = FromSchema<typeof schemas.RateControllerGetFiatToFiatRate.body>;
export type RateControllerGetFiatToFiatRateResponse200 = FromSchema<typeof schemas.RateControllerGetFiatToFiatRate.response['200']>;
export type RateControllerGetFiatToFiatRateResponse401 = FromSchema<typeof schemas.RateControllerGetFiatToFiatRate.response['401']>;
export type RateControllerGetOffRampRatesBodyParam = FromSchema<typeof schemas.RateControllerGetOffRampRates.body>;
export type RateControllerGetOffRampRatesResponse200 = FromSchema<typeof schemas.RateControllerGetOffRampRates.response['200']>;
export type RateControllerGetOffRampRatesResponse401 = FromSchema<typeof schemas.RateControllerGetOffRampRates.response['401']>;
export type RateControllerGetOnrampRatesBodyParam = FromSchema<typeof schemas.RateControllerGetOnrampRates.body>;
export type RateControllerGetOnrampRatesResponse200 = FromSchema<typeof schemas.RateControllerGetOnrampRates.response['200']>;
export type RateControllerGetOnrampRatesResponse401 = FromSchema<typeof schemas.RateControllerGetOnrampRates.response['401']>;
export type RateControllerGetRatesMetadataParam = FromSchema<typeof schemas.RateControllerGetRates.metadata>;
export type RateControllerGetRatesResponse200 = FromSchema<typeof schemas.RateControllerGetRates.response['200']>;
export type RateControllerGetRatesResponse401 = FromSchema<typeof schemas.RateControllerGetRates.response['401']>;
export type RateControllerRatesResponse200 = FromSchema<typeof schemas.RateControllerRates.response['200']>;
export type RateControllerRatesResponse401 = FromSchema<typeof schemas.RateControllerRates.response['401']>;
export type WithdrawControllerGetWithdrawalStatusMetadataParam = FromSchema<typeof schemas.WithdrawControllerGetWithdrawalStatus.metadata>;
export type WithdrawControllerGetWithdrawalStatusResponse200 = FromSchema<typeof schemas.WithdrawControllerGetWithdrawalStatus.response['200']>;
export type WithdrawControllerGetWithdrawalStatusResponse401 = FromSchema<typeof schemas.WithdrawControllerGetWithdrawalStatus.response['401']>;
export type WithdrawControllerGetWithdrawalStatusResponse404 = FromSchema<typeof schemas.WithdrawControllerGetWithdrawalStatus.response['404']>;
export type WithdrawControllerMobileMoneyBodyParam = FromSchema<typeof schemas.WithdrawControllerMobileMoney.body>;
export type WithdrawControllerMobileMoneyResponse200 = FromSchema<typeof schemas.WithdrawControllerMobileMoney.response['200']>;
export type WithdrawControllerMobileMoneyResponse400 = FromSchema<typeof schemas.WithdrawControllerMobileMoney.response['400']>;
export type WithdrawControllerMobileMoneyResponse401 = FromSchema<typeof schemas.WithdrawControllerMobileMoney.response['401']>;
export type WithdrawTransactionControllerGetWithdrawTransactionMetadataParam = FromSchema<typeof schemas.WithdrawTransactionControllerGetWithdrawTransaction.metadata>;
export type WithdrawTransactionControllerMobileMoneyBodyParam = FromSchema<typeof schemas.WithdrawTransactionControllerMobileMoney.body>;
export type WithdrawTransactionControllerMobileMoneyResponse200 = FromSchema<typeof schemas.WithdrawTransactionControllerMobileMoney.response['200']>;
export type WithdrawTransactionControllerMobileMoneyResponse400 = FromSchema<typeof schemas.WithdrawTransactionControllerMobileMoney.response['400']>;
export type WithdrawTransactionControllerMobileMoneyResponse401 = FromSchema<typeof schemas.WithdrawTransactionControllerMobileMoney.response['401']>;