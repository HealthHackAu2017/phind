import Moment from 'moment';

import { Controller } from 'angular-ecmascript/module-helpers';

import { Tasks } from '../../../lib/collections';
import { Chats } from '../../../lib/collections';

export default class TasksCtrl extends Controller {
  constructor() {
    super(...arguments);
 	this.helpers({
      data() {
        return Tasks.find();
      }
    });
  }
  newTaskModal() {
    this.NewTask.showModal();
  }
  setChecked(task) {
    this.callMethod('updateTask', task._id, (err, taskId) => {
      if (err) return this.handleError(err);
    });
  }
  removeTask(task) {
    this.callMethod('removeTask', task._id, (err, taskId) => {
      if (err) return this.handleError(err);
    });
  }

  newgroupChat(taskID) {

    check(taskID, String);
    let findtask = Tasks.findOne(taskID);
 
    if (!findtask) {
      throw new Meteor.Error('task-not-exists',
        'Chat\'s task not exists');
    }

    let chat = Chats.findOne({"taskId": findtask._id});
 
    if (chat) {
      var move = false
      for (var i = 0; i < chat.userIds.length; i++) {
        if(chat.userIds[i] == this.currentUser._id){
          move = true;
          break;
        }
      }

      if(move){
        return this.goToChat(chat._id);
      }else{
        this.callMethod('updateChatUser', chat._id, (err, chatId) => {
          if (err) return this.handleChatError(err);
          this.goToChat(chatId);
        });
      }
    } 
    this.callMethod('newTaskChat', taskID, findtask.userId, findtask.title, (err, chatId) => {
      if (err) return this.handleChatError(err);
      this.goToChat(chatId);
    });
  }

  goToChat(chatId) {
    this.$state.go('tab.chat', { chatId });
  }

  handleChatError(err) {
    this.$log.error('New task creation error ', err);
 
    this.$ionicPopup.alert({
      title: err.reason || 'New chat creation failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

}
 
TasksCtrl.$name = 'TasksCtrl';
TasksCtrl.$inject = ['NewTask','$state'];