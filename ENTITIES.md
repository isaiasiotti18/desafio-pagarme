# ENTIDADES DA APLICAÇÃO

## Transaction

### Attributes

* Transaction_Id
* Value
* Description
* Payment_Method (Entity PaymentMethod)
  * Card_Type
  * Card_Number
  * Cardhold_Name
  * Valid_Thru
  * Security_Code

## Customer

### Attributes

* Id
* Name
* CPF
* Email
* Password
* Paid_Balance
* Waiting_Funds

## Payment Method

### Attributes

* PaymentMethod_Id
* Card_Type
* Customer_Id
* Card_Number
* Cardhold_Name
* Valid_Thru
* Security_Code

## Payables

### Attributes

* Payable_Id
* Customer_Id
* Status
* Payment_Date
* Fee
