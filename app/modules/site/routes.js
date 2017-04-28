import aboutHtml from './about/about.html';
import contactsHtml from './contacts/contacts.html';
import homeHtml from './home/home.html';
import projectsHtml from './projects/projects.html';
import aboutController from './about/about.controller';
import contactsController from './contacts/contacts.controller';
import homeController from './home/home.controller';
import projectsController from './projects/projects.controller';

function routes($stateProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      template: homeHtml,
      controller: homeController,
      controllerAs: 'vm'
    })

    .state('about', {
      url: '/about',
      template: aboutHtml,
      controller: aboutController,
      controllerAs: 'vm'
    })

    .state('contacts', {
      url: '/contacts',
      template: contactsHtml,
      controller: contactsController,
      controllerAs: 'vm'
    })

    .state('projects', {
      url: '/projects',
      template: projectsHtml,
      controller: projectsController,
      controllerAs: 'vm'
    })
}

export default routes;