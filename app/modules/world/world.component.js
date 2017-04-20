import worldHtml from './world.html';

let worldComponent = {
  template: worldHtml,
  controllerAs: 'vm',
  controller: function(worldService, toastr) {    
    const vm = this;
    vm.title = worldService.title();   
    toastr.success('Hello world!', 'Toastr fun!'); 
  }

}

export default worldComponent;
