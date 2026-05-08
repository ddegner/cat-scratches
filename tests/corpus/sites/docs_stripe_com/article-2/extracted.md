* #### 
 
 idstring
 
 Unique identifier for the object.
 
* #### 
 
 amountinteger
 
 Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or equivalent in charge currency. The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
 
* #### 
 
 balance\_transactionnullable stringExpandable
 
 ID of the balance transaction that describes the impact of this charge on your account balance (not including refunds or disputes).
 
* #### 
 
 billing\_detailsobject
 
 Billing information associated with the payment method at the time of the transaction.
 
* #### 
 
 currencyenum
 
 Three-letter ISO currency code, in lowercase. Must be a supported currency.
 
* #### 
 
 customernullable stringExpandable
 
 ID of the customer this charge is for if one exists.
 
* #### 
 
 descriptionnullable string
 
 An arbitrary string attached to the object. Often useful for displaying to users.
 
* #### 
 
 disputedboolean
 
 Whether the charge has been disputed.
 
* #### 
 
 metadataobject
 
 Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
 
* #### 
 
 payment\_intentnullable stringExpandable
 
 ID of the PaymentIntent associated with this charge, if one exists.
 
* #### 
 
 payment\_method\_detailsnullable object
 
 Details about the payment method at the time of the transaction.
 
* #### 
 
 receipt\_emailnullable string
 
 This is the email address that the receipt for this charge was sent to.
 
* #### 
 
 refundedboolean
 
 Whether the charge has been fully refunded. If the charge is only partially refunded, this attribute will still be false.
 
* #### 
 
 shippingnullable object
 
 Shipping information for the charge.
 
* #### 
 
 statement\_descriptornullable string
 
 For a non-card charge, text that appears on the customer’s statement as the statement descriptor. This value overrides the account’s default statement descriptor. For information about requirements, including the 22-character limit, see the Statement Descriptor docs.
 
 For a card charge, this value is ignored unless you don’t specify a `statement_descriptor_suffix`, in which case this value is used as the suffix.
 
* #### 
 
 statement\_descriptor\_suffixnullable string
 
 Provides information about a card charge. Concatenated to the account’s statement descriptor prefix to form the complete statement descriptor that appears on the customer’s statement. If the account has no prefix value, the suffix is concatenated to the account’s statement descriptor.
 
* #### 
 
 statusenum
 
 The status of the payment is either `succeeded`, `pending`, or `failed`.

### More attributes

* #### 
 
 objectstring
 
* #### 
 
 amount\_capturedinteger
 
* #### 
 
 amount\_refundedinteger
 
* #### 
 
 applicationnullable stringExpandableConnect only
 
* #### 
 
 application\_feenullable stringExpandableConnect only
 
* #### 
 
 application\_fee\_amountnullable integerConnect only
 
* #### 
 
 calculated\_statement\_descriptornullable string
 
* #### 
 
 capturedboolean
 
* #### 
 
 createdtimestamp
 
* #### 
 
 failure\_balance\_transactionnullable stringExpandable
 
* #### 
 
 failure\_codenullable string
 
* #### 
 
 failure\_messagenullable string
 
* #### 
 
 fraud\_detailsnullable object
 
* #### 
 
 livemodeboolean
 
* #### 
 
 on\_behalf\_ofnullable stringExpandableConnect only
 
* #### 
 
 outcomenullable object
 
* #### 
 
 paidboolean
 
* #### 
 
 payment\_methodnullable string
 
* #### 
 
 presentment\_detailsnullable object
 
* #### 
 
 radar\_optionsnullable object
 
* #### 
 
 receipt\_numbernullable string
 
* #### 
 
 receipt\_urlnullable string
 
* #### 
 
 refundsnullable objectExpandable
 
* #### 
 
 reviewnullable stringExpandable
 
* #### 
 
 source\_transfernullable stringExpandableConnect only
 
* #### 
 
 transfernullable stringExpandableConnect only
 
* #### 
 
 transfer\_datanullable objectConnect only
 
* #### 
 
 transfer\_groupnullable stringConnect only

The Charge object

