import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';


export default class TasksCtrl extends Controller {
  constructor() {
    super(...arguments);
 	  this.helpers({
      data() {
        sampledate = new Date()
        sampledate = sampledate.setDate(20);
        var sample = [{"_id" : "abc", "title": "Hiking", "userId" : "123", "createdAt" : new Date(), "scheduledAt" :sampledate,"location":"Australia", "min_people":2,"max_people":10},{"_id" : "psk", "title": "Running", "userId" : "123", "createdAt" : new Date(), "scheduledAt" :sampledate,"location":"Australia", "min_people":2,"max_people":10},{"_id" : "pk", "title": "Movie Time", "userId" : "123", "createdAt" : new Date(), "scheduledAt" :sampledate,"location":"Australia", "min_people":2,"max_people":10}];
        return sample
      }
    });
  }
  newTaskModal() {
    this.NewTask.showModal();
  }

  removeTask(task) {

  }

  newgroupChat(taskId) {
    this.$state.go('tab.task', { taskId });
  }

  goToChat(chatId) {
    this.$state.go('tab.chat', { chatId });
  }
}
 
TasksCtrl.$name = 'TasksCtrl';
TasksCtrl.$inject = ['NewTask','$state','$ionicPopup'];