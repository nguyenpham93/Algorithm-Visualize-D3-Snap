const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

nunjucks.configure({
    autoescape : true
});

app.use('/public',express.static('./public'));
app.engine('html',nunjucks.render);
app.set('views','./views');
app.set('view engine','html');
app.get('/',(req,res)=>{
    data = {
        'title' : 'Home'
    };
    res.render('home.html',data);
});
app.get('/nqueens/d3',(req,res)=>{
    res.render('nqueens_d3/index');
});
app.get('/nqueens/snapsvg',(req,res)=>{
    res.render('nqueens_snap/index');
});
app.listen(5000,()=>{
    console.log('Listen to 5000');
});