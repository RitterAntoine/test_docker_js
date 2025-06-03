# Projet Node.js avec Docker et MongoDB

Ce projet est une application simple utilisant Node.js, Express, MongoDB et Docker. Il permet aux utilisateurs de se connecter avec des identifiants et d'afficher une liste d'utilisateurs depuis une base de données MongoDB.

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

1. Accédez à l'application dans votre navigateur web à l'adresse suivante : ``` http://localhost:3000 ```

2. Connectez-vous avec les identifiants suivants :
- Nom d'utilisateur : ```admin```
- Mot de passe : ```admin```

3. Une fois connecté, vous serez redirigé vers le tableau de bord où vous verrez la liste des utilisateurs.

## Ajouter un utilisateur

Pour ajouter un utilisateur à la base de données, accédez à l'URL suivante dans votre navigateur : ```http://localhost:3000/adduser```

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (```git checkout -b feature/AmazingFeature```)
3. Commitez vos changements (```git commit -m 'Add some AmazingFeature'```)
4. Poussez vers la branche (```git push origin feature/AmazingFeature```)
5. Ouvrez une Pull Request

## Licence

Distribué sous la licence MIT. Voir ```LICENSE``` pour plus d'informations.
