function DepsAction(conf) {
    var action = this,
        globalConf = conf,
        Mustache = require('mustache');

    action.create = createDeps;

    return action;


    function createDeps(params) {
        if (!params || (!params.name && !params.n) || !params.entity) {
            process.stdout.write("Opção inválida".error);
            return;
        }
        var name = params.name || params.n,
            fs = require('fs.extra'),
            dir = globalConf.srcModuleDir + name,
            configDir = dir + '/config';

        if (!fs.existsSync(configDir) && !params.lazy) {
            fs.mkdirSync(configDir);
            process.stdout.write(("\n * Criada a pasta " + configDir).info);
        }

        if (params.crud || params.scaffold) {
            params.moduleDeps = ['./../controllers/'+params.entity+'Ctrl.js','./../service/'+params.entity+'Svc.js'].join("',\n    '");
        } else {

            if (params.controller) {
                params.moduleDeps = ['./../controllers/'+params.entity+'Ctrl.js'].join("',\n    '");
            }

            if (params.service) {
                params.moduleDeps = ['./../service/'+params.entity+'Svc.js'].join("',\n    '");
            }
        }


       // process.stdout.write(("\n ## Criando arquivo de dependências para o módulo " + name).info);
       // process.stdout.write(("\n * Criando arquivo de dependências " + configDir + '/module.deps.js...').info);

        /**
         * Cria o arquivo do módulo
         */
        if (!fs.existsSync(configDir + '/module.deps.js')) {
            fs.readFile('./templates/deps.mustache', 'utf-8', function(err, data) {
                if (err) throw err;
                var output = Mustache.render(data.toString(), {conf: conf, options: params});

                fs.writeFile(configDir + '/module.deps.js', output, function(err) {
                    if (err) {
                        process.stdout.write(("\n * Não foi possível criar o arquivo module.deps.js").error);
                    }
                });
            });
        } else {
            fs.readFile(configDir + '/module.deps.js', 'utf-8', function(err, currentDeps) {
                if (err) throw err;

                var rx = new RegExp('(define\\(\\[)','g');
                var results = currentDeps.match(rx);

                var rxExists = new RegExp(params.moduleDeps,'g');
                if(rxExists.test(currentDeps)) {
                    process.stdout.write(("\n * Dependências já registradas.").error);
                    return;
                }

                var newDeps = currentDeps.replace(results[0],results[0]+"'"+params.moduleDeps+"',\n    ");

                fs.writeFile(configDir + '/module.deps.js', newDeps, function(err) {
                    if (err) {
                        process.stdout.write(("\n * Não foi possível criar o arquivo module.deps.js").error);
                    }
                });
            });
            process.stdout.write(("\n * Arquivo do módulo " + name + " já existe").info);
        }
    }

}

exports.DepsAction = DepsAction;