```
{ "id": "ch_3MmlLrLkdIwHu7ix0snN0B15", "object": "charge", "amount": 1099, "amount_captured": 1099, "amount_refunded": 0, "application": null, "application_fee": null, "application_fee_amount": null, "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy", "billing_details": { "address": { "city": null, "country": null, "line1": null, "line2": null, "postal_code": null, "state": null }, "email": null, "name": null, "phone": null }, "calculated_statement_descriptor": "Stripe", "captured": true, "created": 1679090539, "currency": "usd", "customer": null, "description": null, "disputed": false, "failure_balance_transaction": null, "failure_code": null, "failure_message": null, "fraud_details": {}, "livemode": false, "metadata": {}, "on_behalf_of": null, "outcome": { "network_status": "approved_by_network", "reason": null, "risk_level": "normal", "risk_score": 32, "seller_message": "Payment complete.", "type": "authorized" }, "paid": true, "payment_intent": null, "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR", "payment_method_details": { "card": { "brand": "visa", "checks": { "address_line1_check": null, "address_postal_code_check": null, "cvc_check": null }, "country": "US", "exp_month": 3, "exp_year": 2024, "fingerprint": "mToisGZ01V71BCos", "funding": "credit", "installments": null, "last4": "4242", "mandate": null, "network": "visa", "three_d_secure": null, "wallet": null }, "type": "card" }, "receipt_email": null, "receipt_number": null, "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KOvG06AGMgZfBXyr1aw6LBa9vaaSRWU96d8qBwz9z2J_CObiV_H2-e8RezSK_sw0KISesp4czsOUlVKY", "refunded": false, "review": null, "shipping": null, "source_transfer": null, "statement_descriptor": null, "statement_descriptor_suffix": null, "status": "succeeded", "transfer_data": null, "transfer_group": null}
```

# Create a chargeDeprecated

This method is no longer recommended—use the Payment Intents API to initiate a new payment instead. Confirmation of the PaymentIntent creates the `Charge` object used to request payment.

### Parameters

* #### 
 
 amountintegerRequired
 
 Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or equivalent in charge currency. The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
 
* #### 
 
 currencyenumRequired
 
 Three-letter ISO currency code, in lowercase. Must be a supported currency.
 
* #### 
 
 customerstring
 
 The ID of an existing customer that will be charged in this request.
 
 The maximum length is 500 characters.
 
* #### 
 
 descriptionstring
 
 An arbitrary string which you can attach to a `Charge` object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing.
 
* #### 
 
 metadataobject
 
 Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
 
* #### 
 
 receipt\_emailstring
 
 The email address to which this charge’s receipt will be sent. The receipt will not be sent until the charge is paid, and no receipts will be sent for test mode charges. If this charge is for a Customer, the email address specified here will override the customer’s email address. If `receipt_email` is specified for a charge in live mode, a receipt will be sent regardless of your email settings.
 
 The maximum length is 800 characters.
 
* #### 
 
 shippingobject
 
 Shipping information for the charge. Helps prevent fraud on charges for physical goods.
 
* #### 
 
 sourcestring
 
 A payment source to be charged. This can be the ID of a card (i.e., credit or debit card), a bank account, a source, a token, or a connected account. For certain sources—namely, cards, bank accounts, and attached sources—you must also pass the ID of the associated customer.
 
* #### 
 
 statement\_descriptorstring
 
 For a non-card charge, text that appears on the customer’s statement as the statement descriptor. This value overrides the account’s default statement descriptor. For information about requirements, including the 22-character limit, see the Statement Descriptor docs.
 
 For a card charge, this value is ignored unless you don’t specify a `statement_descriptor_suffix`, in which case this value is used as the suffix.
 
* #### 
 
 statement\_descriptor\_suffixstring
 
 Provides information about a card charge. Concatenated to the account’s statement descriptor prefix to form the complete statement descriptor that appears on the customer’s statement. If the account has no prefix value, the suffix is concatenated to the account’s statement descriptor.

### More parameters

* #### 
 
 application\_fee\_amountintegerConnect only
 
* #### 
 
 captureboolean
 
* #### 
 
 on\_behalf\_ofstringConnect only
 
* #### 
 
 radar\_optionsobject
 
* #### 
 
 transfer\_dataobjectConnect only
 
* #### 
 
 transfer\_groupstringConnect only

### Returns

Returns the charge object if the charge succeeded. This call raises an error if something goes wrong. A common source of error is an invalid or expired card, or a valid card with insufficient available balance.

POST /v1/charges

```
curl https://api.stripe.com/v1/charges \ -u "[redacted-stripe-test-secret]:" \ -d amount=1099 \ -d currency=usd \ -d source=tok_visa
```

Response

