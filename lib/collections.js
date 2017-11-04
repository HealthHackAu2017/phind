import {Mongo} from 'meteor/mongo';


export const Tasks = new Mongo.Collection('tasks');
export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');
export const Diaries = new Mongo.Collection('diaries');
export const Stresslevels = new Mongo.Collection('stress_levels');
export const Questions = new Mongo.Collection('questions');
export const Taskconnections = new Mongo.Collection('task_connections');