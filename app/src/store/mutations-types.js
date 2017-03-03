require('json-loader!./modules.json').forEach(mutation =>
    module.exports[mutation.toUpperCase()] =
        require('./modules/' + mutation + '/mutations'));
