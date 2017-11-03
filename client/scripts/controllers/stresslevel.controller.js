import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Stresslevels } from '../../../lib/collections';
 
export default class StressLevelCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.helpers({
      data() {
        return Stresslevels.find();
      },
      stress(){
        var d = new Date();
        d.setHours(0,0,0,0);
        var end = new Date();
        end.setHours(0,0,0,0);
        end.setHours(24,0,0,0);
        const stresslevel = Stresslevels.findOne({createdAt : {'$gte' : d, '$lt' : end}})
        console.log(stresslevel)
        if (stresslevel){
          return stresslevel
        }else{
          var k = {}
          k.value = 0
          return k
        }
      }
    });
  }

  setvalue(value){
    if (value >= 0 && value <= 30){
      this.stress.status = "Low"
    }else if (value > 30 && value < 70){
      this.stress.status = "Moderate"
    }else if (value >= 70 && value <= 100){
      this.stress.status = "HIGH"
    }

    console.log("newfunc")

    this.callMethod('addStresslevel', value, this.stress.status);
  }
}
 
StressLevelCtrl.$name = 'StressLevelCtrl';
StressLevelCtrl.$inject = ['$stateParams', '$timeout', '$log'];
