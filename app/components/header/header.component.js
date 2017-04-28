import headerHtml from './header.html';

let headerComponent = {
    template: headerHtml,    
    controller: () => {},
    controllerAs: 'vm',
    bindings: {
    title: '@'
  }
}

export default headerComponent;