```
{ "id": "ch_3MmlLrLkdIwHu7ix0snN0B15", "object": "charge", "amount": 1099, "amount_captured": 1099, "amount_refunded": 0, "application": null, "application_fee": null, "application_fee_amount": null, "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy", "billing_details": { "address": { "city": null, "country": null, "line1": null, "line2": null, "postal_code": null, "state": null }, "email": null, "name": null, "phone": null }, "calculated_statement_descriptor": "Stripe", "captured": true, "created": 1679090539, "currency": "usd", "customer": null, "description": null, "disputed": false, "failure_balance_transaction": null, "failure_code": null, "failure_message": null, "fraud_details": {}, "livemode": false, "metadata": {}, "on_behalf_of": null, "outcome": { "network_status": "approved_by_network", "reason": null, "risk_level": "normal", "risk_score": 32, "seller_message": "Payment complete.", "type": "authorized" }, "paid": true, "payment_intent": null, "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR", "payment_method_details": { "card": { "brand": "visa", "checks": { "address_line1_check": null, "address_postal_code_check": null, "cvc_check": null }, "country": "US", "exp_month": 3, "exp_year": 2024, "fingerprint": "mToisGZ01V71BCos", "funding": "credit", "installments": null, "last4": "4242", "mandate": null, "network": "visa", "three_d_secure": null, "wallet": null }, "type": "card" }, "receipt_email": null, "receipt_number": null, "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KOvG06AGMgZfBXyr1aw6LBa9vaaSRWU96d8qBwz9z2J_CObiV_H2-e8RezSK_sw0KISesp4czsOUlVKY", "refunded": false, "review": null, "shipping": null, "source_transfer": null, "statement_descriptor": null, "statement_descriptor_suffix": null, "status": "succeeded", "transfer_data": null, "transfer_group": null}
```

# Update a charge

Updates the specified charge by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

### Parameters

* #### 
 
 customerstring
 
 The ID of an existing customer that will be associated with this request. This field may only be updated if there is no existing associated customer with this charge.
 
* #### 
 
 descriptionstring
 
 An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing.
 
* #### 
 
 metadataobject
 
 Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
 
* #### 
 
 receipt\_emailstring
 
 This is the email address that the receipt for this charge will be sent to. If this field is updated, then a new email receipt will be sent to the updated address.
 
* #### 
 
 shippingobject
 
 Shipping information for the charge. Helps prevent fraud on charges for physical goods.

### More parameters

* #### 
 
 fraud\_detailsobject
 
* #### 
 
 transfer\_groupstringConnect only

### Returns

Returns the charge object if the update succeeded. This call will raise an error if update parameters are invalid.

POST /v1/charges/:id

```
curl https://api.stripe.com/v1/charges/{{CHARGE_ID}} \ -u "[redacted-stripe-test-secret]:" \ -d "metadata[shipping]=express"
```

Response

```
{ "id": "ch_3MmlLrLkdIwHu7ix0snN0B15", "object": "charge", "amount": 1099, "amount_captured": 1099, "amount_refunded": 0, "application": null, "application_fee": null, "application_fee_amount": null, "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy", "billing_details": { "address": { "city": null, "country": null, "line1": null, "line2": null, "postal_code": null, "state": null }, "email": null, "name": null, "phone": null }, "calculated_statement_descriptor": "Stripe", "captured": true, "created": 1679090539, "currency": "usd", "customer": null, "description": null, "disputed": false, "failure_balance_transaction": null, "failure_code": null, "failure_message": null, "fraud_details": {}, "livemode": false, "metadata": { "shipping": "express" }, "on_behalf_of": null, "outcome": { "network_status": "approved_by_network", "reason": null, "risk_level": "normal", "risk_score": 32, "seller_message": "Payment complete.", "type": "authorized" }, "paid": true, "payment_intent": null, "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR", "payment_method_details": { "card": { "brand": "visa", "checks": { "address_line1_check": null, "address_postal_code_check": null, "cvc_check": null }, "country": "US", "exp_month": 3, "exp_year": 2024, "fingerprint": "mToisGZ01V71BCos", "funding": "credit", "installments": null, "last4": "4242", "mandate": null, "network": "visa", "network_token": { "used": false }, "three_d_secure": null, "wallet": null }, "type": "card" }, "receipt_email": null, "receipt_number": null, "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KPDLl6UGMgawkab5iK86LBYtkq0XrhiQf1RsA2ubesH4GHiixEU8_1-Wp7h4oQEdfSUGiZpJwtQHBErT", "refunded": false, "refunds": { "object": "list", "data": [], "has_more": false, "total_count": 0, "url": "/v1/charges/ch_3MmlLrLkdIwHu7ix0snN0B15/refunds" }, "review": null, "shipping": null, "source_transfer": null, "statement_descriptor": null, "statement_descriptor_suffix": null, "status": "succeeded", "transfer_data": null, "transfer_group": null}
```

# Retrieve a charge

Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request, and Stripe will return the corresponding charge information. The same information is returned when creating or refunding the charge.

### Parameters

No parameters.

### Returns

Returns a charge if a valid identifier was provided, and raises an error otherwise.

GET /v1/charges/:id

```
curl https://api.stripe.com/v1/charges/{{CHARGE_ID}} \ -u "[redacted-stripe-test-secret]:"
```

Response

