function helloRoutes($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('', '/hello');
  $urlRouterProvider.when('/', '/hello');

  $stateProvider
    .state('hello', {
      url: '/hello',
      component: 'hello'
    })

     .state('world', {
      url: '/world',
      component: 'world'
    })
}

export default helloRoutes;
