import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';

var exports = {
    name: 'commons'
}

angular.module(exports.name, [uirouter, ngAnimate, toastr, 'moment-picker']);

export default exports;