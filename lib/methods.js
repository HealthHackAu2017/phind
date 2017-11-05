import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats, Messages, Tasks, Diaries, Stresslevels, Taskconnections} from '../lib/collections';
 
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
  insertTask(text, date, location, min, max) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a task.');
    }
 
    check(text, String);
    
    const task = {
      title: text,
      userId: this.userId,
      createdAt: new Date(),
      scheduledAt:new Date(date),
      location : location,
      min_people : min,
      max_people : max
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

  newStressAnswer(stress_answer) {

    console.log("is this?")

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }
    check(stress_answer, Match.OneOf(
      {
        answer: String,
        value: Number,
        questionId: String
      },
      {
        answer: String,
        check: Boolean,
        questionId: String
      }
    ));
    
    stress_answer.userId = this.userId;
    stress_answer.createdAt = new Date();
 
    const messageId = Stresslevels.insert(stress_answer);
 
    return messageId;
  },
  updateNickname(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(name, String);
 
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user nickname');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.nickname': name } });
  },
  updateCountry(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(name, String);
 
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user country');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.country': name } });
  },
  updateInstitute(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(name, String);
 
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user institute');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.institute': name } });
  },
  updateyearsSpent(years_spent){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(years_spent, String);
 
    if (years_spent.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user years spent');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.years_spent': years_spent } });
  },

  updateStudyArea(study_area){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
  
    if (study_area.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user study area');
    }
    return Meteor.users.update(this.userId, { $set: { 'profile.study_area': study_area } });
  },
  updateMilestone(milestone){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
  
    if (milestone.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user milestone');
    }
    return Meteor.users.update(this.userId, { $set: { 'profile.milestone': milestone } });
  },
  updateGoal(goal){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(goal, String);
 
    if (goal.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user years spent');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.goal': goal } });
  },
  updateSixword(word){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(word, String);
 
    if (word.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user years spent');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.word': word } });
  },
  updateConnection(taskId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    } 
    check(taskId, String);
    
    const taskconnection = Taskconnections.findOne({taskId: taskId});

    let findtask = Tasks.findOne(taskId);
 
    if (!findtask) {
      throw new Meteor.Error('task-not-exists',
        'Chat\'s task not exists');
    }

    var taskuserids = []
    if (!taskconnection){
      taskuserids.push(this.userId);
      const taskconnection = {
        userId: findtask.userId,
        taskId : taskId,
        connectedIds : taskuserids
      }
      return Taskconnections.insert(taskconnection);
    }else{
      taskuserids = taskconnection.connectedIds;
      taskuserids.push(this.userId);

      return Taskconnections.update({taskId : taskId}, { $set: { 'connectedIds': taskuserids}});
    }
  },

});