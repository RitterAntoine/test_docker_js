const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Connexion à MongoDB
mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Schéma et modèle pour l'utilisateur
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Route pour la page de login
app.get('/', (req, res) => {
    res.render('login');
});

// Nouvelle route pour afficher le formulaire d'inscription
app.get('/register', (req, res) => {
    res.render('register');
});

// Nouvelle route pour traiter l'inscription
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send('Username already exists. <a href="/register">Try again</a>');
        }
        // Créer le nouvel utilisateur
        const newUser = new User({ username, password });
        await newUser.save();
        res.send('Registration successful. <a href="/">Login here</a>');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Route pour gérer le login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Vérification des informations d'identification
    if (username === 'admin' && password === 'admin') {
        req.session.user = { username };
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials');
    }
});

// Route pour le tableau de bord
app.get('/dashboard', async (req, res) => {
    if (req.session.user) {
        try {
            const users = await User.find({});
            res.render('dashboard', { users, username: req.session.user.username });
        } catch (error) {
            res.status(500).send('Error retrieving users');
        }
    } else {
        res.redirect('/');
    }
});

// Route pour ajouter un utilisateur
app.get('/adduser', async (req, res) => {
    try {
        const newUser = new User({
            username: 'admin',
            password: 'admin'
        });

        await newUser.save();
        res.send('User added successfully');
    } catch (error) {
        res.status(500).send('Error adding user');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});