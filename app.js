let express = require('express');
let bodyparser = require('body-parser');
let marked = require('marked');
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
            console.log(err);
            res.send('<h1>ERROR</h1>');
        }
        res.render('endmemo');
    })
})
app.get('/check', function(req, res){
    fs.readdir('./data', function(err, files){
        if(err){
            console.log(err);
            res.send('<h1>ERROR</h1>');
        }
        res.render('check', {files: files});
    })
})
app.get('/check/:id', function(req, res){
    let id = req.params.id;
    fs.readdir('data', (err, files) =>{
        if(err){
            console.log(err);
            res.send('<h1>ERROR</h1>');
        }
        fs.readFile('data/' + id + '.md', 'utf8', (err, data)=>{
            if(err){
                console.log(err);
                res.send('<h1>ERROR</h1>');
            }
            let markedhtml = marked(data);
            res.send(`<html>
                <head>
                    <meta charset="utf-8">
                    <title>${id}</title>
                </head>
                <body>
                    ${markedhtml}
                </body>
                </html>`)
        })
    })
})