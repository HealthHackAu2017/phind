import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Stresslevels, Questions } from '../../../lib/collections';
 
export default class StressLevelCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.helpers({
      data() {
        return Stresslevels.find();
      },
      stress(){
        
      },
      questions(){        
        const questions= Questions.find({},{skip: Math.random()  * Questions.find().count()});
        return questions;
      }
    });
  }

  submitAnswer(value, text, id){
    this.$state.go('tab.diary');
    //this.callMethod('submitAnswer', value, text, id);
    
  }
}
 
StressLevelCtrl.$name = 'StressLevelCtrl';
StressLevelCtrl.$inject = ['$stateParams', '$timeout', '$log', '$state'];
