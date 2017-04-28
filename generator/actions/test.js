function TestAction(conf) {
    var action = this,
        globalConf = conf,
        Mustache = require('mustache');

    action.create = create;

    return action;


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
            testDir = dir + '/test/',
            specDir = dir + '/test/spec/';

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + s4() + s4() +
                s4() + s4() + s4() + s4();
        }


        var fields = params.fields;
        if (fields) {
            var genFields = [];
            var allFields = params.fields.split(',');
            allFields.forEach(function(f) {
                f.trim();
                var _field = f.split(':');
                var field = "    '" + _field[0] + "': 'Informe um valor para teste.'";
                genFields.push(field);
            });

            params.createModel = "{\n";
            params.createModel += "    " + genFields.join(", \n    ");
            params.createModel += "}";

            params.updateModel = "{\n";
            params.updateModel += "    'id': '" + guid() + "', \n    ";
            params.updateModel += "    " + genFields.join(", \n    ");
            params.updateModel += "}";
        }


        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir);
        }

        if (!fs.existsSync(specDir)) {
            fs.mkdirSync(specDir);
        }

     //   process.stdout.write(("\n ## Criando teste para entidade " + params.entity).info);
     //   process.stdout.write(("\n * Criada a pasta " + specDir).info);


       // process.stdout.write(("\n * Criando teste para " + testDir + params.entity + 'Ctrl.js...').info);

        /**
         * Cria o arquivo do módulo
         */
        if (!fs.existsSync(testDir + params.entity + 'Ctrl.spec.js')) {
            var template = './templates/test/ctrl.mustache';
            fs.readFile(template, 'utf-8', function(err, data) {
                if (err) throw err;
                var output = Mustache.render(data.toString(), {conf: conf, options: params});

                fs.writeFile(specDir + params.entity + 'Ctrl.spec.js', output, function(err) {
                    if (err) {
                        process.stdout.write(("\n * Não foi possível criar o teste " + testDir + params.entity + "Ctrl.spec.js").error);
                    }
                });
            });
        } else {
            process.stdout.write(("\n * Arquivo de teste " + testDir + params.entity + "Ctrl.spec.js já existe").info);
        }

    }

}

exports.TestAction = TestAction;