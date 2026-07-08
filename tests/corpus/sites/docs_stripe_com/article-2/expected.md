### Attributes

* **id** (string): Unique identifier for the object.
* **amount** (integer): Amount intended to be collected by this payment. A positive integer representing how much to charge in the [smallest currency unit](/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
* **balance_transaction** (nullable string Expandable): ID of the balance transaction that describes the impact of this charge on your account balance (not including refunds or disputes).
* **billing_details** (object): Billing information associated with the payment method at the time of the transaction.
* **currency** (enum): Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
* **customer** (nullable string Expandable): ID of the customer this charge is for if one exists.
* **description** (nullable string): An arbitrary string attached to the object. Often useful for displaying to users.
* **disputed** (boolean): Whether the charge has been disputed.
* **metadata** (object): Set of [key-value pairs](/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
* **payment_intent** (nullable string Expandable): ID of the PaymentIntent associated with this charge, if one exists.
* **payment_method_details** (nullable object): Details about the payment method at the time of the transaction.
* **receipt_email** (nullable string): This is the email address that the receipt for this charge was sent to.
* **refunded** (boolean): Whether the charge has been fully refunded. If the charge is only partially refunded, this attribute will still be false.
* **shipping** (nullable object): Shipping information for the charge.
* **statement_descriptor** (nullable string): For a non-card charge, text that appears on the customer’s statement as the statement descriptor. This value overrides the account’s default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors). For a card charge, this value is ignored unless you don’t specify a `statement_descriptor_suffix`, in which case this value is used as the suffix.
* **statement_descriptor_suffix** (nullable string): Provides information about a card charge. Concatenated to the account’s [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static) to form the complete statement descriptor that appears on the customer’s statement. If the account has no prefix value, the suffix is concatenated to the account’s statement descriptor.
* **status** (enum): The status of the payment is either `succeeded`, `pending`, or `failed`.

### More attributes

* **object** (string)
* **amount_captured** (integer)
* **amount_refunded** (integer)
* **application** (nullable string Expandable Connect only)
* **application_fee** (nullable string Expandable Connect only)
* **application_fee_amount** (nullable integer Connect only)
* **calculated_statement_descriptor** (nullable string)
* **captured** (boolean)
* **created** (timestamp)
* **failure_balance_transaction** (nullable string Expandable)
* **failure_code** (nullable string)
* **failure_message** (nullable string)
* **fraud_details** (nullable object)
* **livemode** (boolean)
* **on_behalf_of** (nullable string Expandable Connect only)
* **outcome** (nullable object)
* **paid** (boolean)
* **payment_method** (nullable string)
* **presentment_details** (nullable object)
* **radar_options** (nullable object)
* **receipt_number** (nullable string)
* **receipt_url** (nullable string)
* **refunds** (nullable object Expandable)
* **review** (nullable string Expandable)
* **source_transfer** (nullable string Expandable Connect only)
* **transfer** (nullable string Expandable Connect only)
* **transfer_data** (nullable object Connect only)
* **transfer_group** (nullable string Connect only)

The Charge object

```
{  "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",  "object": "charge",  "amount": 1099,  "amount_captured": 1099,  "amount_refunded": 0,  "application": null,  "application_fee": null,  "application_fee_amount": null,  "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy",  "billing_details": {    "address": {      "city": null,      "country": null,      "line1": null,      "line2": null,      "postal_code": null,      "state": null    },    "email": null,    "name": null,    "phone": null  },  "calculated_statement_descriptor": "Stripe",  "captured": true,  "created": 1679090539,  "currency": "usd",  "customer": null,  "description": null,  "disputed": false,  "failure_balance_transaction": null,  "failure_code": null,  "failure_message": null,  "fraud_details": {},  "livemode": false,  "metadata": {},  "on_behalf_of": null,  "outcome": {    "network_status": "approved_by_network",    "reason": null,    "risk_level": "normal",    "risk_score": 32,    "seller_message": "Payment complete.",    "type": "authorized"  },  "paid": true,  "payment_intent": null,  "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR",  "payment_method_details": {    "card": {      "brand": "visa",      "checks": {        "address_line1_check": null,        "address_postal_code_check": null,        "cvc_check": null      },      "country": "US",      "exp_month": 3,      "exp_year": 2024,      "fingerprint": "mToisGZ01V71BCos",      "funding": "credit",      "installments": null,      "last4": "4242",      "mandate": null,      "network": "visa",      "three_d_secure": null,      "wallet": null    },    "type": "card"  },  "receipt_email": null,  "receipt_number": null,  "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KOvG06AGMgZfBXyr1aw6LBa9vaaSRWU96d8qBwz9z2J_CObiV_H2-e8RezSK_sw0KISesp4czsOUlVKY",  "refunded": false,  "review": null,  "shipping": null,  "source_transfer": null,  "statement_descriptor": null,  "statement_descriptor_suffix": null,  "status": "succeeded",  "transfer_data": null,  "transfer_group": null}
```
This method is no longer recommended—use the [Payment Intents API](/api/payment_intents) to initiate a new payment instead. Confirmation of the PaymentIntent creates the `Charge` object used to request payment.

### Parameters

* **amount** (integer Required): Amount intended to be collected by this payment. A positive integer representing how much to charge in the [smallest currency unit](/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
* **currency** (enum Required): Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
* **customer** (string): The ID of an existing customer that will be charged in this request. The maximum length is 500 characters.
* **description** (string): An arbitrary string which you can attach to a `Charge` object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing.
* **metadata** (object): Set of [key-value pairs](/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
* **receipt_email** (string): The email address to which this charge’s [receipt](/dashboard/receipts) will be sent. The receipt will not be sent until the charge is paid, and no receipts will be sent for test mode charges. If this charge is for a [Customer](/api/customers/object), the email address specified here will override the customer’s email address. If `receipt_email` is specified for a charge in live mode, a receipt will be sent regardless of your [email settings](https://dashboard.stripe.com/account/emails). The maximum length is 800 characters.
* **shipping** (object): Shipping information for the charge. Helps prevent fraud on charges for physical goods.
* **source** (string): A payment source to be charged. This can be the ID of a [card](/api#cards) (i.e., credit or debit card), a [bank account](/api#bank_accounts), a [source](/api#sources), a [token](/api#tokens), or a [connected account](/connect/account-debits#charging-a-connected-account). For certain sources—namely, [cards](/api#cards), [bank accounts](/api#bank_accounts), and attached [sources](/api#sources)—you must also pass the ID of the associated customer.
* **statement_descriptor** (string): For a non-card charge, text that appears on the customer’s statement as the statement descriptor. This value overrides the account’s default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors). For a card charge, this value is ignored unless you don’t specify a `statement_descriptor_suffix`, in which case this value is used as the suffix.
* **statement_descriptor_suffix** (string): Provides information about a card charge. Concatenated to the account’s [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static) to form the complete statement descriptor that appears on the customer’s statement. If the account has no prefix value, the suffix is concatenated to the account’s statement descriptor.

### More parameters

* **application_fee_amount** (integer Connect only)
* **capture** (boolean)
* **on_behalf_of** (string Connect only)
* **radar_options** (object)
* **transfer_data** (object Connect only)
* **transfer_group** (string Connect only)

### Returns

Returns the charge object if the charge succeeded. This call raises [an error](#errors) if something goes wrong. A common source of error is an invalid or expired card, or a valid card with insufficient available balance.

POST /v1/charges

```
curl https://api.stripe.com/v1/charges \  -u "[redacted-stripe-test-secret][redacted-stripe-test-secret]:" \  -d amount=1099 \  -d currency=usd \  -d source=tok_visa
```

Response

```
{  "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",  "object": "charge",  "amount": 1099,  "amount_captured": 1099,  "amount_refunded": 0,  "application": null,  "application_fee": null,  "application_fee_amount": null,  "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy",  "billing_details": {    "address": {      "city": null,      "country": null,      "line1": null,      "line2": null,      "postal_code": null,      "state": null    },    "email": null,    "name": null,    "phone": null  },  "calculated_statement_descriptor": "Stripe",  "captured": true,  "created": 1679090539,  "currency": "usd",  "customer": null,  "description": null,  "disputed": false,  "failure_balance_transaction": null,  "failure_code": null,  "failure_message": null,  "fraud_details": {},  "livemode": false,  "metadata": {},  "on_behalf_of": null,  "outcome": {    "network_status": "approved_by_network",    "reason": null,    "risk_level": "normal",    "risk_score": 32,    "seller_message": "Payment complete.",    "type": "authorized"  },  "paid": true,  "payment_intent": null,  "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR",  "payment_method_details": {    "card": {      "brand": "visa",      "checks": {        "address_line1_check": null,        "address_postal_code_check": null,        "cvc_check": null      },      "country": "US",      "exp_month": 3,      "exp_year": 2024,      "fingerprint": "mToisGZ01V71BCos",      "funding": "credit",      "installments": null,      "last4": "4242",      "mandate": null,      "network": "visa",      "three_d_secure": null,      "wallet": null    },    "type": "card"  },  "receipt_email": null,  "receipt_number": null,  "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KOvG06AGMgZfBXyr1aw6LBa9vaaSRWU96d8qBwz9z2J_CObiV_H2-e8RezSK_sw0KISesp4czsOUlVKY",  "refunded": false,  "review": null,  "shipping": null,  "source_transfer": null,  "statement_descriptor": null,  "statement_descriptor_suffix": null,  "status": "succeeded",  "transfer_data": null,  "transfer_group": null}
```
Updates the specified charge by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

### Parameters

* **customer** (string): The ID of an existing customer that will be associated with this request. This field may only be updated if there is no existing associated customer with this charge.
* **description** (string): An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing.
* **metadata** (object): Set of [key-value pairs](/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
* **receipt_email** (string): This is the email address that the receipt for this charge will be sent to. If this field is updated, then a new email receipt will be sent to the updated address.
* **shipping** (object): Shipping information for the charge. Helps prevent fraud on charges for physical goods.

### More parameters

* **fraud_details** (object)
* **transfer_group** (string Connect only)

### Returns

Returns the charge object if the update succeeded. This call will raise [an error](#errors) if update parameters are invalid.

POST /v1/charges/:id

```
curl https://api.stripe.com/v1/charges/{{CHARGE_ID}} \  -u "[redacted-stripe-test-secret][redacted-stripe-test-secret]:" \  -d "metadata[shipping]=express"
```

Response

```
{  "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",  "object": "charge",  "amount": 1099,  "amount_captured": 1099,  "amount_refunded": 0,  "application": null,  "application_fee": null,  "application_fee_amount": null,  "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy",  "billing_details": {    "address": {      "city": null,      "country": null,      "line1": null,      "line2": null,      "postal_code": null,      "state": null    },    "email": null,    "name": null,    "phone": null  },  "calculated_statement_descriptor": "Stripe",  "captured": true,  "created": 1679090539,  "currency": "usd",  "customer": null,  "description": null,  "disputed": false,  "failure_balance_transaction": null,  "failure_code": null,  "failure_message": null,  "fraud_details": {},  "livemode": false,  "metadata": {    "shipping": "express"  },  "on_behalf_of": null,  "outcome": {    "network_status": "approved_by_network",    "reason": null,    "risk_level": "normal",    "risk_score": 32,    "seller_message": "Payment complete.",    "type": "authorized"  },  "paid": true,  "payment_intent": null,  "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR",  "payment_method_details": {    "card": {      "brand": "visa",      "checks": {        "address_line1_check": null,        "address_postal_code_check": null,        "cvc_check": null      },      "country": "US",      "exp_month": 3,      "exp_year": 2024,      "fingerprint": "mToisGZ01V71BCos",      "funding": "credit",      "installments": null,      "last4": "4242",      "mandate": null,      "network": "visa",      "network_token": {        "used": false      },      "three_d_secure": null,      "wallet": null    },    "type": "card"  },  "receipt_email": null,  "receipt_number": null,  "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KPDLl6UGMgawkab5iK86LBYtkq0XrhiQf1RsA2ubesH4GHiixEU8_1-Wp7h4oQEdfSUGiZpJwtQHBErT",  "refunded": false,  "refunds": {    "object": "list",    "data": [],    "has_more": false,    "total_count": 0,    "url": "/v1/charges/ch_3MmlLrLkdIwHu7ix0snN0B15/refunds"  },  "review": null,  "shipping": null,  "source_transfer": null,  "statement_descriptor": null,  "statement_descriptor_suffix": null,  "status": "succeeded",  "transfer_data": null,  "transfer_group": null}
```
Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request, and Stripe will return the corresponding charge information. The same information is returned when creating or refunding the charge.

### Parameters

No parameters.

### Returns

Returns a charge if a valid identifier was provided, and raises [an error](#errors) otherwise.

GET /v1/charges/:id

```
curl https://api.stripe.com/v1/charges/{{CHARGE_ID}} \  -u "[redacted-stripe-test-secret][redacted-stripe-test-secret]:"
```

Response

```
{  "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",  "object": "charge",  "amount": 1099,  "amount_captured": 1099,  "amount_refunded": 0,  "application": null,  "application_fee": null,  "application_fee_amount": null,  "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy",  "billing_details": {    "address": {      "city": null,      "country": null,      "line1": null,      "line2": null,      "postal_code": null,      "state": null    },    "email": null,    "name": null,    "phone": null  },  "calculated_statement_descriptor": "Stripe",  "captured": true,  "created": 1679090539,  "currency": "usd",  "customer": null,  "description": null,  "disputed": false,  "failure_balance_transaction": null,  "failure_code": null,  "failure_message": null,  "fraud_details": {},  "livemode": false,  "metadata": {},  "on_behalf_of": null,  "outcome": {    "network_status": "approved_by_network",    "reason": null,    "risk_level": "normal",    "risk_score": 32,    "seller_message": "Payment complete.",    "type": "authorized"  },  "paid": true,  "payment_intent": null,  "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR",  "payment_method_details": {    "card": {      "brand": "visa",      "checks": {        "address_line1_check": null,        "address_postal_code_check": null,        "cvc_check": null      },      "country": "US",      "exp_month": 3,      "exp_year": 2024,      "fingerprint": "mToisGZ01V71BCos",      "funding": "credit",      "installments": null,      "last4": "4242",      "mandate": null,      "network": "visa",      "three_d_secure": null,      "wallet": null    },    "type": "card"  },  "receipt_email": null,  "receipt_number": null,  "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KOvG06AGMgZfBXyr1aw6LBa9vaaSRWU96d8qBwz9z2J_CObiV_H2-e8RezSK_sw0KISesp4czsOUlVKY",  "refunded": false,  "review": null,  "shipping": null,  "source_transfer": null,  "statement_descriptor": null,  "statement_descriptor_suffix": null,  "status": "succeeded",  "transfer_data": null,  "transfer_group": null}
```
Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.

### Parameters

* **customer** (string): Only return charges for the customer specified by this customer ID.

### More parameters

* **created** (object)
* **ending_before** (string)
* **limit** (integer)
* **payment_intent** (string)
* **starting_after** (string)
* **transfer_group** (string Connect only)

### Returns

A dictionary with a `data` property that contains an array of up to `limit` charges, starting after charge `starting_after`. Each entry in the array is a separate charge object. If no more charges are available, the resulting array will be empty. If you provide a non-existent customer ID, this call raises [an error](#errors).

GET /v1/charges

```
curl -G https://api.stripe.com/v1/charges \  -u "[redacted-stripe-test-secret][redacted-stripe-test-secret]:" \  -d limit=3
```

Response

```
{  "object": "list",  "url": "/v1/charges",  "has_more": false,  "data": [    {      "id": "ch_3MmlLrLkdIwHu7ix0snN0B15",      "object": "charge",      "amount": 1099,      "amount_captured": 1099,      "amount_refunded": 0,      "application": null,      "application_fee": null,      "application_fee_amount": null,      "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy",      "billing_details": {        "address": {          "city": null,          "country": null,          "line1": null,          "line2": null,          "postal_code": null,          "state": null        },        "email": null,        "name": null,        "phone": null      },      "calculated_statement_descriptor": "Stripe",      "captured": true,      "created": 1679090539,      "currency": "usd",      "customer": null,      "description": null,      "disputed": false,      "failure_balance_transaction": null,      "failure_code": null,      "failure_message": null,      "fraud_details": {},      "livemode": false,      "metadata": {},      "on_behalf_of": null,      "outcome": {        "network_status": "approved_by_network",        "reason": null,        "risk_level": "normal",        "risk_score": 32,        "seller_message": "Payment complete.",        "type": "authorized"      },      "paid": true,      "payment_intent": null,      "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR",      "payment_method_details": {        "card": {          "brand": "visa",          "checks": {            "address_line1_check": null,            "address_postal_code_check": null,            "cvc_check": null          },          "country": "US",          "exp_month": 3,          "exp_year": 2024,          "fingerprint": "mToisGZ01V71BCos",          "funding": "credit",          "installments": null,          "last4": "4242",          "mandate": null,          "network": "visa",          "three_d_secure": null,          "wallet": null        },        "type": "card"      },      "receipt_email": null,      "receipt_number": null,      "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KOvG06AGMgZfBXyr1aw6LBa9vaaSRWU96d8qBwz9z2J_CObiV_H2-e8RezSK_sw0KISesp4czsOUlVKY",      "refunded": false,      "review": null,      "shipping": null,      "source_transfer": null,      "statement_descriptor": null,      "statement_descriptor_suffix": null,      "status": "succeeded",      "transfer_data": null,      "transfer_group": null    }  ]}
```
