const express = require('express');
const router = express.Router();

const fs = require('fs');
const template = require('../lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
  
router.get('/create', (req, res) => {
    var title = 'WEB - create';
    var list = template.list(req.list);
    var html = template.HTML(title, list, `
      <form action="/page/create" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
    res.send(html);
});
  
router.post('/create', (req, res) => {
    var post = req.body;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      res.redirect(`/page/${title}`);     
    });
  
    /* 
    // body-parser을 사용하면 req.body로 아래 코드를 대체할 수 있다.   
    var body = '';  
    req.on('data', function(data){  
      body = body + data; // data가 오는대로 body에 담음.
    });
    req.on('end', function(){ // reqest가 끝나면 콜백함수를 실행함으로써 body을 읽음.    
    });
    */
});
  
router.get('/update/:updateId', (req, res) => {
    var filteredId = path.parse(req.params.updateId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = req.params.updateId;
      var list = template.list(req.list);
      var html = template.HTML(title, list,
        `
        <form action="/page/update" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/page/create">create</a> <a href="/update/${title}">update</a>`
      );
      res.send(html);
    });
});
  
router.post('/update', (req, res) => {
    var post = req.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error){
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        res.redirect(`/page/${title}`);
      })
    });
});
  
router.post('/delete', (req, res) => {
    var post = req.body;
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error){      
      res.redirect('/');
    });  
});


router.get('/:pageId', (req, res, next) => {  
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        if (err) { next(err); }         
        var title = req.params.pageId;
        var sanitizedTitle = sanitizeHtml(title);
        var sanitizedDescription = sanitizeHtml(description, { allowedTags:['h1'] });
        var list = template.list(req.list);
        var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` 
        <a href="/page/create">create</a>
        <a href="/page/update/${sanitizedTitle}">update</a>
        <form action="/page/delete" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
        </form>`
        );
        res.send(html);
    });  
});

module.exports = router;