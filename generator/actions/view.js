function ViewAction(conf) {
    var action = this,
        globalConf = conf,
        Mustache = require('mustache');

    action.create = create;
    action.crud = createCrud;

    return action;

    function createCrud(params) {
        params.crud = true;
        create(params);
    }


    function create(params) {
        if (!params || (!params.name && !params.n) || !params.entity) {
            process.stdout.write("Opção inválida".error);
            return;
        }
        var name = params.name || params.n;

        params.entityLower = params.entity.toLowerCase();
        params.entityUpper = params.entity.toUpperCase();
        params.nameLower = params.name.toLowerCase();

        var fields = params.fields;
        if (fields) {
            var genFields = [];
            var allFields = params.fields.split(',');
            allFields.forEach(function(f) {
                f.trim();
                var _field = f.split(':');
                var field = {};
                field.name = _field[0];
                if (!_field[1] || _field[1]==='*') {
                    _field[1] = 'text';
                }
                field[_field[1]] = true;

                field.required = _field[2] && _field[2] === '*' ? " required " : '';
                field.max = _field[3] || false;
                genFields.push(field);
            });
            params.field = genFields;
        }

        var fs = require('fs.extra'),
            dir = globalConf.srcModuleDir + name,
            viewDir = dir + '/views/',
            entityViewDir = dir + '/views/' + params.entityLower + '/';

        if (!fs.existsSync(viewDir)) {
            fs.mkdirSync(viewDir);
            process.stdout.write(("\n * Criada a pasta " + viewDir).info);
        }
        if (!fs.existsSync(entityViewDir)) {
            fs.mkdirSync(entityViewDir);
            process.stdout.write(("\n * Criada a pasta " + entityViewDir).info);
        }


      //  process.stdout.write(("\n ## Criando as views para o crud  " + params.entity).info);
        /**
         * Cria o arquivo do _form
         */
        fs.readFile('./templates/views/_form.mustache', 'utf-8', function(err, data) {
            if (err) throw err;
            var output = Mustache.render(data.toString(), {conf: conf, options: params});

            fs.writeFile(entityViewDir + '_form.html', output, function(err) {
                if (err) {
                    process.stdout.write(("\n * Não foi possível criar o arquivo _form.html").error);
                }
            });
        });
        /**
         * Cria o arquivo do add
         */
        fs.readFile('./templates/views/add.mustache', 'utf-8', function(err, data) {
            if (err) throw err;
            var output = Mustache.render(data.toString(), {conf: conf, options: params});

            fs.writeFile(entityViewDir + 'add.html', output, function(err) {
                if (err) {
                    process.stdout.write(("\n * Não foi possível criar o arquivo add.html").error);
                }
            });
        });
        /**
         * Cria o arquivo do edit
         */
        fs.readFile('./templates/views/edit.mustache', 'utf-8', function(err, data) {
            if (err) throw err;
            var output = Mustache.render(data.toString(), {conf: conf, options: params});

            fs.writeFile(entityViewDir + 'edit.html', output, function(err) {
                if (err) {
                    process.stdout.write(("\n * Não foi possível criar o arquivo edit.html").error);
                }
            });
        });

        /**
         * Cria o arquivo do index
         */
        fs.readFile('./templates/views/index.mustache', 'utf-8', function(err, data) {
            if (err) throw err;
            var output = Mustache.render(data.toString(), {conf: conf, options: params});

            fs.writeFile(entityViewDir + 'index.html', output, function(err) {
                if (err) {
                    process.stdout.write(("\n * Não foi possível criar o arquivo index.html").error);
                }
            });
        });
    }

}

exports.ViewAction = ViewAction;