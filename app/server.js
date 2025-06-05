require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexion à MongoDB (si tu veux garder la liste des utilisateurs connectés)
mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Schéma et modèle pour l'utilisateur Google
const userSchema = new mongoose.Schema({
    googleId: String,
    username: String,
    email: String,
    picture: String
});
const User = mongoose.model('User', userSchema);

// Page de login (bouton Google uniquement)
app.get('/', (req, res) => {
    res.render('login');
});

// Démarrer l’authentification Google
app.get('/auth/google', (req, res) => {
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
    });
    res.redirect(url);
});

// Callback Google
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.redirect('/');

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Enregistrer ou mettre à jour l'utilisateur en base
    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
        user = new User({
            googleId: payload.sub,
            username: payload.name,
            email: payload.email,
            picture: payload.picture
        });
        await user.save();
    }

    req.session.user = {
        username: user.username,
        email: user.email,
        picture: user.picture
    };
    res.redirect('/dashboard');
});

// Déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Dashboard
app.get('/dashboard', async (req, res) => {
    if (!req.session.user) return res.redirect('/');
    const users = await User.find({});
    res.render('dashboard', { users, username: req.session.user.username });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});