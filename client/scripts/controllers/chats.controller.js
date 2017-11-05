import Moment from 'moment';

import { Controller } from 'angular-ecmascript/module-helpers';


export default class ChatsCtrl extends Controller {
  constructor() {
    super(...arguments);
 	  this.helpers({
      data() {
        var chats = [{"taskId" : "abc", "_id" : "xyz", "userIds" : ["123", "567"], "name" : "Hiking", "lastMessage" : {"text" : "whats going on", "timestamp" : new Date()}},
        {"_id" : "jkl", "userIds" : ["123", "567"], "name" : "Riya", "lastMessage" : {"text" : "hey", "timestamp" : new Date()}},
        {"_id" : "rmn", "userIds" : ["123", "789"], "name" : "Omkar", "lastMessage" : {"text" : "hello", "timestamp" : new Date()}}
        ]
        return chats
      }
    });
  }
  showNewChatModal() {
    this.NewChat.showModal();
  }
  remove(chat) {
    //this.callMethod('removeChat', chat._id);
  }
}
 
ChatsCtrl.$name = 'ChatsCtrl';
ChatsCtrl.$inject = ['NewChat'];