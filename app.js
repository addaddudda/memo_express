let express = require('express');
let bodyparser = require('body-parser');
let fs = require('fs');
let app = express();
app.locals.pretty = true;
app.use(bodyparser.urlencoded({extended: false}));
app.set('views', './view');
app.set('view engine', 'pug');
app.listen(3000, function(){
    console.log('http://localhost:3000');
})
app.get('/', function(req, res){
    res.render('view');
})
app.get('/memo', function(req, res){
    res.render('memo');
})
app.post('/memo', function(req, res){
    let title = req.body.title;
    let description = req.body.description;
    fs.writeFile('data/' + title + '.md', description, function(err){
        if(err){
            res.send('<h1>ERROR</h1>');
        }
        res.render('endmemo');
    })
})
app.get('/check', function(req, res){
    fs.readdir('./data', function(err, files){
        if(err){
            res.send('<h1>ERROR</h1>');
        }
        res.render('check', {files: files});
    })
})
app.get('/check/:id', function(req, res){
    req
})