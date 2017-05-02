function ScaffoldAction(conf) {
    var action = this,
        ViewAction = require('./../actions/view').ViewAction(conf),
        ModuleAction = require('./../actions/module').ModuleAction(conf),
        ControllerAction = require('./../actions/controller').ControllerAction(conf),
        ServiceAction = require('./../actions/service').ServiceAction(conf),
        RouteAction = require('./../actions/route').RouteAction(conf),
        DepsAction = require('./../actions/deps').DepsAction(conf),
        TestAction = require('./../actions/test').TestAction(conf);

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
                "\n\n Você precisa informar o nome da entidade para fazer o scaffold.".debug +
                "\n Informe: --entity=entidade".debug);
            return;
        }
        var name = params.name || params.n || params.module,
            fs = require('fs.extra'),
            dir = conf.srcModuleDir + name;
        /**
         * Cria a pasta do módulo  caso não exista
         */
        if (!fs.existsSync(dir.toLowerCase())) {
            ModuleAction.create(params);
        }
        if(params.roles) {
            params.roles = params.roles.split(',');
        }

        params.roles = params.roles ? params.roles.join("','") : 'EMPLOYEE';
        params.name = name;
        params.nameLower = name.toLowerCase();
        params.nameUpper = name.toUpperCase();
        params.entityLower = params.entity.toLowerCase();
        params.entityUpper = params.entity.toUpperCase();
        params.scaffold = true;
        params.resolve = true;
        params.crud = true;
        params.lazy = params.lazy || true;
        ControllerAction.create(params);
        ServiceAction.create(params);

        if (!params.noviews) {
            ViewAction.create(params);
        }

        if (!params.noroutes) {
            RouteAction.create(params);
        }
        if (!params.notests) {
            //TestAction.create(params);
        }


        //DepsAction.create(params);
    }

}

exports.ScaffoldAction = ScaffoldAction;