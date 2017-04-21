import angular from 'angular';
import routes from './routes';
import aboutController from './about/about.controller';
import contactsController from './contacts/contacts.controller';
import homeController from './home/home.controller';
import projectsController from './projects/projects.controller';
import aboutService from './about/about.service';
import contactsService from './contacts/contacts.service';
import homeService from './home/home.service';
import projectsService from './projects/projects.service';

const exports = {name: 'site'};

angular.module(exports.name, [])
    .controller('aboutController', aboutController)
    .controller('contactsController', contactsController)
    .controller('homeController', homeController)
    .controller('projectsController', projectsController)
    .service('aboutService', aboutService)
    .service('contactsService', contactsService)
    .service('homeService', homeService)
    .service('projectService', projectsService)
    .config(routes);

export default exports;