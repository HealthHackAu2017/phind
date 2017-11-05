import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class LoginCtrl extends Controller {
  login() {
     this.$state.go('confirmation', { phone: this.phone });
  }
}
 
LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
