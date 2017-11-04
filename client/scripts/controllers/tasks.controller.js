import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

import { Tasks } from '../../../lib/collections';
import { Chats, Stresslevels } from '../../../lib/collections';

export default class TasksCtrl extends Controller {
  constructor() {
    super(...arguments);
 	this.helpers({
      data() {
        return Tasks.find();
      },
      stress(){
        var d = new Date();
        d.setHours(0,0,0,0);
        var end = new Date();
        end.setHours(0,0,0,0);
        end.setHours(24,0,0,0);
        const stresslevel = Stresslevels.findOne({createdAt : {'$gte' : d, '$lt' : end}})
        if (stresslevel){
          return true
        }else{
          return false
        }
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

  /*confirmgroupchat(taskID){
    var myPopup = this.$ionicPopup.show({
        title: 'Confirm?',
        this:this,
        buttons: [
            { text: 'Cancel' }, {
               text: '<b>Confirm</b>',
               type: 'button-positive',
               onTap: function(e) {
                  newgroupChat(taskID)
               }
            }
        ]
      });
  }*/

  newgroupChat(taskId) {
    this.$state.go('tab.task', { taskId });
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
TasksCtrl.$inject = ['NewTask','$state','$ionicPopup'];