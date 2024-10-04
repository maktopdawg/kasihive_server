investmentRequestModel
investorModel
businessModel
businessPerformanceModel - Keeps track of business performance
withdrawalRequestModel - Will keep track of withdrawl requests from users
virtualWalletModel - Will keep track of the users various investments on their account
investmentModel
transferModel
notificationsModel
reviewModel
learningModuleModel
achievementModel
depositModel

-----------------------------------------------------
Algorithms:

Calculating profits per investor
Calculate business valuation
Generating username
Calculating trends
Calculating rating **based on**(engagement, popularity, track history, transaction history)
Validating ID


------------------------------------------------------
Pages:

Register Page
Login Page
Home Page - Display
Profile Page - Dashboard for the user / business


--------------------------------------------------------

Investment Request Model:

Business will create their account (registering the whole business)
One it has been registered they will need to do the assessment
Once done it will be approved and be accessible by investors on the platform
Once it has been approved, it will be able to create new investment requests
They must create an investment request to receive funding (it's not automatically available)
Only 2 investment requests will be available at a single time / per business


Possible schema:

nameOfInvestmentRequest;
description;
amountRequested;
amountReceived;
returnOnInvestment;
duration;
createdDate;
closingDate;
arrayOfInvestors[username, amountInvested];
status; ['ACTIVE', 'FUNDED', 'CLOSED', 'CANCELLED']

performance; = Array of data on weekly performance => Monday To Sunday



-----------------------

Virtual Wallet - done
Investment model - working on it
Business model - working on it
Investment option - not done yet
Withdrawl - not done yet