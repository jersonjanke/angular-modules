import headerHtml from './header.html';
import headerCtrl from './header.controller';

let headerComponent = {
    template: headerHtml,    
    controller: headerCtrl,
    controllerAs: 'vm',
    bindings: {
    name: '='
  }
}

export default headerComponent;