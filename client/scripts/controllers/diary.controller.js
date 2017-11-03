import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Diaries } from '../../../lib/collections';
 
export default class DiaryCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.helpers({
      data() {
        return Diaries.find();
      }
    });
  }

  save(text){
    if (_.isEmpty(text)) return;
 
    this.callMethod('newDiary', text);
  }
  remove(d) {
    this.callMethod('removeDiary', d._id);
  }

}
 
DiaryCtrl.$name = 'DiaryCtrl';
DiaryCtrl.$inject = ['$stateParams', '$timeout', '$log'];
