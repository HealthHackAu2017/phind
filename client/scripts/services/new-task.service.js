import { Service } from 'angular-ecmascript/module-helpers';
 
import newTaskTemplateUrl from '../../templates/new-task.html';
 
export default class NewTaskService extends Service {
  constructor() {
    super(...arguments);
 
    this.templateUrl = newTaskTemplateUrl;
  }
 
  showModal() {
    this.scope = this.$rootScope.$new();
 
    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: this.scope
    })
    .then((modal) => {
      this.modal = modal;
      this.modal.show();
    });
  }
 
  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }
}
 
NewTaskService.$name = 'NewTask';
NewTaskService.$inject = ['$rootScope', '$ionicModal'];