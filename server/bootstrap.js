import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Chats, Messages, Questions } from '../lib/collections';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(function(){
	if (Meteor.users.find().count() != 0){

  }else{
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
  }
  if (Questions.find().count()!=0){

  }else{
    Questions.insert({
      topic: "Sleep",
      structured_question: "How tired do you feel?",
      input_method: 0,
      positive_end: "I am a super Hero !",
      negative_end: "Falling asleep at my desk !",
      follow_up_question: "What is your biggest reason for lost sleep?"
    });
    Questions.insert({
      topic: "Procrastination",
      structured_question: "What is your procrastination level?",
      input_method: 0,
      positive_end: "I'm organised and on-time",
      negative_end: "I'll talk about it later",
      follow_up_question: "What is the biggest task on your mind?"
    });
    Questions.insert({
      topic: "Stress",
      structured_question: "How nervous or stressed do you feel?",
      input_method: 0,
      positive_end: "Completely Chilled",
      negative_end: "My hair is falling out",
      follow_up_question: "What is your bigges stressor at the moment?"
    });
    Questions.insert({
      topic: "Poverty",
      structured_question: "How poor do you feel?",
      input_method: 0,
      positive_end: "I'm as rich as Bill Gates",
      negative_end: "I'm living on 2 minute noodles",
      follow_up_question: "What is your biggest financial concern?"
    });
    Questions.insert({
      topic: "Confidence",
      structured_question: "How confident do you feel about your PhD?",
      input_method: 0,
      positive_end: "I'm going to be famous",
      negative_end: "Ready to quit",
      follow_up_question: "What is your biggest problem?"
    });
    Questions.insert({
      topic: "Time-Out",
      structured_question: "Have you taken some time out this week?",
      input_method: 1,
      follow_up_question: "What did you do?"
    });
  }
	

  

})