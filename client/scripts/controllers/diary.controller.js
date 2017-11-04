import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Diaries } from '../../../lib/collections';
 
export default class DiaryCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.helpers({
      data() {
        return Diaries.find();
      },
      color(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;


      },  
      words(){
        return [
            {id: 1, word: "oke", size: 1},
            {id: 2, word: "blabla", size: 6},
            {id: 3, word: "test", size: 7},
            {id: 4, word: "schaap", size: 2},
            {id: 5, word: "deployment", size: 10},
            {id: 6, word: "woord3", size: 3},
            {id: 7, word: "wogamalord4", size: 4},
            {id: 8, word: "woord5", size: 5},
            {id: 9, word: "woord8", size: 8},
            {id: 10, word: "woord9", size: 9},
            {id: 1, word: "oke", size: 1},
            {id: 2, word: "blabla", size: 6},
            {id: 3, word: "test", size: 7},
            {id: 4, word: "schaap", size: 2},
            {id: 5, word: "deployment", size: 10},
            {id: 6, word: "woord3", size: 3},
            {id: 7, word: "wogamalord4", size: 4},
            {id: 8, word: "woord5", size: 5},
            {id: 9, word: "woord8", size: 8},
            {id: 10, word: "woord9", size: 9},
            {id: 1, word: "oke", size: 1},
            {id: 2, word: "blabla", size: 6},
            {id: 3, word: "test", size: 7},
            {id: 4, word: "schaap", size: 2},
            {id: 5, word: "deployment", size: 10},
            {id: 6, word: "woord3", size: 3},
            {id: 7, word: "wogamalord4", size: 4},
            {id: 8, word: "woord5", size: 5},
            {id: 9, word: "woord8", size: 8},
            {id: 10, word: "woord9", size: 9},
            {id: 1, word: "oke", size: 1},
            {id: 2, word: "blabla", size: 6},
            {id: 3, word: "test", size: 7},
            {id: 4, word: "schaap", size: 2},
            {id: 5, word: "deployment", size: 10}
        ];
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
