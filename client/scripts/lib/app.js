import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import 'angular-bootstrap-datetimepicker';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader'
import { Meteor } from 'meteor/meteor';

import ChatsCtrl from '../controllers/chats.controller';
import TasksCtrl from '../controllers/tasks.controller';
import ChatCtrl from '../controllers/chat.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingsCtrl from '../controllers/settings.controller';
import LoginCtrl from '../controllers/login.controller';
import NewChatService from '../services/new-chat.service';
import NewTaskService from '../services/new-task.service';
import ChatPictureFilter from '../filters/chat-picture.filter';
import InputDirective from '../directives/input.directive'
import NewChatCtrl from '../controllers/new-chat.controller';
import NewTaskCtrl from '../controllers/new-task.controller';
import CalendarFilter from '../filters/calendar.filter'
import ChatNameFilter from '../filters/chat-name.filter';
import MessageNameFilter from '../filters/message-name.filter';
import Routes from '../routes';

const App = "Whatsapp";

Angular.module(App, [
	'angular-meteor',
	'angular-meteor.auth',
	'angularMoment',
	'ionic',
	'ui.bootstrap.datetimepicker'
	]);

new Loader(App)
	.load(ChatsCtrl)
	.load(TasksCtrl)
	.load(ProfileCtrl)
	.load(ChatCtrl)
	.load(NewChatCtrl)
	.load(NewTaskCtrl)
	.load(SettingsCtrl)
	.load(LoginCtrl)
	.load(MessageNameFilter)
	.load(ChatNameFilter)
	.load(ChatPictureFilter)
	.load(NewChatService)
	.load(NewTaskService)
	.load(ConfirmationCtrl)
	.load(CalendarFilter)
	.load(Routes);

if(Meteor.isCordova){
	Angular.element(document).on('deviceready', onReady);
}else{
	Angular.element(document).ready(onReady);
}

function onReady(){
	Angular.bootstrap(document, [App]);
}