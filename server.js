const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = (`${now} : ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable append log ');
        }
    });
    next();
});
// app.use((req,res,next)=> {
//     res.render('maintenance.hbs')
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    // res.send("<h1>Hello Ex</h1>");
    res.render('home.hbs', {
        pageTitle: "Homepage",
        welcomeMessage: "Welcome bro"
    })
});
app.get('/about', (req, res) => {
    // res.send('About page')
    res.render('about.hbs', {
        pageTitle: "About"
    })
});

app.get('/projects',(req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
})
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle req.'
    });
});
app.listen(port, () => {
    console.log('server is up on 3000');
});