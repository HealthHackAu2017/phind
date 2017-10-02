import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';
 
export default class NewTaskCtrl extends Controller {
  constructor() {
    super(...arguments);
    console.log("here");
    this.subscribe('tasks');
    
  }
 
  addTask(text) {

    this.callMethod('insertTask', text, (err, taskId) => {
      this.hideNewTaskModal();
      if (err) return this.handleError(err);
    });
  }
 
  hideNewTaskModal() {
    this.NewTask.hideModal();
  }
 
 
  handleError(err) {
    this.$log.error('New task creation error ', err);
 
    this.$ionicPopup.alert({
      title: err.reason || 'New task creation failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
 
NewTaskCtrl.$name = 'NewTaskCtrl';
NewTaskCtrl.$inject = ['$state', 'NewTask', '$ionicPopup', '$log'];