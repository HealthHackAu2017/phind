import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(function(){
	if (Meteor.users.find().count() != 0) return;
	Accounts.createUserWithPhone({
    phone: '+972501234567',
    profile: {
      name: 'Rohit'
    }
  });
 
  Accounts.createUserWithPhone({
    phone: '+972501234568',
    profile: {
      name: 'Ravi'
    }
  });
 
  Accounts.createUserWithPhone({
    phone: '+972501234569',
    profile: {
      name: 'Rashi'
    }
  });
})