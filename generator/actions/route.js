function RouteAction(conf) {
    var action = this,
        globalConf = conf,
        fs = require('fs.extra'),
        Mustache = require('mustache');

    action.create = create;

    return action;

    function create(params) {
        if (!params || (!params.name && !params.n)) {
            process.stdout.write("Opção inválida".error +
                "\n\n Você precisa informar o nome do módulo.".debug +
                "\n Informe: --name=nomedomodule ou -n nomedomodulo".debug);
            return;
        }
        var name = params.name || params.n,
            dir = globalConf.srcModuleDir + name,
            configDir = dir + '/config';


        if (!params.entity) {
            if (!fs.existsSync(configDir + '/module.routes.js')) {
                createNewRouteFile(params);
            }
            return;
        }


        params.entityLower = params.entity.toLowerCase();
        params.entityUpper = params.entity.toUpperCase();
        params.nameLower = params.name.toLowerCase();
        params.nameUpper = params.name.toUpperCase();

        if (!fs.existsSync(configDir + '/module.routes.js')) {
            createNewRouteFile(params);
        } else {
            createCrudToExistentFile(params);
        }


    }

    function createCrudToExistentFile(params) {
        if (!params || (!params.name && !params.n)) {
            process.stdout.write("Opção inválida".error +
                "\n\n Você precisa informar o nome do módulo.".debug +
                "\n Informe: --name=nomedomodule ou -n nomedomodulo".debug);
            return;
        }
        var name = params.name || params.n,
            dir = globalConf.srcModuleDir + name,
            configDir = dir + '/config';

        params.lazy = true;

        // process.stdout.write(("\n ## Criando arquivo de rotas para o módulo " + name).info);
        // process.stdout.write(("\n * Criando arquivo de rotas " + configDir + '/module.routes.js...').info);

        /**
         * Cria o arquivo do módulo
         */

        fs.readFile(configDir + '/module.routes.js', 'utf-8', function(err, data) {
            if (err) throw err;

            var currentRoutes = data.toString();


            var rxExists = new RegExp(params.nameLower + '.' + params.entityLower, 'g');
            if (rxExists.test(currentRoutes)) {
                process.stdout.write(("\n * Rotas já registradas.").error);
                return;
            }

            fs.readFile('./templates/route-crud.mustache', 'utf-8', function(err, newRoutesData) {

                var output = Mustache.render(newRoutesData.toString(), {conf: conf, options: params});
                var result = currentRoutes.match(/(}+\s+];)/g);
                var newRoutes = "";
                if (!result) {
                    result = currentRoutes.match(/(\[+\s+];)/g);
                    newRoutes = currentRoutes.replace(result[0], "[" + output.replace('},',''));
                } else {
                    newRoutes = currentRoutes.replace(result[0], output);
                }


                fs.writeFile(configDir + '/module.routes.js', newRoutes, function(err) {
                    if (err) {
                        process.stdout.write(("\n * Não foi possível criar o arquivo module.routes.js").error);
                    }
                });
            });
        });
    }

    function createModuleRoute(params) {

        var route = {
            resolve: true,
            roles: params.roles || 'EMPLOYEE'
        };

        if (params.crud) {
            route.templateUrl = 'app/src/modules/' + params.name.toLowerCase() + '/views/';
            if (params.entity) {
                route.entityLower = params.entity.toLowerCase();
                route.templateUrl += params.entity.toLowerCase();
            } else {
                route.templateUrl += params.name.toLowerCase();
            }
            route.templateUrl += '/index.html';
        } else {
            route.template = '<div ui-view></div>';
        }

        return route;
    }


    function createNewRouteFile(params) {
        if (!params || (!params.name && !params.n)) {
            process.stdout.write("Opção inválida".error +
                "\n\n Você precisa informar o nome do módulo.".debug +
                "\n Informe: --name=nomedomodule ou -n nomedomodulo".debug);
            return;
        }


        var name = params.name || params.n,
            dir = globalConf.srcModuleDir + name,
            configDir = dir + '/config';

        if (!fs.existsSync(configDir) && !params.noroute) {
            fs.mkdirSync(configDir);
            //process.stdout.write(("\n * Criada a pasta " + configDir).info);
        }

        if (params.crud) {
            params.name = name;
            params.nameLower = name.toLowerCase();
            params.lazy = true;
            params.route = createModuleRoute(params);
        }


        //    process.stdout.write(("\n ## Criando arquivo de rotas para o módulo " + name).info);
        //    process.stdout.write(("\n * Criando arquivo de rotas " + configDir + '/module.routes.js...').info);

        /**
         * Cria o arquivo do módulo
         */
        if (!fs.existsSync(configDir + '/module.routes.js')) {
            fs.readFile('./templates/route.mustache', 'utf-8', function(err, data) {
                if (err) throw err;
                var output = Mustache.render(data.toString(), {conf: conf, options: params});

                fs.writeFile(configDir + '/module.routes.js', output, function(err) {
                    if (err) {
                        process.stdout.write(("\n * Não foi possível criar o arquivo module.routes.js").error);
                    }
                });
            });
        } else {
            process.stdout.write(("\n * Arquivo do módulo " + name + " já existe").info);
        }
    }

}

exports.RouteAction = RouteAction;