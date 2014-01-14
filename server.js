var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    cache = {};

function send404(response) {
    response.writeHead(404, {'Content-Type' : 'text/plain'});
    response.write('Error 404: Not found');
    response.end();
}

function sendFile(response, filePath, fileContents, fileType) {
    response.writeHead(200, {
        'Content-Type' : fileType
    });
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    var fileType = mime.lookup(path.basename(absPath));

    if (fileType !== 'text/html' && cache[absPath]) {
        sendFile(response, absPath, cache[absPath], fileType);
    } else {
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data, fileType);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

var server = http.createServer(function(request, response) {
    var filePath = false;

    if (request.url === '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url;
    }

    var absPath = './' + filePath;
    serveStatic(response, {}, absPath);
});

server.listen(3000, function() {
    console.log("server listening on port 3000");
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);