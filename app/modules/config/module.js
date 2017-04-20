import angular from 'angular';
import routing from './routes';
import componentHello from '../hello/hello.component';
import serviceHello from '../hello/hello.service';
import componentWorld from '../world/world.component';
import serviceWorld from '../world/world.service';

var exports = {
    name: 'modules'
}

angular
  .module(exports.name, [])
  .component('hello', componentHello)
  .component('world', componentWorld)
  .service('helloService', serviceHello)    
  .service('worldService', serviceWorld)  
  .config(routing);

export default exports;
