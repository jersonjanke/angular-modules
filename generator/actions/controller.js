function ControllerAction(conf) {
    var action = this,
        globalConf = conf,
        Mustache = require('mustache'),
        ViewAction = require('./../actions/view').ViewAction(conf),
        RouteAction = require('./../actions/route').RouteAction(conf),
        DepsAction = require('./../actions/deps').DepsAction(conf);

    action.create = create;
    action.crud = createCrud;

    return action;

    function createCrud(params) {
        params.crud = true;
        create(params);
    }


    function create(params) {
        if (!params || (!params.name && !params.n && !params.module)) {
            process.stdout.write("Opção inválida".error +
                "\n\n Você precisa informar o nome do módulo.".debug +
                "\n Informe: --module=nomedomodule".debug);
            return;
        }
        if (!params.entity) {
            process.stdout.write("Opção inválida".error +
                "\n\n Você precisa informar o nome da entidade para fazer o crud.".debug +
                "\n Informe: --entity=entidade".debug);
            return;
        }
        var name = params.name || params.n || params.module,
            fs = require('fs.extra'),
            dir = globalConf.srcModuleDir + name,
            controllerDir = dir + '/controllers/';

        if (!fs.existsSync(controllerDir)) {
            fs.mkdirSync(controllerDir);
            process.stdout.write(("\n * Criada a pasta " + controllerDir).info);
        }


        //process.stdout.write(("\n ## Criando controller para o módulo " + name).info);
        //process.stdout.write(("\n * Criando controller " + controllerDir + params.entity + 'Ctrl.js...').info);

        /**
         * Cria o arquivo do módulo
         */
        var template = './templates/controller.mustache';
        if (params.crud) {
            template = './templates/controller-crud.mustache';
        }
        fs.readFile(template, 'utf-8', function(err, data) {
            if (err) throw err;
            var output = Mustache.render(data.toString(), {conf: conf, options: params});

            fs.writeFile(controllerDir + params.entity + 'Ctrl.js', output, function(err) {
                if (err) {
                    process.stdout.write(("\n * Não foi possível criar o arquivo " + controllerDir + params.entity + "Ctrl.js").error);
                }
            });
        });

        if (params.crud && !params.noviews) {
            params.resolve = true;
            ViewAction.create(params);
        }

        if (params.routes && !params.scaffold) {
            RouteAction.create(params);
        }

        if(!params.scaffold) {
            params.controller = true;
            DepsAction.create(params);
        }
    }

}

exports.ControllerAction = ControllerAction;