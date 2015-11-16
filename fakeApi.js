var results = [];

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/api/results',
        handler: function (request, reply) {
            reply(results);
        }
    });

    server.route({
        method: 'POST',
        path: '/api/results',
        handler: function (request, reply) {
            var result = request.payload;
            results.push(result);
            reply(result).code(201);
        }
    });

    next();
};

exports.register.attributes = {
    version: '0.0.0',
    name: 'fake_api'
};
