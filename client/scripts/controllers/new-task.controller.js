import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class NewTaskCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.newDateTime = new Date();
  }
 
  addTask(text, date, location, min, max) {
      this.hideNewTaskModal();
  }
 
  hideNewTaskModal() {
    this.NewTask.hideModal();
  }
}
 
NewTaskCtrl.$name = 'NewTaskCtrl';
NewTaskCtrl.$inject = ['$state', 'NewTask', '$ionicPopup', '$log'];