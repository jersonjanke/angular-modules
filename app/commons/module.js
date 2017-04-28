import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';
import bootstrap from 'angular-bootstrap-npm';

var exports = {
    name: 'commons'
}

angular.module(exports.name, [uirouter, ngAnimate, toastr, 'moment-picker', bootstrap]);

export default exports;