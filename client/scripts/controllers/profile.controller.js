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
    this.nickname = profile ? profile.nickname : '';
    this.country = profile ? profile.country : '';
    this.institute = profile ? profile.institute : '';
    this.years_spent =  profile ? profile.years_spent : '';
    this.goal =  profile ? profile.goal : '';
    this.six_word =  profile ? profile.six_word : '';

    this.study_area = [{"text" : "Arts", "checked" : false},{"text" : "Design & Architecture", "checked" : false},{"text" : "Music", "checked" : false},{"text" : "Law", "checked" : false},{"text" : "Business", "checked" : false},{"text" : " Economics", "checked" : false},{"text" : " Information Technologies", "checked" : false},{"text" : "Statistics & Data", "checked" : false},{"text" : "Engineering", "checked" : false},{"text" : "Science & Mathematics", "checked" : false},{"text" : "Medicine and Biomedical Sciences", "checked" : false},{"text" : "Nursing", "checked" : false},{"text" : " Pharmacy", "checked" : false},{"text" : " Allied Health", "checked" : false},{"text" : "Social Science", "checked" : false},{"text" : "Environmental Science", "checked" : false}]
      for (var i = 0; i < this.study_area.length; i++) {
        if (profile.study_area != undefined)
        for (var j = 0; j < profile.study_area.length; j++) {
          if(profile.study_area[j].text == this.study_area[i].text){
            this.study_area[i] = profile.study_area[j]
          }
        }
      }
    this.milestone = [{"text" : "Commencement", "checked" : false},{"text" : "Confirmation", "checked" : false},{"text" : "Mid-Candituture", "checked" : false},{"text" : "Thesis Review", "checked" : false},{"text" : "Thesis Submission", "checked" : false},{"text" : "Conferred", "checked" : false}]
      for (var i = 0; i < this.milestone.length; i++) {
        if (profile.milestone != undefined)
        for (var j = 0; j < profile.milestone.length; j++) {
          if(profile.milestone[j].text == this.milestone[i].text){
            this.milestone[i] = profile.milestone[j]
          }
        }
      }
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

  updateNickName() {
    if (_.isEmpty(this.nickname)) return;
 
    this.callMethod('updateNickname', this.nickname, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }
  updateCountry() {
    if (_.isEmpty(this.country)) return;
 
    this.callMethod('updateCountry', this.country, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }

  updateInstitute() {
    if (_.isEmpty(this.institute)) return;
 
    this.callMethod('updateInstitute', this.institute, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }

  updateYears() {
    if (_.isEmpty(this.years_spent)) return;
 
    this.callMethod('updateyearsSpent', this.years_spent, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }

  studyarea(){
    var json = angular.copy( this.study_area );
    this.callMethod('updateStudyArea', json, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }
  mstone_achived(){
    var json = angular.copy( this.milestone );
    this.callMethod('updateMilestone', json, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }
  updateGoal(){
    if (_.isEmpty(this.goal)) return;
 
    this.callMethod('updateGoal', this.goal, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }
  updateSixWord(){
    if (_.isEmpty(this.six_word)) return;
 
    this.callMethod('updateSixword', this.six_word, (err) => {
      if (err) return this.handleError(err);
      //this.$state.go('tab.chats');
    });
  }




  next(){
     this.updateName();
     this.updateDiv();
     this.updateSchool();
     this.updateNickName();
     this.updateCountry();
     this.updateInstitute();
     this.updateYears();
     this.studyarea();
     this.mstone_achived();
     this.updateGoal();
     this.updateSixWord();
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