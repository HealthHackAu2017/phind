import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class TaskCtrl extends Controller {
  constructor() {
    super(...arguments);
 	
    this.taskId = this.$stateParams.taskId;
    this.helpers({
      data() {
        sampledate = new Date()
        sampledate = sampledate.setDate(20);
        task = {"_id" : "abc", "title": "Hiking", "userId" : "123", "createdAt" : new Date(), "scheduledAt" :sampledate,"location":"Australia", "min_people":2,"max_people":10}
        return task
      },
      currentchat(){
        chat  = {"taskId" : "abc", "_id" : "xyz", "userIds" : ["123"]}
        return chat
      }
    });

    this.autorun(() => {
      this.needed_people = 3
    });
  }

  connect(){
    this.showchatbutton = true
  }
  joinchat(chatId){
     this.$state.go('tab.chat', { chatId });
  }
}
 
TaskCtrl.$name = 'TaskCtrl';
TaskCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log', '$state'];
