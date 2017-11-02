import { Meteor } from 'meteor/meteor';
import { Chats, Messages, Tasks, Diaries} from '../lib/collections';
 
Meteor.publish('users', function() {
  return Meteor.users.find({}, { fields: { profile: 1 } });
});


Meteor.publishComposite('chats', function() {
  if (!this.userId) return;
 
  return {
    find() {
      return Chats.find({});
    },
    children: [
      {
        find(chat) {
          return Messages.find({ chatId: chat._id });
        }
      },
      {
        find(chat) {
          const query = { _id: { $in: chat.userIds } };
          const options = { fields: { profile: 1 } };
 
          return Meteor.users.find(query, options);
        }
      }
    ]
  };
});

Meteor.publishComposite('tasks', function() {
  if (!this.userId) return;
 
  return {
    find() {
      return Tasks.find({});
    },
    children: [
      
    ]
  };
});

Meteor.publishComposite('diaries', function() {
  if (!this.userId) return;
 
  return {
    find() {
      return Diaries.find({userId : this.userId});
    },
    children: [
      
    ]
  };
});