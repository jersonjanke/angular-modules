import footerHtml from './footer.html';

let footerComponent = {
    template: footerHtml,
    controller: () => { },
    controllerAs: 'vm',
    bindings: {
        title: '@'
    }
}

export default footerComponent;