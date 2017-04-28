import angular from 'angular';
import sass from './assets/main.scss';
import commons from './commons/module';
import component from './components/module';
import site from './modules/site/module';


angular.module('app', [  
  commons.name,    
  component.name,
  site.name
]);
