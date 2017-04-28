var args = require('optimist').argv,
    conf = require('./generator.conf.json'),
    colors = require('colors'),
    mustache = require('mustache'),
    splitModuleCall = args._.length ? args._[0].split(':') : false;


colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

if (!splitModuleCall) {
    process.stdout.write("Opção inválida.".error);
    return;
}

var params = args,
    module = splitModuleCall[0],
    action = splitModuleCall[1] || 'create',
    moduleLoaded;


switch (module) {
    case "module":
        moduleLoaded = require('./actions/module').ModuleAction(conf);
        break;
    case "controller":
        moduleLoaded = require('./actions/controller').ControllerAction(conf);
        break;
    case "service":
        moduleLoaded = require('./actions/service').ServiceAction(conf);
        break;
    case "scaffold":
        moduleLoaded = require('./actions/scaffold').ScaffoldAction(conf);
        break;
    default:
        process.stdout.write("Opção inválida.".error);
        process.stdout.write("\nVocê tem as seguintes opções:".info +
            "\n CRIAR UM MÓDULO".info +
            "\n - module:create".info +
            "\n - module:crud".info +
            "\n -- Parâmetros: ".info +
            "\n    * --name=NomeDoModulo".info +
            "\n    * --entity=NomeDaEntidade".info +
            "\n    * --fields=name:type:*".info +
            "\n         *type pode ser: date, text, select, autocomplete, textarea.".info +
            "\n         * (*) é para campos obrigatórios.".info +
            "\n    * --noviews".info +
            "\n ------------------------------" +
            "\n SCAFFOLD".info +
            "\n - scaffold".info +
            "\n -- Parâmetros: ".info +
            "\n    * --module=NomeDoModulo".info +
            "\n    * --entity=NomeDaEntidade".info +
            "\n    * --fields=name:type:*".info +
            "\n         *type pode ser: date, text, select, autocomplete.".info +
            "\n         * (*) é para campos obrigatórios.".info +
            "\n    * --noviews".info +
            "\n    * --noroutes".info +
            "\n ------------------------------" +
            "\n CRIAR UM CONTROLLER".info +
            "\n - controller:create".info +
            "\n - controller:crud".info +
            "\n -- Parâmetros: ".info +
            "\n    * --module=NomeDoModulo".info +
            "\n    * --entity=NomeDaEntidade".info +
            "\n    * --fields=name:type:*, startDate:date, email:text".info +
            "\n         *type pode ser: date, text, select, autocomplete.".info +
            "\n         * (*) é para campos obrigatórios.".info +
            "\n    * --noviews".info +
            "\n ------------------------------" +
            "\n CRIAR UM SERVICE".info +
            "\n - service:create".info +
            "\n - service:crud".info +
            "\n -- Parâmetros: ".info +
            "\n    * --module=NomeDoModulo".info +
            "\n    * --entity=NomeDaEntidade".info
        );
        return;
}
if (moduleLoaded[action]) {
    moduleLoaded[action](params);
} else {
    process.stdout.write("Opção inválida.".warn);
    return;
}
