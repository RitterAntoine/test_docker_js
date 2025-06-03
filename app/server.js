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
    res.send(`
        <form method="post" action="/login">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `);
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
            // Récupérer tous les utilisateurs de la base de données
            const users = await User.find({});
            const userList = users.map(user => `<li>${user.username}</li>`).join('');

            // Afficher le tableau de bord avec la liste des utilisateurs
            res.send(`
                <h1>Welcome ${req.session.user.username}!</h1>
                <h2>List of Users:</h2>
                <ul>${userList}</ul>
            `);
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
