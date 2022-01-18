const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.js');
const port = 3000;
const methodOverride = require("method-override");

app.use((req, res, next) => {
  console.log("I run for all routes")
  next()

// STATIC MIDDLEWARE
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));


app.use(methodOverride("_method"));

})

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { data: pokemon });
});

// NEW
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
});

// DELETE
app.delete('/pokemon/:indexOfPokemonArray', (req, res) => {
    pokemon.splice(req.params.indexOfPokemonArray, 1);
    res.redirect('/pokemon');
});

// UPDATE
app.put('/pokemon/:indexOfPokemonArray', (req, res) => {
    pokemon[req.params.indexOfPokemonArray] = req.body;
    res.redirect('/pokemon');
});

// CREATE
app.post('/pokemon', (req, res) => {
    pokemon.push(req.body);
    res.redirect('/pokemon')
});

// EDIT
app.get('/pokemon/:indexOfPokemonArray/edit', (req, res) => {
    res.render('edit.ejs', {
        data: pokemon[req.params.indexOfPokemonArray],
        index: req.params.indexOfPokemonArray,
    });
})

// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { data: pokemon[req.params.id] });
});

app.listen(port, () => {
    console.log(`listening on port`, port)
});