import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
 
if (Meteor.settings && Meteor.settings.ACCOUNTS_PHONE) {
	console.log(Meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS)
  Accounts._options.adminPhoneNumbers = Meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS;
  Accounts._options.phoneVerificationMasterCode = Meteor.settings.ACCOUNTS_PHONE.MASTER_CODE;
}