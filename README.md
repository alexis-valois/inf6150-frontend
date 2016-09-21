# inf6150-frontend
## Requirements
* [SourceTree](https://www.sourcetreeapp.com/download/)
* [Sublime Text 3](https://www.sublimetext.com/3)
* [Node.JS 64bits](https://nodejs.org/en/)
* [Bower (à installer avec npm suite à l'installation de Node.JS)](https://bower.io/#install-bower)
* [Grunt (à installer avec npm suite à l'installation de Node.JS)](http://gruntjs.com/getting-started)
* [Windows Seulement (facultatif mais grandement utile pour les mutliples command prompts) : Cmder](http://cmder.net/)
* Yeoman Generator : ```npm install -g grunt-cli bower yo generator-karma generator-angular```

## Getting Started
1. Cloner le projet avec SourceTree via l'interface Bitbucket (Clone / Clone in SourceTree)
2. Naviguer à la racine du répertoire du projet nouvellement cloné via un invite de commande
3. Lancer la commande suivante : ```npm install && bower install```

## Build & development
* Run grunt serve for Build and preview in browser.
* Run yo angular:controller MyNewController to create a new controller (requires Yeoman + Angular JS Generator)
* Run yo angular:view MyNewView to create a new view
* Run yo angular:service MyNewService to create a new Service
