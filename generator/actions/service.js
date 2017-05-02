function ServiceAction(conf) {
    var action = this,
        globalConf = conf,
        Mustache = require('mustache'),
        DepsAction = require('./../actions/deps').DepsAction(conf),
        Errors = require('./../utils/errors').Errors();

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
            serviceDir = dir + '/' + params.name +'/';

        if (!fs.existsSync(dir)) {
            Errors.showErrorMessage("Você só pode criar um service para um módulo existente.");
            return;
        }

        if (!fs.existsSync(serviceDir)) {
            fs.mkdirSync(serviceDir);
            //process.stdout.write(("\n * Criada a pasta " + serviceDir).info);
        }


        //  process.stdout.write(("\n ## Criando service para o módulo " + name).info);
        //  process.stdout.write(("\n * Criando service " + serviceDir + params.entity + 'Svc.js...').info);

        /**
         * Cria o arquivo do módulo
         */
        if (!fs.existsSync(serviceDir + params.entity + 'Svc.js')) {
            var template = './templates/service-crud.mustache';
            fs.readFile(template, 'utf-8', function(err, data) {
                if (err) throw err;
                var output = Mustache.render(data.toString(), {conf: conf, options: params});

                fs.writeFile(serviceDir + params.entity + 'Svc.js', output, function(err) {
                    if (err) {
                        process.stdout.write(("\n * Não foi possível criar o service " + serviceDir + params.entity + "Svc.js").error);
                    }
                });
            });
        } else {
            process.stdout.write(("\n * Arquivo do service " + serviceDir + params.entity + "Svc.js já existe").info);
        }


        if (!params.scaffold) {
            params.service = true;
            DepsAction.create(params);
        }
    }

}

exports.ServiceAction = ServiceAction;