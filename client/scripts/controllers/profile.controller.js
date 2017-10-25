import { _ } from 'meteor/underscore';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class ProfileCtrl extends Controller {
  constructor() {
    super(...arguments);
 
    const profile = this.currentUser && this.currentUser.profile;
    this.name = profile ? profile.name : '';
    this.division = profile ? profile.division : '';
    this.school = profile ? profile.school : '';
    console.log(this)
  }

  skip(){
    this.$state.go('tab.tasks');
  }
  updatePicture () {
    MeteorCameraUI.getPicture({ width: 60, height: 60 }, (err, data) => {
      if (err) return this.handleError(err);
 
      this.$ionicLoading.show({
        template: 'Updating picture...'
      });
 
      this.callMethod('updatePicture', data, (err) => {
        this.$ionicLoading.hide();
        this.handleError(err);
      });
    });
  }

  updateName() {
    if (_.isEmpty(this.name)) return;
 
    this.callMethod('updateName', this.name, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }

  updateDiv() {
    if (_.isEmpty(this.division)) return;
 
    this.callMethod('updateDiv', this.division, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }
 
  updateSchool() {
    if (_.isEmpty(this.school)) return;
 
    this.callMethod('updateSchool', this.school, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }
  next(){
     this.updateName();
     this.updateDiv();
     this.updateSchool();
     this.$state.go('tab.tasks');
  }

  handleError(err) {
    if (err.error == 'cancel') return;
    this.$log.error('Profile save error ', err);
 
    this.$ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
 
ProfileCtrl.$name = 'ProfileCtrl';
ProfileCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];