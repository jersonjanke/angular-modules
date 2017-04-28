function ModuleAction(conf) {
    var action = this,
        globalConf = conf,
        Mustache = require('mustache'),
        RouteAction = require('./../actions/route').RouteAction(conf),
        DepsAction = require('./../actions/deps').DepsAction(conf),
        ControllerAction = require('./../actions/controller').ControllerAction(conf),
        ServiceAction = require('./../actions/service').ServiceAction(conf),
        ViewAction = require('./../actions/view').ViewAction(conf),
        fs = require('fs.extra');

    action.create = createNewModule;
    action.crud = createCrudModule;

    return action;

    function createModuleDir(params) {
        var name = params.name,
            dir = globalConf.srcModuleDir + name,
            configDir = dir + '/config';
        /**
         * Cria a pasta do módulo  caso não exista
         */
        if (!fs.existsSync(dir.toLowerCase())) {
            fs.mkdirSync(dir.toLowerCase());
            process.stdout.write(("\n * Criada a pasta " + dir).info);
        } else {
            process.stdout.write(("\n * Pasta " + dir + " já existe").info);
        }
    }

    function createModuleConfigDir(params) {
        var name = params.name,
            dir = globalConf.srcModuleDir + name,
            configDir = dir + '/config/';
        /**
         * Cria a pasta de config caso não exista
         * Cria o arquivo de rotas pelo RouteAction
         */
        if (!fs.existsSync(configDir.toLowerCase()) && !params.noroute) {
            fs.mkdirSync(configDir.toLowerCase());
            //process.stdout.write(("\n * Criada a pasta " + configDir).info);
            RouteAction.create(params);
        } else {
            process.stdout.write(("\n * Pasta " + configDir + " já existe").info);
            RouteAction.create(params);
        }
    }

    function createModuleJs(params) {
        var name = params.name,
            dir = globalConf.srcModuleDir + name,
            configDir = dir + '/config/';
        /**
         * Cria o arquivo do módulo
         */
        if (!fs.existsSync(dir + '/module.js')) {
            fs.readFile('./templates/module.mustache', 'utf-8', function(err, data) {
                if (err) throw err;
                if (params.crud) {
                    params.lazy = true;
                }
                params.nameLower = params.name.toLowerCase();
                var output = Mustache.render(data.toString(), {conf: conf, options: params});

                fs.writeFile(dir + '/module.js', output, function(err) {
                    if (err) {
                        process.stdout.write(("\n * Não foi possível criar o arquivo module.js").error);
                    }
                });
            });
        } else {
            process.stdout.write(("\n * Arquivo do módulo " + name + " já existe").info);
        }
    }

    function createCrudModule(params) {
        if (!params || (!params.name && !params.n)) {
            process.stdout.write("Opção inválida".error +
                "\n\n Você precisa informar o nome do módulo.".debug +
                "\n Informe: --name=nomedomodule ou -n nomedomodulo".debug);
            return;
        }
        if (!params.entity ) {
            process.stdout.write("Opção inválida".error +
                "\n\n Você precisa informar o nome da entidade para fazer o crud.".debug +
                "\n Informe: --entity=entidade ou -n entidade".debug);
            return;
        }

        params.crud = true;
        params.lazy = true;
        params.name = params.name || params.n;
        params.nameLower = params.name.toLowerCase();

        if (params.deps) {
            var arrDeps = [];
            params.deps = params.deps.split(',').forEach(function(item) {
                arrDeps.push(item);
            });
            params.deps = arrDeps;
        }


        //process.stdout.write(("\n ## Criando módulo " + params.name).info);

        createModuleDir(params);
        createModuleConfigDir(params);
        createModuleJs(params);

        /**
         * Cria o arquivo de dependências
         */
        DepsAction.create(params);
        ControllerAction.create(params);
        ServiceAction.create(params);
        if(!params.noviews) {
            ViewAction.create(params);
        }
    }


    function createNewModule(params) {
        if (!params || (!params.name && !params.n)) {
            process.stdout.write("Opção inválida".error +
                "\n\n Você precisa informar o nome do módulo.".debug +
                "\n Informe: --name=nomedomodule ou -n nomedomodulo".debug);
            return;
        }

        params.name = params.name || params.n;

        if (params.deps) {
            var arrDeps = [];
            params.deps = params.deps.split(',').forEach(function(item) {
                arrDeps.push(item);
            });
            params.deps = arrDeps;
        }


       // process.stdout.write(("\n ## Criando módulo " + params.name).info);

        createModuleDir(params);
        createModuleConfigDir(params);
        createModuleJs(params);

    }

}

exports.ModuleAction = ModuleAction;