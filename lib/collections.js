import {Mongo} from 'meteor/mongo';


export const Tasks = new Mongo.Collection('tasks');
export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');