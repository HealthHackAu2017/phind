import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class SettingsCtrl extends Controller {
  logout() {
      this.$state.go('login');
  }
}
 
SettingsCtrl.$inject = ['$state', '$ionicPopup', '$log'];