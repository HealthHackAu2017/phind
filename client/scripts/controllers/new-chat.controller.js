import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class NewChatCtrl extends Controller {
  constructor() {
    super(...arguments);
 
    this.subscribe('users');
    
    this.helpers({
      users() {
        users = [{"name" : "Riya", "_id" : "567"}, {"name" : "Omkar", "_id" : "789"}]
        return users
      }
    });
  }
 
  newChat(userId) {
    chatId = "xyz"
    this.$state.go('tab.chat', { chatId });
  }
 
  hideNewChatModal() {
    this.NewChat.hideModal();
  }
 
  goToChat(chatId) {
    chatId = "xyz"
    this.$state.go('tab.chat', { chatId });
  }
}
 
NewChatCtrl.$name = 'NewChatCtrl';
NewChatCtrl.$inject = ['$state', 'NewChat', '$ionicPopup', '$log'];