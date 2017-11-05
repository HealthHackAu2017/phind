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
        return [{id: 1 , word: "failing", size: 4},
{id: 1 , word: "supervisor", size: 10},
{id: 1 , word: "want", size: 5}, 
{id: 1 , word: "family", size: 1}, 
{id: 1 , word: "jump", size: 2}, 
{id: 1 , word: "doesnt", size: 3}, 
{id: 1 , word: "kill", size: 1}, 
{id: 1 , word: "thesis", size: 4}, 
{id: 1 , word: "girlfriend", size: 4}, 
{id: 1 , word: "reaseach", size: 4}, 
{id: 1 , word: "dont", size: 4}, 
{id: 1 , word: "hiking", size: 2}, 
{id: 1 , word: "electricity", size: 3}, 
{id: 1 , word: "failed", size: 2}, 
{id: 1 , word: "window", size: 2}, 
{id: 1 , word: "pile", size: 3 },
{id: 1 , word: "work-mates", size: 4}, 
{id: 1 , word: "coffee", size: 8}, 
{id: 1 , word: "somebody", size: 2},
{id: 1 , word: "I", size: 5}, 
{id: 1 , word: "stop", size: 3}, 
{id: 1 , word: "punch", size: 2}, 
{id: 1 , word: "boss", size: 3}, 
{id: 1 , word: "pressure", size: 1}, 
{id: 1 , word: "workload", size: 2}, 
{id: 1 , word: "care", size: 3}, 
{id: 1 , word: "broke-up", size: 4}, 
{id: 1 , word: "depressed", size: 3}, 
{id: 1 , word: "work", size: 17}, 
{id: 1 , word: "sucks", size: 11}, 
{id: 1 , word: "project", size: 4}, 
{id: 1 , word: "tormenting", size: 4}, 
{id: 1 , word: "bills", size: 6}, 
{id: 1 , word: "scholarship", size: 3} 
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
