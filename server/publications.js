import { Meteor } from 'meteor/meteor';
import { Chats, Messages, Tasks, Diaries, Stresslevels, Questions, Taskconnections} from '../lib/collections';
 
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

Meteor.publishComposite('stresslevels', function() {
  if (!this.userId) return;
 
  return {
    find() {
      return Stresslevels.find({userId : this.userId});
    },
    children: [
      
    ]
  };
});

Meteor.publishComposite('tasks_connections', function() {
  if (!this.userId) return;
 
  return {
    find() {
      return Taskconnections.find({});
    },
    children: [
      
    ]
  };
});

Meteor.publishComposite('questions', function() {
  if (!this.userId) return;
 
  return {
    find() {
      const answers = Stresslevels.find({userId : this.userId});
      this.ids = []
      answers.forEach((a) => {
        this.ids.push(a.questionId)
      });

      const ques = Questions.find({});

      var allques = true

      ques.forEach((q) => {

        var ques_remain = false

        answers.forEach((a) => {
          if (q._id == a.questionId){
            ques_remain = true
          }
        });

        if (ques_remain == false){
          allques = false;
        }

      });

      if (allques){
        return Questions.find({});
      }else{
        return Questions.find({_id : {$nin : this.ids}});
      }
    },
    children: [
      
    ]
  };
});