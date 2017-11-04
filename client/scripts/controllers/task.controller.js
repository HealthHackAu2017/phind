import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Tasks, Taskconnections, Chats} from '../../../lib/collections';
 
export default class TaskCtrl extends Controller {
  constructor() {
    super(...arguments);
 	
    this.taskId = this.$stateParams.taskId;
    this.subscribe('tasks_connections');
    this.helpers({
      data() {
        return Tasks.findOne(this.taskId);
      },
      currentchat(){
        return Chats.findOne({taskId : this.taskId});
      }
    });

    this.autorun(() => {
      this.connection = Taskconnections.findOne({taskId : this.taskId});
      this.task = Tasks.findOne({_id : this.taskId})

      for (var key in this.task) {
          if (this.task.hasOwnProperty(key)) {
              if(key == "min_people"){
                 this.min_people = this.task[key];
              }
          } 
      }
      if (this.connection){
        for (var key in this.connection) {
            if (this.connection.hasOwnProperty(key)) {
                if(key == "connectedIds"){
                   this.connected_peoplelength = this.connection[key].length + 1
                   this.connection_ids = this.connection[key]
                }
            } 
        }
      }else{
        this.connected_peoplelength = 0
      }

      if(this.connection){
        if(this.connection_ids.length > 0){
          for (var i = 0; i < this.connection_ids.length; i++) {

            console.log(this.connection_ids[i] == this.currentUser._id)

            if(this.connection_ids[i] == this.currentUser._id){
              if (this.connected_peoplelength >= this.min_people){
                this.showchatbutton = true;
              }else{
                this.needed_people = this.min_people - this.connected_peoplelength
                this.showchatbutton = false;
              }
              this.connected = true;
              break;
            }else{
              if (this.connected_peoplelength >= this.min_people){
                this.showconnectbutton = true;
              }else{
                this.needed_people = this.min_people - this.connected_peoplelength
                this.showchatbutton = false;
              }
            }
          }
        }
      }else{
         this.needed_people = this.min_people - this.connected_peoplelength
      }
    });
  }

  connect(){
    if (_.isEmpty(this.taskId)) return;
    this.callMethod('updateConnection', this.taskId);

    this.connection = Taskconnections.findOne({taskId : this.taskId});
      this.task = Tasks.findOne({_id : this.taskId})

      for (var key in this.task) {
          if (this.task.hasOwnProperty(key)) {
              if(key == "min_people"){
                 console.log(this.task[key]);
                 this.min_people = this.task[key];
              }
          } 
      }

      for (var key in this.connection) {
          if (this.connection.hasOwnProperty(key)) {
              if(key == "connectedIds"){
                 console.log(this.connection[key]);
                 this.connected_peoplelength = this.connection[key].length + 1
              }
          } 
      }

      if (this.connected_peoplelength >= this.min_people){
        let chat = Chats.findOne({"taskId": this.taskId});
        if (chat) {
          var move = false
          for (var i = 0; i < chat.userIds.length; i++) {
            if(chat.userIds[i] == this.currentUser._id){
              move = true;
              break;
            }
          }
          if(move){
            this.showchatbutton = true
          }else{
            this.callMethod('updateChatUser', chat._id, (err, chatId) => {
              if (err) return this.handleChatError(err);
             this.showchatbutton = true
            });
          }
        }else{
          this.callMethod('newTaskChat', this.taskId, this.task.userId, this.task.title, (err, chatId) => {
            if (err) return this.handleChatError(err);
            this.showchatbutton = true
          });
        } 
      }else{
        this.needed_people = this.min_people - this.connected_peoplelength
        this.showchatbutton = false
      }
  }
  joinchat(chatId){
     this.$state.go('tab.chat', { chatId });
  }
}
 
TaskCtrl.$name = 'TaskCtrl';
TaskCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log', '$state'];
