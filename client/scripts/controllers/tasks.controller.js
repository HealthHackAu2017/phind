import Moment from 'moment';

import { Controller } from 'angular-ecmascript/module-helpers';

import { Tasks } from '../../../lib/collections';

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
}
 
TasksCtrl.$name = 'TasksCtrl';
TasksCtrl.$inject = ['NewTask'];