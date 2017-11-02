import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats, Messages, Tasks, Diaries } from '../lib/collections';
 
Meteor.methods({
  newMessage(message) {
  	if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }
  	check(message, Match.OneOf(
      {
        text: String,
        type: String,
        chatId: String
      },
      {
        picture: String,
        type: String,
        chatId: String
      }
    ));
    
    message.userId = this.userId;
    message.timestamp = new Date();
 
    const messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });
 
    return messageId;
  },
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(name, String);
 
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user name');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  updateSchool(school) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update school.');
    }
 
    check(school, String);
 
    if (school.length === 0) {
      throw Meteor.Error('school-required', 'Error with your school');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.school': school } });
  },
  updateDiv(division) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update class.');
    }
 
    check(division, String);
 
    if (division.length === 0) {
      throw Meteor.Error('class-required', 'Error with your class');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.division': division } });
  },

  updateTask(taskId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(taskId, String);
    
    const task = Tasks.findOne(taskId);

    if (!task || task.userId !== this.userId) {
      throw new Meteor.Error('task-not-exists',
        'Task deos not exists');
    }

    return Tasks.update(taskId, { $set: { 'checked': !task.checked } });
  },
  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }
 
    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);
 
    if (!otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }
 
    const chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };
 
    const chatId = Chats.insert(chat);
 
    return chatId;
  },
  insertTask(text, date) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a task.');
    }
 
    check(text, String);
    
    const task = {
      title: text,
      userId: this.userId,
      createdAt: new Date(),
      scheduledAt:new Date(date)
    };
 
    const taskId = Tasks.insert(task);
 
    return taskId;
  },
  removeTask(taskId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to remove a chat.');
    }
 
    check(taskId, String);
 
    const task = Tasks.findOne(taskId);
 
    if (!task || task.userId !== this.userId) {
      throw new Meteor.Error('task-not-exists',
        'Task deos not exists');
    }
 
 
    return Tasks.remove({ _id: taskId });
  },
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to remove a chat.');
    }
 
    check(chatId, String);
 
    const chat = Chats.findOne(chatId);
 
    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }
 
    Messages.remove({ chatId: chatId });
 
    return Chats.remove({ _id: chatId });
  },
  updatePicture(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }
 
    check(data, String);
 
    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  },
  newTaskChat(tid, taskuserId, tasktitle) {

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    if (this.userId == taskuserId){
      const chat = {
      userIds: [this.userId],
      createdAt: new Date(),
      taskId : tid,
      taskName: tasktitle
      };
   
      const chatId = Chats.insert(chat);
   
      return chatId;
    }else{
      const chat = {
        userIds: [this.userId, taskuserId],
        createdAt: new Date(),
        taskId : tid,
        taskName: tasktitle
      };
   
      const chatId = Chats.insert(chat);
  
      return chatId;
    }
  },
  updateChatUser(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(chatId, String);
    
    const chat = Chats.findOne(chatId);

    if (!chat){
      throw new Meteor.Error('chat-not-exists',
        'Chat deos not exists');
    }

    var chatuserids = chat.userIds
    chatuserids.push(this.userId)
    return Chats.update(chatId, { $set: { 'userIds': chatuserids}});
  },
  newDiary(text) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a task.');
    }
 
    check(text, String);
    
    const diary = {
      content: text,
      userId: this.userId,
      createdAt: new Date()
    };
 
    const diaryId = Diaries.insert(diary);
 
    return diaryId;
  },
  removeDiary(dId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to remove a chat.');
    }
 
    check(dId, String);
 
    const diary = Diaries.findOne(dId);
 
    if (!diary) {
      throw new Meteor.Error('diary-not-exists',
        'Diary deos not exists');
    }
 
 
    return Diaries.remove({ _id: dId });
  },
});