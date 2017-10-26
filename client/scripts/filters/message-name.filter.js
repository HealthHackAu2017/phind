import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';
 
export default class MessageNameFilter extends Filter {
  filter(message) {
    if (!message) return;
 
    let otherUser = Meteor.users.findOne(message.userId);
    let hasName = otherUser && otherUser.profile && otherUser.profile.name;
 
    return hasName ? otherUser.profile.name : message.name || ' ';
  }
}
 
MessageNameFilter.$name = 'messageName';