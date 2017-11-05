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

    if (profile){
      this.study_area = [{"text" : "Arts", "checked" : false},{"text" : "Design & Architecture", "checked" : false},{"text" : "Music", "checked" : false},{"text" : "Law", "checked" : false},{"text" : "Business", "checked" : false},{"text" : " Economics", "checked" : false},{"text" : " Information Technologies", "checked" : false},{"text" : "Statistics & Data", "checked" : false},{"text" : "Engineering", "checked" : false},{"text" : "Science & Mathematics", "checked" : false},{"text" : "Medicine and Biomedical Sciences", "checked" : false},{"text" : "Nursing", "checked" : false},{"text" : " Pharmacy", "checked" : false},{"text" : " Allied Health", "checked" : false},{"text" : "Social Science", "checked" : false},{"text" : "Environmental Science", "checked" : false}]
      for (var i = 0; i < this.study_area.length; i++) {
        if (profile.study_area != null && profile.study_area != undefined)
        for (var j = 0; j < profile.study_area.length; j++) {
          if(profile.study_area[j].text == this.study_area[i].text){
            this.study_area[i] = profile.study_area[j]
          }
        }
      }
    this.milestone = [{"text" : "Commencement", "checked" : false},{"text" : "Confirmation", "checked" : false},{"text" : "Mid-Candituture", "checked" : false},{"text" : "Thesis Review", "checked" : false},{"text" : "Thesis Submission", "checked" : false},{"text" : "Conferred", "checked" : false}]
      for (var i = 0; i < this.milestone.length; i++) {
        if (profile.milestone != null && profile.milestone != undefined)
        for (var j = 0; j < profile.milestone.length; j++) {
          if(profile.milestone[j].text == this.milestone[i].text){
            this.milestone[i] = profile.milestone[j]
          }
        }
      }
    }
  }

  skip(){
    this.$state.go('tab.tasks');
  }
  
  next(){
     this.$state.go('tab.tasks');
  }
}
 
ProfileCtrl.$name = 'ProfileCtrl';
ProfileCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];