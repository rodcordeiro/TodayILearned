# Creating your own API using NodeJS

Hey guys, today we're going to build an API using `NodeJs` and `ExpressJS`. This will be kind an 'Hello world' api but, maybe we do something more (challenging is always a good deal). Ok, so prepare the coffe and let's code!

## Prepare the enviroment

To begin, you need to have the node installed (check the process [here](https://nodejs.org/en/download/), to install it on linux, see [this section](https://nodejs.org/en/download/package-manager/)), it will install the npm too during the process, the npm is the `Node Package Manager`, used to handle the node packages used on the project. 

Now that we have the enviroment, we need to setup the project. For that we will create a folder to keep it and we're gonna call it as 'HelloUniverse' _(The 'hello universe' is kind of my initiation rite, a step beyond the hello world. To start off on the right foot)_ and go into it. Now, let's start the project by running the command `npm init -y` on the terminal. The `npm init`command initializes the project, asking a few questions to fullfil the information about the project, when used with the `-y` flag, it creates a project with the basic information. _Et voilà_, now you can see a `package.json` file like this:
```json
{
  "name": "HelloUniverse",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Yes, dev! Can you feel it? That feeling of "Fuck, is being born!!"?

## Installing the packages
Ok, now that we have the project we're going to install the packages needed. For the basic step is just the `Express`, so we'll run the command `npm install express -s`. After installing it, you can see that it has created the folder *node_modules/*, on this folder the npm will store the packages installed and his dependencies, and the `package-lock.json`, this file controls all the dependencies installed and his dependencies *(I install **A**, and it has the dependencies **B** and **C**, this file controls this)*.
During the development we're going to use the `nodemon` package, for that we run the `npm install nodemon -D`. The `-D` or `--dev` flag tell the npm that is a dependency used for developing, not needed on production.

## Creating the API
 Ok, so, I'm gonna do this like I learned and feels cleaner. To this we're going to create a src folder, resulting on the following structure:
```
-HelloUniverse/
\_node_modules/
  _src/
  _package.json
  _package-lock.json
```

Ok, now we go to *src/* and create the `app.js` file and start it importing the express package:
```javascript
const express = require('express');
```

Then, we create the instance:
```javascript
const app = express();
```
Almost done, now we're going to set the endpoints, or the routes, of our api. For this, we'll set a constant named *routes* that will handle them.

```javascript
const routes = express.Router();
```
 And now we create the basic route, the `'/'`:

```javascript
routes.get('/', (request, response) => {
    return response.send('hello');
})
```
 So, every time it receives a request on `'/'`, it answers with *'hello'*. But our api wont hear it yet, we need 2 more steps for that:

 ```javascript
app.use(routes) //So the api will use the routes we defined

app.listen(3333) //Here we setted the port the api will listen.
```
 On the end, our code will look like this:
```javascript
const express = require('express');

const app = express();

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.send('hello');
})

app.use(routes);

app.listen('3333');
```
Let's add a few tips to make it better:
```javascript
app.use(express.json()); //Add this before importing the routes (app.use(routes));
```

## Starting the API
All ready, let's run! We're gonna do some tricks to help us, part of that was installing the *nodemon*. We're going to set npm commands. For this, we go to the package.json and add the following line on the `scripts` part:
```json
    "start":"nodemon src/app.js"
```
This means that everytime we run the `npm start` command, it will call the nodemon and run the src/app.js file. The nodemon will keep watching all files with the `.js,.mjs,.json` extension. So, our `scripts` section will be like this:
```json
"scripts": {
    "start":"nodemon src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
Now, go to [`http://localhost:3333`](http://localhost:3333) on your browser and see the magic!

# Let's play!
Ok, I won't explain here all the kind of parameters you can send on a request because I know it, but don't know how to explain it. So, here is a little guide:

- `http://localhost.com/:id` You can have *request params*, that are params passed as part of the URL;
- `http://localhost.com/?id=xxxx` you can have *query params*, that are params passed as queries on the URL;
- You can have *body params*, that are informations sent trough the body of the request;
- Or *header params*, passed trough the header of the params.

 The first challenge we're going to do is build a `GET` request with a `request param` to show us an especific message. For this, we add the following route:

```javascript
routes.get('/user/:user', (request, response) => { 
    const user = request.params.user
    return response.send('hello ' + user);
})
```
 So, when you go to [`http://localhost:3333/user/something`](http://localhost:3333/user/something), for example, it will return the `hello something`.
