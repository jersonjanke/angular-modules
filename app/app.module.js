import angular from 'angular';
import sass from './assets/main.scss'
import commons from './commons/module';
import modules from './modules/config/module';

angular.module('app', [  
  commons.name,  
  modules.name
]);