```
{ "id": "ch_3MmlLrLkdIwHu7ix0snN0B15", "object": "charge", "amount": 1099, "amount_captured": 1099, "amount_refunded": 0, "application": null, "application_fee": null, "application_fee_amount": null, "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy", "billing_details": { "address": { "city": null, "country": null, "line1": null, "line2": null, "postal_code": null, "state": null }, "email": null, "name": null, "phone": null }, "calculated_statement_descriptor": "Stripe", "captured": true, "created": 1679090539, "currency": "usd", "customer": null, "description": null, "disputed": false, "failure_balance_transaction": null, "failure_code": null, "failure_message": null, "fraud_details": {}, "livemode": false, "metadata": {}, "on_behalf_of": null, "outcome": { "network_status": "approved_by_network", "reason": null, "risk_level": "normal", "risk_score": 32, "seller_message": "Payment complete.", "type": "authorized" }, "paid": true, "payment_intent": null, "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR", "payment_method_details": { "card": { "brand": "visa", "checks": { "address_line1_check": null, "address_postal_code_check": null, "cvc_check": null }, "country": "US", "exp_month": 3, "exp_year": 2024, "fingerprint": "mToisGZ01V71BCos", "funding": "credit", "installments": null, "last4": "4242", "mandate": null, "network": "visa", "three_d_secure": null, "wallet": null }, "type": "card" }, "receipt_email": null, "receipt_number": null, "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KOvG06AGMgZfBXyr1aw6LBa9vaaSRWU96d8qBwz9z2J_CObiV_H2-e8RezSK_sw0KISesp4czsOUlVKY", "refunded": false, "review": null, "shipping": null, "source_transfer": null, "statement_descriptor": null, "statement_descriptor_suffix": null, "status": "succeeded", "transfer_data": null, "transfer_group": null}
```

# List all charges

Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.

### Parameters

* #### 
 
 customerstring
 
 Only return charges for the customer specified by this customer ID.

### More parameters

* #### 
 
 createdobject
 
* #### 
 
 ending\_beforestring
 
* #### 
 
 limitinteger
 
* #### 
 
 payment\_intentstring
 
* #### 
 
 starting\_afterstring
 
* #### 
 
 transfer\_groupstringConnect only

### Returns

A dictionary with a `data` property that contains an array of up to `limit` charges, starting after charge `starting_after`. Each entry in the array is a separate charge object. If no more charges are available, the resulting array will be empty. If you provide a non-existent customer ID, this call raises an error.

GET /v1/charges

```
curl -G https://api.stripe.com/v1/charges \ -u "[redacted-stripe-test-secret]:" \ -d limit=3
```

Response

```
{ "object": "list", "url": "/v1/charges", "has_more": false, "data": [ { "id": "ch_3MmlLrLkdIwHu7ix0snN0B15", "object": "charge", "amount": 1099, "amount_captured": 1099, "amount_refunded": 0, "application": null, "application_fee": null, "application_fee_amount": null, "balance_transaction": "txn_3MmlLrLkdIwHu7ix0uke3Ezy", "billing_details": { "address": { "city": null, "country": null, "line1": null, "line2": null, "postal_code": null, "state": null }, "email": null, "name": null, "phone": null }, "calculated_statement_descriptor": "Stripe", "captured": true, "created": 1679090539, "currency": "usd", "customer": null, "description": null, "disputed": false, "failure_balance_transaction": null, "failure_code": null, "failure_message": null, "fraud_details": {}, "livemode": false, "metadata": {}, "on_behalf_of": null, "outcome": { "network_status": "approved_by_network", "reason": null, "risk_level": "normal", "risk_score": 32, "seller_message": "Payment complete.", "type": "authorized" }, "paid": true, "payment_intent": null, "payment_method": "card_1MmlLrLkdIwHu7ixIJwEWSNR", "payment_method_details": { "card": { "brand": "visa", "checks": { "address_line1_check": null, "address_postal_code_check": null, "cvc_check": null }, "country": "US", "exp_month": 3, "exp_year": 2024, "fingerprint": "mToisGZ01V71BCos", "funding": "credit", "installments": null, "last4": "4242", "mandate": null, "network": "visa", "three_d_secure": null, "wallet": null }, "type": "card" }, "receipt_email": null, "receipt_number": null, "receipt_url": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTTJKVGtMa2RJd0h1N2l4KOvG06AGMgZfBXyr1aw6LBa9vaaSRWU96d8qBwz9z2J_CObiV_H2-e8RezSK_sw0KISesp4czsOUlVKY", "refunded": false, "review": null, "shipping": null, "source_transfer": null, "statement_descriptor": null, "statement_descriptor_suffix": null, "status": "succeeded", "transfer_data": null, "transfer_group": null } ]}
```
