const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

router.get('/', function(request, response) { 
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg" width=100% style="margin-top:10px; display:block;"/>
      `,
      `<a href="/page/create">create</a>`
    );
    response.send(html);
});
  
module.exports = router;