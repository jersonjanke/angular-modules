import headerHtml from './header.html';

let headerComponent = {
    template: headerHtml,    
    controller: () => {},
    controllerAs: 'vm',
    bindings: {
    name: '='
  }
}

export default headerComponent;