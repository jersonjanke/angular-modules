import angular from 'angular';
import uirouter from 'angular-ui-router';

import example from './example/example.module';
import hello from './modules/config/module';

import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';


require('./assets/main.scss');

angular.module('app', [
  uirouter,  
  'example', 
  'modules', 
  'moment-picker',
  ngAnimate,
  toastr
]);
