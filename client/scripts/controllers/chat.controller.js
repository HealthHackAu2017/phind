import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class ChatCtrl extends Controller {
  constructor() {
    super(...arguments);
    
    this.chatId = this.$stateParams.chatId;
 	  this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
    this.isCordova = Meteor.isCordova;

    this.helpers({
   		messages() {
        var message = [{"text": "Hello", "type" : "text", "chatId": this.chatId, "userId" : "123", "timestamp" : new Date()},
        {"text": "Hiiii", "type" : "text", "chatId": this.chatId, "userId" : "567", "timestamp" : new Date()}
        ]
        return message
      },
      data() {
        chat  = {"taskId" : "abc", "_id" : "xyz", "userIds" : ["123", "567"], "name" : "Hiking"}
        return chat
      }
    });

    this.autorun(() => {
      this.currentuser = {}
      this.currentuser.Id = "123"
    });


    this.autoScroll();
  }
  autoScroll() {
    let recentMessagesNum = this.messages.length;
 
    this.autorun(() => {
      const currMessagesNum = this.getCollectionReactively('messages').length;
      const animate = recentMessagesNum != currMessagesNum;
      recentMessagesNum = currMessagesNum;
      this.scrollBottom(animate);
    });
  }

  sendPicture() {
  }

  sendMessage() {
  	newMessage = {
      text: this.message,
      type: 'text',
      chatId: this.chatId,
      userId:"123",
      timestamp : new Date()
    }
 
    this.messages.push(newMessage)
  }
  inputUp () {
    if (this.isIOS) {
      this.keyboardHeight = 216;
    }
 
    this.scrollBottom(true);
  }
 
  inputDown () {
    if (this.isIOS) {
      this.keyboardHeight = 0;
    }
 
    this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }
 
  closeKeyboard () {
    if (this.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  }
 
  scrollBottom(animate) {
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    }, 300);
  }
  remove(chat) {
    //this.callMethod('removeChat', chat._id);
  }
}
 
ChatCtrl.$name = 'ChatCtrl';
ChatCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log'];
