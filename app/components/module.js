import angular from 'angular';
import headerComponent from './header/header.component';
import footerComponent from './footer/footer.component';

const exports = { name: 'component' }

angular
    .module(exports.name, [])
    .component('header', headerComponent)
    .component('footer', footerComponent)

export default exports;