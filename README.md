# Projet Node.js avec Docker et MongoDB

Ce projet est une application simple utilisant Node.js, Express, MongoDB et Docker. Il permet aux utilisateurs de se connecter, de s'inscrire et d'afficher une liste d'utilisateurs depuis une base de données MongoDB. L'interface est harmonisée grâce à un fichier CSS commun.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- Docker
- Docker Compose
- Git

## Structure du Projet

Voici la structure du projet :

```
|-- /app
|   |-- Dockerfile
|   |-- package.json
|   |-- server.js
|   |-- /views
|   |   |-- login.ejs
|   |   |-- register.ejs
|   |   |-- dashboard.ejs
|   |-- /public
|   |   |-- styles.css
|-- docker-compose.yml
|-- README.md
```

## Installation

1. Clonez le dépôt sur votre machine locale :

```
git clone https://github.com/RitterAntoine/test_docker_js.git
```

2. Accédez au répertoire du projet :

```
cd test_docker_js
```

3. Construisez et démarrez les conteneurs Docker :

```
docker-compose up --build
```

## Utilisation

1. Accédez à l'application dans votre navigateur web à l'adresse suivante : [http://localhost:3000](http://localhost:3000)

2. Vous pouvez :
   - **Créer un compte** via le bouton "Créer un compte"
   - **Vous connecter** avec un compte existant

3. Une fois connecté, vous serez redirigé vers le dashboard où vous verrez la liste des utilisateurs présents dans la base de données.


## Personnalisation du style

Le style de l'application est centralisé dans le fichier `/app/public/styles.css`.  
Vous pouvez le modifier pour personnaliser l'apparence de toutes les pages (`login`, `register`, `dashboard`).