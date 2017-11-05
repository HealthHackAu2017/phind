import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class StressLevelCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.helpers({
      data() {
      },
      stress(){
        
      },
      questions(){   
        questions = [{topic: "Sleep",
      structured_question: "How tired do you feel?",
      input_method: 0,
      positive_end: "I am a super Hero !",
      negative_end: "Falling asleep at my desk !",
      follow_up_question: "What is your biggest reason for lost sleep?"},
        {topic: "Procrastination",
      structured_question: "What is your procrastination level?",
      input_method: 0,
      positive_end: "I'm organised and on-time",
      negative_end: "I'll talk about it later",
      follow_up_question: "What is the biggest task on your mind?"},
        {topic: "Stress",
      structured_question: "How nervous or stressed do you feel?",
      input_method: 0,
      positive_end: "Completely Chilled",
      negative_end: "My hair is falling out",
      follow_up_question: "What is your bigges stressor at the moment?"},
        ]
        return questions;
      }
    });
  }

  submitAnswer(value, text, binary, id, type){
    this.$state.go('tab.diary');   
  }
}
 
StressLevelCtrl.$name = 'StressLevelCtrl';
StressLevelCtrl.$inject = ['$stateParams', '$timeout', '$log', '$state'];
