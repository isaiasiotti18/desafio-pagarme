# ENTIDADES DA APLICAÇÃO

## Transaction

### Attributes

* Value
* Description
* Payment_Method (Entity PaymentMethod)
  * Card_Type
  * Card_Number
  * Cardhold_Name
  * Valid_Thru
  * Security_Code

## Client

### Attributes

* Id
* Name
* CPF
* Email
* Password
* Balance

## Payment Method

### Attributes

* PaymentMethod_Id
* Card_Type
* Client_Id
* Card_Number
* Cardhold_Name
* Valid_Thru
* Security_Code

## Payables

### Attributes

* Payable_Id
* Client_Id
* Status
* Payment_Date
* Fee
