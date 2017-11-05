import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class ConfirmationCtrl extends Controller {
  constructor() {
    super(...arguments);
 
    this.phone = this.$state.params.phone;
  }
 
  confirm() {
      this.$state.go('profile');
  }
}
 
ConfirmationCtrl.$name = 'ConfirmationCtrl';
ConfirmationCtrl.$inject = ['$state', '$ionicPopup', '$log'];