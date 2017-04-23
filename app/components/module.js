import angular from 'angular';
import headerComponent from './header/header.component';

const exports = { name: 'component' }

angular
    .module(exports.name, [])
    .component('header', headerComponent)

export default exports;