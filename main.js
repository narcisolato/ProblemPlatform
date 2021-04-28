const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');


const port = 7839;

const app = http.createServer(function(request, response){
    const _url = request.url;
    const pathname = url.parse(_url, true).pathname;
    const queryData = url.parse(_url, true).query;
    const id = queryData.id;

    if (pathname === '/') { 
        const template = require('./template');
        response.writeHead(200);
        response.end(template);   
    }
    else if (pathname === '/create') {

    }
    else if (pathname === '/create_process') {

    }
    else if (pathname === '/update') {

    }
    else if (pathname === '/update_process') {
        
    }
    else if (pathname === '/delete_process') {
        
    }
    else {
        response.writeHead(404);
        response.end('Not found!');
    }
}).listen(port);