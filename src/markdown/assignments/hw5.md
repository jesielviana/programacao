---
path: "/assignments/5"
date: "2019-01-29"
title: "Homework 5: Piazza Lite"
---

### Download:
Download the implementation stub [here](/~cis197/assignments/build/CIS197_HW5NEW.zip).

Disclaimer: This homework will be really guided so it is important to read  through the writeup as you code along. Furthermore, there are no automated tests on this HW, but rather we will expect you to put up a running instance of your web app and we will expect to see some functionality.

Est time: 4-5 hrs if no previous web dev experience. 2-3 hrs if previous experience.

## Final Product

![](https://media.giphy.com/media/7OWsDBLtjSKNbtRenC/giphy.gif)

Our final application will be a really pared down version of piazza ("pared down" is an understatement) that allows you to list out a bunch of questions that only registered users have submitted. That being said, there is also a signup/login portion of this website with a persistent database.

You can play around with a working version [here](https://pacific-scrubland-24669.herokuapp.com/)

With that idea in mind, let's dive in.

### Server.js

First off, this application will be an express application. So it'd be wise to probably do something along the lines of `npm install -s express`  and to require it in your server.js file. Note that requiring a module looks like

```js
var moduleNameHere = require('module-name-here')
```

In the case of express it will be

```
var express = require('express')
```

Great. We will also need to instantiate our express application by including the line `var app = express()` somewhere in our code (we've already done that for you).

For now, comment out the `mongoose.connect(...)` line. We'll get to that later.

Also comment out the `app.engine(...)` and `app.set(...)` lines.

We've set up a couple of routes for you. `app.get('/', ...)` and `app.post('/', ...)`. Those are there for you to handle requests that happen on the base url itself (in our case, localhost).

We've also set up an `app.listen` call that specifies our application listens on port process.env.PORT or port 3000. Since we haven't set process.env.PORT on our command line it will default over to port 3000.

Let's run `node server.js` and visit `localhost:3000`...what do we see?

Probably nothing. That is because we haven't specified anything to happen in our GET `/` route handler. For now, just specify that it should just output `hello world`.

```js
app.get('/', function (req, res, next) {
    res.send('hello world')
})
```

Now, if quit and re-run `node server.js` we should see `hello world` outputted in our browser window at `localhost:3000`.

Great. Now let's encode some more complicated logic. Note that we've already provided you with some html pages within `views/`. In that file, there is an `index` page that will eventually contain some EJS rendering logic.

Recall from class that whenever we want to custom render some information, we need to use a templating engine. In this case, we are using ejs. To tell express that it needs to use this, uncomment the two lines `app.engine(...)` and `app.set(...)`. Now, instead of doing `res.send('hello world')` inside of the GET `/` route, we can do a render call

```js
res.render('index')
```

The express rendering engine, by default, will look for a file with name `index.html` in the `views` directory. Since that exists, it will pass the file through the ejs renderer.

When you restart the server you will probably see an error...read the error and you may be able to find some part that says "Cannot find module ejs". How might we be able to fix this? (Hint hint, npm install is a thing).

Once you've fixed that, reload `localhost:3000` you should see a form (with title "Question"), a text field, a button "Add question", and a link to Log In.

The intended behavior of the question input is to save the question text into a database and eventually display a list of questions to the user.

The way that we actually submit a question to the server is by typing in information into the text box and clicking submit. By default, our submit button will issue a post request to the route that exists at the route this form exists (in our case, it will submit a POST request to the `/`  route). So...it makes sense for us to actually put in some logic to figure out  what  happens when a post request is submitted on that route.

Let's walk through how to handle that post request.

## Adding Questions

To handle form submissions, we need to require a module that allows us to read from a body of a request. This module is called `body-parser`. You'll need to run `npm install -s body-parser` and require it in your `server.js` file (in a similar format to above).

The reason why we install this new module to help us do this task is because the  request object has a bunch of different keys and properties and it is  difficult  to parse out the relevant form information if we handled everything from  scratch. The body-parser middleware will help us  instantaneously access any form information.

Refer to the hinted lines in `server.js` to see how to set up the body parser middleware. What body parser does is that it intercepts all the requests and adds an additional `body` object to the `req` object (in your callbacks).

To get started with using it, create a new POST route at `/` (it's similarly formatted to the `app.get` call, but will need to be _slightly_ different).

Inside of this POST route, grab the question text from when we actually submit the form. If you need help figuring out what part of the request you need to pay attention to, just try debugging a bit. The relevant information will be on the `req.body` object.

As an exercise, just `res.send` back the submitted text to the user when they submit the form. To test this out, type in some dummy info into the text box and click submit. If you get text back saying the actual text that was in the text box, you're all set up!

Okay...if you are stuck here, here's what the app.post route should look like:

```js
app.post('/', function (req, res, next) {
    var q = req.body.question; // why is is req.body.question and not  something else?
    res.send(q);
});
```

#### Rendering Questions Try 1:

Now we are going to try and render all the questions that users submit. Create a separate array (outside of the scope of any functions) in `server.js`.

When a user submits a POST request to `/`, add the content of their question to the array. Redirect the user back to the main page by doing `res.redirect('/')`

When a user submits a GET request to `/` (i.e. just visits the site), we want to display those questions back to the user. To do so, we need to alter our `res.render` call a bit.

Instead of doing `res.render('index')` write in

```js
res.render('index', { questions: questionsArray })
```

Since we are supplying a variable to our render call, we will need to specify to our template how to handle that rendering logic. Go to `views/index.html` and refer to [here](https://github.com/cis197/lecture-examples/blob/d242719987fd012c8c5ad86214c3e1d468df8a1e/server-example/views/index.html#L15) to see how you should handle iterating through the `questions` we provide the template and, correspondingly, add list items to the page.

When you are done with this part, you should be able to submit new items to  the form and have them display back  to you. If you restart  the server, these items should disappear upon new page load.

The code at this stage  should look something like

**Server.js**

```js
// some code up here...
var questionsArray = []

app.get('/', function (req, res, next) {
  res.render('index', { questions: questionsArray })
});

app.post('/', function (req, res, next) {
  var q = req.body.question;
  questionsArray.push(q);
  res.redirect('/')
})
```

**views/index.html**

```html
<html>
  <head>
    <title>cis197 piazza lite</title>
  </head>
  <body>
    <form method="POST">
      Question: <br/>
      <input type="text" name="question">
      <br/>
      <button type="submit">Add question</button>
    </form>
    <a href="/account/login">Log in</a> to submit a question
    <ul>
      <% for (q in questions) { %>
        <li><%= questions[q] %></li>
      <% } %>
    </ul>
  </body>
</html>
```

You should also be able to get  this type of behavior upon completing  this section:

![pt1](https://media.giphy.com/media/EpxhoWQvHgraH3DLGT/giphy.gif)

#### Adding a backing database to persist information:

We have a slight issue with how we are storing things right now. Currently, if we actually restart our server, the `questionsArray` value gets reset to `[]` and we lose all the information that was stored in it. SAD!

We need some way of persisting that information...Perhaps using a central "base" that  stores data...A database!

This is now the time to look up how to install `mongodb` for your system...and then install it.

Once that is done, in a separate terminal window, run `mongod`.

Now go back to `server.js`. Require in `mongoose` (make sure you `npm install -s mongoose`) and uncomment the line `mongoose.connect(...)`. If you can re-run your `node server.js` script without it crashing, you have successfully set up a mongodb connection.

Inside of `models/question.js`, add a field `questionText` of type string to your schema (use [this](https://mongoosejs.com/docs/guide.html#definition) as reference on how to do so).

Okay...i'll give this to you as well:

**models/question.js**

```js
var mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  questionText: { type: String }
})

module.exports = mongoose.model('Question', questionSchema);
```


Here we are setting up something called a `Schema` (this is mongoose terminology) that basically structures all entries of type `Question` that enter into our mongodb database. Mongoose will require that these `Question` records have a single field  `questionText` of type `String`. Lastly, we export a _model_ (basically the functional version of the Schema) that is preloaded with all of the fancy methods that mongoose gives to us (like `.find` `.remove`, etc).

Cool...so now how do we actually use this model?

At the top of `server.js` put a line that requires the model/question.js file

Perhaps something like

```js
var Question = require('./model/question');
```

Well...maybe we may have put in a typo in that require statement...see how you can fix that :)

Now, within our `app.post('/')` route, we need some way to actually save the question we grab from the form into the database.

We can simply do the following:

```js
app.post('/', function (req, res, next) {
  var q = req.body.question;
  var dbQ = new Question({ questionText: q })
  dbQ.save(function (err, result) {
    if (!err) {
      res.redirect('/');
    } else {
      res.send('something went wrong: ' + err.message);
    }
  })
})
```

Here  we  create a `Question` record object (note  that  this is just  an object that hasn't been saved to the database yet). Once we have created this (with the appropriate instantiation fields), we then go through and save the question. Note that the save operation in mongoose accepts a single argument, a callback function (which is specified to have two arguments, an `error` argument that contains any errors  that happen during  the database save operation, and the result operation that just returns the actual object that is saved). We then specify that if  there is no error, we redirect back to the home page. Otherwise, we send back the error message to  the user.

Great! So now that we  have all that settled, if we type something in and submit, we'll save that question to the database and it'll display on the frontend right?

Wrong.

We have to implement a database query operation in the `app.get('/', ...)` route so that express knows to actually load up the questions stored in the database.

We can do that by  writing in the following into our app.get route.

```js
app.get('/', function (req, res, next) {
    var questionDb = Question.find({}, function (err, results) {
        if (!err) {
            res.render('index', { questions: results })
        } else {
            res.send(err.message)
        }
    })
})
```

Okay, so _now_ if we restart our server and refresh the page, we should see  what we originally saw when we had an array backing the db right?

Wrong :(

![womp](https://i.imgur.com/3bL7sZM.png)

Well...we see a bunch of different fields here for each question. Recall that in our questionsArray, we only stored the text of every question. Mongoose (mongodb specifically) also adds some other attributes (in this case  `_id` and `__v`) that are relevant  for keeping track of things, but not relevant for us. We need to edit our `views/index.html` to take care of this...

**TODO:** modify your `views/index.html` to only display the text of the question!

Once we have that done, we should see the original question we had. _And_ when we restart the server, it should still persist!

![](https://media.giphy.com/media/YkYtAupZiLGdcUp0c6/giphy.gif)

Wowee.

### User Login/Signup ... removing the training wheels

Now, we come to the part of the application that is going to be more "homework"-y than this previous part.

We want to eventually "protect" our application and restrict the ability to add  questions _only_ to registered users.


#### Signup
Now we need to do the following:

* Set up a `GET` route for `/signup`
* Set up a `POST`  route for `/signup`

Note that for the `GET` route, we have already made an html page for your for signing up route. So for the `GET` route, all you need to do is just render that page.

The `POST` route will handle grabbing the information from the form submission. You will need to grab the relevant fields from the form (hint hint, use `req.body.someAttributeNameHere` to grab the username and password  of the user from our form).

*  Once you have that done, you need to set up a database model that actually allows the user to be registered into the database itself. This database model (look in the `models/user.js` file), should have two fields, a `username` field of type `String` and `password` field of type `String`. Don't worry about doing uniqueness checks etc.

To check and see if a user has _actually_ been registered into your database, just stick a call to

```js
User.find({}, function(err, results) { console.log(results))
```

(provided you have imported your User model under the variable `User`) in your `/signup` GET route. If you visit the signup route, you should see all the user records be printed out in your terminal's console.

Okay...I'll give this one to you (at least a part of the `server.js` file)...

```
app.get('/signup', function (req, res, next) {
  // debug check for all signed up users...
  User.find({}, function (err, results) {
    console.log(results);
  })
  res.render('signup');
})

app.post('/signup', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var u = new User({ username: username, password: password  })
  u.save(function (err, result) {
    if (!err) {
      res.redirect('/') // just redirect back to the home page
    } else {
      res.send(err.message);
    }
  })
})
```

You will still need to implement the `models/user.js` file and make sure that all the "requires" are appropriate for the `server.js` file.

#### Login
Similar todo list here

* GET `/login` should just render out `views/login.html`.
* POST `/login` should query our database for a `username` and `password` that matches the one submitted in our form (hint hint: look at the `.findOne({...})` operation that mongoose provides to find out how to filter our database by multiple fields.
    * If the POST request is successful + we have found a user that matches the credentials, just res.send back `hi you are logged in!`. Otherwise, just res.send  back "incorrect credentials".



**Checkpoint:**

I should be able to do the following:

![](https://media.giphy.com/media/3fiCFASm87wLEJEPnP/giphy.gif)

### User authentication + Sessions:

Great...so now we can register users...but how do we actually persist  a "logged in" state across multiple requests? That's where the idea of sessions comes in. A session is essentially a means by which we can actually persist some information about a user (or anything else really) across multiple requests. These sessions can be stored in cookies that  are sent along with the user for every request.

It basically works as follows:

* User logs in.
* Server authenticates user and gives them a unique cookie that has some information stored in it (e.g. an encrypted object that just has the keys { userId: 123455 })
* On subsequent requests, the user has this encrypted cookie that it automagically passes to the server upon each POST/GET request. The server then decrypts the cookie, sees that this request came from userId 123455  and knows that the user is actually authenticated
* If the user logs out, the server sets the cookie of the user to an empty object so all subsequent requests from the user are not considered authenticated.

Now...how do?

Welp, we do via `cookie-sessions`

This part is going to be  _really_ guided:

In server.js somewhere near the top do

`var cookieSession = require('cookie-session')`

Then, before you mount any routes, write in the following:

```
app.use(cookieSession({
  name: 'local-session',
  keys: ['spooky'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
```

This says that all the cookies from the website are encrypted with the key `spooky` and have a maximum age (i.e. maximum life span) of 24 hrs. After that point, they are considered invalid.

Inside of your `app.post('/login'...)` route, include the following line before any `res.send` calls:

```js
req.session.user = result.username
```

...assuming you are passing in the result of  your User.findOne call in a variable called  `result`.

Now, inside of `app.get('/')`, include the line as follows:

```js
app.get('/', function (req, res, next) {
    console.log(req.session.user)
    ...
})
```

Now, after you log in and visit the `/` route, you should see your username console log'ed out :)

Create  a new "GET" route `/logout`, with the following:

```js
app.get('/logout', function (req, res, next) {
    req.session.user = '';
    res.redirect('/');
})
```

Now when you accesss `/logout` you'll invalidate the user session...but what does this mean for the application.

Well...nothing for now, because we haven't implemented any conditional rendering logic for a logged in user to see something different than  a non-logged in user.

To fix this issue, inside of `app.get('/')` pass along another variable into our `res.render` call that keeps track of who is logged in

```js
app.get('/', function (req, res, next) {
    ...
    res.render('index', { questions: results, user: req.session.user })
})
```

Inside of `views/index.html` we will wrap our submit form inside of an EJS if statement that will only render if the `req.session.user` object is not an empty string...we will use truthy/falsiness to our advantage.

```html
<html>
  <head>
    <title>cis197 piazza lite</title>
  </head>
  <body>
    <% if (user) { %>
    <h1> Hi <%= user %> </h1>
    <form method="POST">
      Question: <br/>
      <input type="text" name="question">
      <br/>
      <button type="submit">Add question</button>
    </form>
    <% } %>
    <a href="/account/login">Log in</a> to submit a question
    <ul>
      <% for (q in questions) { %>
        <li><%= questions[q].questionText %></li>
      <% } %>
    </ul>
  </body>
</html>
```

So...if we expect the following functionality:

![](https://media.giphy.com/media/iOs4Qahc58YKXsLlGu/giphy.gif)

### Almost there...

#### Routers...

So we've been clumping all of our routes together into a single `server.js` file and, while that is fine for this application, it can get out of hand really quickly.

Routers are a feature built into express that allows us to group together all routes that handle a specific subset of features under the same url prefix.

So for example: in our application, we have  5 routes (GET/POST signup, GET/POST login, GET logout) that are _just_ dedicated  to account management type things...we should probably segment those routes off into their own little file.

To do so, open up `routes/account.js` and notice the first two lines of that file.

```js
var express = require('express')
var router = express.Router();
```

These lines instantiate  a new express Router.

Before the `module.exports` line, just put in all of the 5 routes dedicated to account management I mentioned above. Just cut them from `server.js` and paste them inside of `routes/account.js` Note that you are most likely going to need to edit and add more require statements (notably you'll need to require the `User` model in  this file). Also note that you will have to replace `app.whatever(...)` with `router.whatever(...)`.

So now...we need to tell the main `server.js` file that these routes exist.

At the top of `server.js` write in the following line

```js
var accountRoutes = require('./routes/account.js')
```

and after the app get and post routes for `/`, just write in the following line:

```js
app.use('/account', accountRoutes);
```

Now,  we will be able to access our account routes at the following urls:

* localhost:3000/account/signup
* localhost:3000/account/login
* localhost:3000/account/logout

See what the router allowed us to do? It allowed us to segment  off a subset of routes and just append  a url prefix to all of them so it is super clear exactly what the organization of our application looks like.

Now add `signup, login, and logout` lines to index.html with the appropriate route urls.

#### Middlewares

As mentioned in class, a middleware is a function that executes before a certain subset (or all) of the requests that go into our application. This is useful for checking  things like whether is user is authenticated  or not and handling errors  in our application.

##### isAuthenticated:

Let's  implement our first middleware function. This middlware  will check a requests to the `POST /` route and the `GET /logout` route to see whether a user is authenticated or not before executing  those route functions.  If the user is not authenticated, we will send them a message saying  they need to be authenticated to access the route.

Inside of `middlewares/isAuthenticated` paste in the following:

```js
var isAuthenticated = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.send("you aren't authenticated")
  }
}

module.exports = isAuthenticated;
```

Here we create a  function `isAuthenticated`. The function checks to  see if a user is defined on the session object. If it is, then we allow the request to continue without any error parameters passed on (just by calling `next()`). Otherwise, we send to the user that  they aren't authenticated, thus cutting short any request to the route that  the middleware is supposed to protect.

Right now, this middleware is just a function definition. To actually execute this on some routes, we need to do the following:

On the `app.post('/', function(req, res, next) { ... })` route, add an argument after the `/` as follows:

```js
app.post('/', isAuthenticated, function (req, res, next) {
    ...
})
```

Similarly for the `/account/logout` route, we need to add in the `isAuthenticated` middleware in a similar fashion.

Note that for both of these you will need to  require the `isAuthenticated` function definition at the top of the appropriate files.

So we expect the following behavior at this point:

![](https://media.giphy.com/media/8BlUxcekYO9E4zbZX9/giphy.gif)

#### Error  Handling:

Okay this is the last part-ish.

We have a slight problem...

Any time we want to handle errors, we always just send back to the user a `res.send('whatever the error message is here')` however, that just leads to a bunch of repetitive calls to handle error logic. How about we have a simple function that just handles any error that comes by us and displays that error. We  can use a middleware for this as well...

If you notice, there are a few lines at the bottom of `server.js`

```js
app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})
```

This is actually a middleware. It isn't as formally defined as our `isAuthenticated` middleware, _but_ it is still middleware regardless (for those who are curious, any  time you do `app.use` something, it is pretty much a middleware or router). Note that since this is at the bottom of the server.js file, it is a function that gets executed after all other requests have been processed (i.e. there's nothing after this).

This middleware  has an additional parameter, `err` that accepts any errors that are passed into this function and  then just send back to the user `'ERROR: ' + err.message`

But how do we get errors to be passed to this middleware? You may initially be tempted to just throw errors in our route handlers

```js
app.get('/bleh', function (req, res, next) {
    // something  went wrong
    throw new Error('ERROR');
})
```

However, when this actually throws an error in the express process itself and causes the server to quit. This isn't quite what we want (rather we just want to display the error to the user).

So to do so, we take advantage of the `next` parameter we've been appending to our route handlers.

Whenever we want to throw an error, we should just call `next(new Error('error message'))` in a route handler. This error will propagate down into any subsequent handlers until we hit  our last middleware (the one at the bottom of server.js).

An example of this is as follows:

```js
app.get('/', function (req, res, next) {
  console.log(req.session.user);
  var questionDb = Question.find({}, function (err, results) {
    if (!err) {
      res.render('index', { questions: results, user: req.session.user })
    } else {
      next(err) // we just pass in the error from the db call
    }
  })
});
```


We can even edit our previous `isAuthenticated` middleware function declaration to take advantage of the middleware!

```js
var isAuthenticated = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    // res.send("you aren't authenticated")
    next(new Error('you are not authenticated'));
  }
}

module.exports = isAuthenticated;
```

**TODO:** Go through your application and figure out places where we `res.send`ed any errors. Convert those `res.send` calls to the appropriate `next(...)` calls. **Note**: If your previous  route handlers don't have a `next` property as their 3rd argument (after req, res), just add that in real quick :)

## Deploying on Heroku & Submission

And now...we are done!-ish

Let's actually share this application with our friends :) (And the TAs)

Create a heroku account and verify it (add a credit card). If you do need help on verification (or would like a credit card to register under, make a private piazza post).

Install  the [heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

Log  in via the CLI.

In your  current directory, create a new git repository with `git init`. Once you have done this, add all files, except the `node_modules` folder, to the commit stage (`git add filename1 filename2 folder1 ...`) and make a new commit
`git commit -m "initialize"`.

Now...**you need to make sure that your package.json file has all the dependencies that are actually required for your app to run**. If a dependency (eg express) isn't there, run (e.g.) `npm install --save express`.

Of course, with any new file change, you need to add it (in this case `git add package.json`) and commit it (`git commit -m "updated package.json with new dependencies"`).

Almost there...

Run `heroku create yourpennkey-cis197-f18-hw5` (e.g. `suria-cis197-f18-hw5`) and then run `git push heroku master`.

Once that is done (hopefully there aren't any errors), we need to tell heroku to make a database

```
heroku addons:create mongolab
```

and then do `heroku restart`

If you visit your website `suria-cis197-f18-hw5.herokuapp.com` it _should_ work!

### Submission instructions

Before you do anything, create a file `heroku_url.txt` in the top level directory of your code (same level as `server.js`). Just copy paste in the link to the heroku app and save the file.

Submit the following files to gradescope. There are a few automated tests to just check that you have the files we want to look at.

![img](https://i.imgur.com/MBct1T3.png)

#### Rubric

The main things we will look for are as follows:

* User signup/login valid: [5pts]
* Adding questions restricted to users only: [2pts]
* /account/logout link is authentication protected. [2pts]
* Persistent questions database. [5pts]
* Able to display questions upon  submission of new question [3pts]
* Files:
    * There should be evidence that middlewares were implemented (isAuthenticated) [2pts]
    * There should be a routes/account file and the account routes should be appropriately mounted [2pts]
    * There should be evidence of a database models for Users and  Questions. [2pts]
* UX:
    * Evident links to login, signup, sign in and homepage (just enough so that we can navigate around, this isn't shown in the writeup...but we'll give you freedom on how you choose to implement this). [2pts]
