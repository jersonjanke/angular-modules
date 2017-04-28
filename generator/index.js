var conf = require('./generator.conf.json'),
    prompt = require('inquirer'),
    colors = require('colors'),
    mustache = require('mustache');


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

var map = {
    "Criar um módulo lazy": "module",
    "Um crud (scaffold)": "scaffold",
    "Criar um controller": "controller",
    "Criar um service": "service"
};


console.log(colors.green(" _  _  ___ __  __ "));
console.log(colors.green("| || |/ __|  \\/  |"));
console.log(colors.green("| __ | (__| |\\/| |"));
console.log(colors.green("|_||_|\\___|_|  |_|"));
console.log(colors.green("Gerador para o frontend"));
console.log(" ");
var schema = [
    {
        type: "list",
        name: "area",
        message: colors.yellow("O que você quer fazer?"),
        choices: [
            "Criar um módulo lazy",
            "Um crud (scaffold)",
            new prompt.Separator(),
            "Criar um controller",
            "Criar um service"
        ]
    },
    {
        type: "input",
        name: "name",
        message: colors.yellow("Qual o nome do módulo?"),
        default: 'novomodulo'
    },
    {
        type: "input",
        name: "entity",
        message: colors.yellow("Qual o nome da entidade? Ex. ProfessionalExperience:"),
        default: 'NovaEntidade',
        when: function(response) {
            return ['controller', 'service', 'scaffold'].indexOf(map[response.area]) > -1;
        }
    },
    {
        type: "input",
        name: "fields",
        message: colors.yellow("Informe os campos separados por ") + colors.gray("vírgula") + colors.yellow(" Ex:\n") +
        colors.blue("     campo") + ":" + colors.red("tipo") + ":" + colors.green("*\n") +
        colors.blue("     campo deve ser o nome do campo \n") +
        colors.red("     tipo pode ser: text, autocomplete, date, textarea ou select\n") +
        colors.green("     (*) é para obrigatório\n"),
        when: function(response) {
            return response.crud || ['scaffold'].indexOf(map[response.area]) > -1;
        }
    },
    {
        type: "confirm",
        name: "routes",
        message: colors.yellow("Gerar rotas para essa entidade?"),
        default: 'y',
        when: function(response) {
            return response.crud || ['scaffold'].indexOf(map[response.area]) > -1;
        }
    },
    {
        type: "confirm",
        name: "views",
        message: colors.yellow("Gerar as views para essa entidade?"),
        default: 'y',
        when: function(response) {
            return response.crud || ['scaffold'].indexOf(map[response.area]) > -1;
        }
    }
];


function start(params) {

    if (!params) {
        process.stdout.write("Opção inválida.".error);
        return;
    }

    if(map[params.area]==='module' || map[params.area] === 'scaffold')  {
        params.lazy = true;
    }

    var module = map[params.area],
        action = 'create',
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
            return;
    }
    if (moduleLoaded[action]) {
        moduleLoaded[action](params);
        console.log(colors.blue("\n Processo finalizado."));
    } else {
        process.stdout.write("Opção inválida.");
    }
}



prompt.prompt(schema, function(respostas) {
    var params = respostas;
    if (typeof respostas.routes !== 'undefined')
        params.noroute = !respostas.routes;
    else
        params.hasRoutes = true;

    if (typeof respostas.views !== 'undefined')
        params.noviews = !respostas.views;
    start(params);
});

