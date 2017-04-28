function Errors() {

    var methods = this;

    methods.showErrorMessage = function(message) {
        console.log("   _____^_".warn);
        console.log("   |    |   \\ ".warn);
        console.log("    \\   /  ^ | ".warn + "  "+message.substr(0,30).error);
        console.log("   / \\_/   0  \\ ".warn+ " "+message.substr(30,30).error);
        console.log("  /            \\ ".warn);
        console.log(" /    ____      0".warn);
        console.log("/      /  \\___ _/".warn);
    };

    return methods;
}
exports.Errors = Errors;