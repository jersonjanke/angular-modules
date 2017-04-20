import helloHtml from './hello.html';

let helloComponent = {
  template: helloHtml,
  controllerAs: 'vm',
  controller: function(helloService, toastr) {    
    const vm = this;
    vm.title = helloService.title();   
    toastr.success('Hello world!', 'Toastr fun!'); 
  }

}

export default helloComponent;
