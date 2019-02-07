---
path: "/assignments/6"
date: "2019-01-29"
title: "Homework 6: Piazza Lite Part 2"
hidden: true
---

**Due Date 10/24/18 11:59 PM**

Download the implementation stub [here](/~cis197/assignments/build/CIS197_HW6NEW.zip). You can also just use your previous homework if you  feel your implementation was correct

Okay so for the last homework we ended up with  a  very lite version of piazza  that allowed users to sign up, log in, and submit questions. We did not have the ability to answer  questions, nor did we have the ability to see questions and answers come in "live" (i.e. we had to refresh the page in order to see  new content). For this assignment (also guided), we'll be showing you how to convert that old piazza to this new piazza!

![](https://media.giphy.com/media/euj9Jel3IAleIltOpM/giphy.gif)

![](https://media.giphy.com/media/Ah2sCD8k9nLdfKCNIz/giphy.gif)

Wowee! How fun!

What is unfortunately not demo'd here is the ability for answers to also live update if you are looking at a question :).

So to cover our new feature set

* "Live" functionality for viewing new questions come in
* "Live" functionality for viewing new answers come in on a question we are looking at
* Ability to select question and see content/answers without doing page reload
* Ability to submit answer to question  without doing page reload
* Ability to add question without doing page reload
* New UI :)

For those of you who understood the latter half of last lecture, we can achieve our "live" functionality with an AJAX call done on an interval. However, AJAX calls don't just GET information, they can also POST information, allowing us to send data to the server without needing to do a form submission. This "shortcut" can be pretty helpful for us to allow the user to avoid the need to do another page load. For all  the parts a user actually interacts with, they only need to send back and forth small changes to the server (and  nothing huge like a page render). Plus, it leads to a much more "reactive" UX that responds immediately to user input.

## Table Of Contents:
* Model changes
    * Question authorship
    * Question answering
* API Routes
    * get questions
    * add question
    * answer question
* Frontend changes
    * POST question to server
    * Live update question feed
    * POST answer to server
    * Live update currently viewed question

To clarify, this assignment doesn't have any tests. Once again, we are just looking for functionality. After this one, we'll be going back to tests again :(

### Model Changes
So this will probably be the shortest part of the writeup. Since we're "beefing up" Piazza lite, we need to  add some features to the questions we ask. First off, our questions should show what author made the  question and they should also have a field that stores the answers to these questions.

**TODO:** In `models/question.js` add the appropriate fields `author` and `answer` to your `questionSchema`.

**Setting a Question author**

In the last assignment, we restricted question posting to only people who were signed in  (i.e. they had `req.session.user` equal to some non empty string of their username). In our POST route for `/` (that allows us to add a question), just as we create a new question, insert a property author of the new question equal to the `req.session.user` variable. So it'd be something like

```js  
app.post('/', function (req, res, next) {
    ...
    var q = new Question({ questionText: questionText, author: req.session.user })
})
```

A question for you to think about  is why does this work? what will `req.session.user` be equal to at this point?

To actually see what the author property is set to, you can either pull out your handy-dandy Studio 3T MongoDB viewer, or you can just adjust your index.html template to output the `author` property of a question in addition to showing  the `questionText`.

**TODO:** make sure that your question model has author and answer properties and the author property is set on new questions

We'll use this new model soon...

### API Routes

In class, we covered the idea of an API route as a designated route on a server that deals with just sending back information from the user in the  form of JSON or some other easily parsably text. This  is especially useful for AJAX calls because they issue requests  to routes on your server and do something with what the route returns. As we saw in class, if we just do an AJAX call on the `/` route, we'll get back a string  that represents the html  of the rendered index.html page. Rather than trying to parse out relevant info (in class the Todos, here  the Questions), we can just  designate a route `/api/getQuestions` that just get's us all  the questions in a nice little JSON.

**TODO:** Create a file `routes/api.js` (i.e. a file under the `routes` folder called `api.js`) and put in the following stub implementation:

**routes/api.js**

```js
var express = require('express')
var router = express.Router();
var Question = require('../models/question.js')

router.get('/getQuestions', function (req, res, next) {

})

router.post('/addQuestion', function (req, res, next) {

})

router.post('/answerQuestion', function (req, res, next) {

})

module.exports = router;

```

Since this is a set of routes that we want to be accessible under a `/api` prefix, go back to `server.js` really quick mount the API routes in this file under the  `/api` prefix (recall how we did that for the `/account` routes).


In the `/getQuestions` route in this file, the name implies that  we would like to get  all of  the questions. We already do that in the GET of our `/` route, so just replicate the database call logic here. Instead of doing  a res.render('index') call at the end to send to the user, instead do `res.json(whateverResultsYouWantToReport)`.

If you have mounted things correctly, you should be able to visit `localhost:3000/api/getQuestions` and see an array of questions be shown to you as follows (albeit slightly formatted)

```js
[
    {"_id":"5bc583b52076db0015fb82a8","questionText":"This is the application you'll be making.","author":"suria@seas.upenn.edu","__v":0},

    {"_id":"5bc584702076db0015fb82a9","questionText":"new question?          ","author":"suria@seas.upenn.edu","__v":0},

    {"_id":"5bc584c82076db0015fb82aa","questionText":"Add Question: \n          ","author":"suria@seas.upenn.edu","__v":0},

    {"_id":"5bc584db2076db0015fb82ab","questionText":"yep sorry!","author":"suria@seas.upenn.edu","__v":0}
]
```

**TODO:** Implement getQuestions

**addQuestion**

Before we tackle the addQuestion route, we need to reason a bit about  how it will be used. This route will accept a AJAX POST request (i.e. there won't be a form submission, but rather a programmatic post request made to that route). Since this isn't a post route  that will accept form submissions, we need to tell bodyPaser (what we use to put post data on the `req.body` object) to also interpret data posted via AJAX (typically done in the form of JSON).

To do this, go back to `server.js` and  put the following line under our `app.use(bodyParser.urlEncoded(...))` line:

```js
app.use(bodyParser.json())
```

And that's it! you'll now be able to accept post data from AJAX requests.

Now, replicate behavior that we did in our POST `/` route  (i.e. create a new question with an author). You'll still have access to  `req.session.user` even though this is an API route (AJAX automatically captures all user cookies and sends it along with each request). You can also assume that the questionText will be provided to you via `req.body.questionText`. If all is successful, just respond back to the user with `res.json({ status: 'OK' })`.

Now comes the question for how do we actually test that this route works. We can't type a url into our url bar since that actually initiates a GET request. We also haven't gotten to  the point where we can make changes to our frontend yet that would allow us to run an AJAX POST request. We need some way of programmatically sending a POST request so we can test our whether our API works.

We can do this using curl. For those who are able to do so, here is the command:

```sh
curl '{"questionText": "question From Curl"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/addQuestion
```

For those who are visually inclined,  download the Postman app from [here](https://www.getpostman.com/apps) for your platform. Once you've signed up (don't worry it's totally free), and replicate the state of postman that is in the  image below and click "SEND". You  should see `{
  "status": "OK"
}` pop up in the area below.

![](https://i.imgur.com/VjcYT1Z.png)

If you visit `localhost:3000/api/getQuestions` again, you should now see your new question at the bottom of the list.

Oh all right...I'll give you the implementation of addQuestion as well :)

```js
router.post('/addQuestion', function (req, res, next) {
  var { questionText } = req.body; // ES6 shorthand
  var author = req.session.user;
  var  q = new Question({ questionText, author }) // ES6 shorthand
  q.save(function (err, result) {
    if (err) next(err);
    res.json({ status: 'OK' })
  })
})
```

**TODO:** Implement addQuestions

**answerQuestion**

Okay, so now we want to add  in the functionality to add an answer to a question via an API route (basically this will be in place so people can answer a question). In order to answer a question, we have to know the answer  and the question  we are answering. Let's specify that our API route takes the following paramter json object:

```
{ answer:  "some string of  an answer here",
  qid: "the _id of the question that's being answered"
}
```

We will be able to access both of these properties on the `req.body` object as was the case with `/api/addQuestion`.

From here, you should be able to implement the route, but just to  give you a bit of the database querying and editing part, you will have to find a question by an id, edit the question (to set the  new answer) and then save that question.

```js
Question.findById(whateverIdYouGetFromThePost, function (err, question) {
    question.answer = whateverAnswerYouGetFromThePost;
    question.save(function (saveErr, result) {
        ...
    })
})
```

If all is successful, respond with `{ success: 'OK' }`.

To test this, we need to find a question `_id` to modify (where might we easily access a list of questions to look hmm...) and edit our Postman request URL and body parameters accordingly. If we revisit `/api/getQuestions` you should be able to see the question you added an answer to actually have an answer property now.

**TODO:** Implement answerQuestion

### Frontend

#### Housekeeping and new files:


**OLD HOMEWORK ONLY**: Replace your index.html with the following file (if you are doing this assignment prior to the release of the code zip of HW5).

[https://gist.github.com/abhisuri97/5eadf5eb87a5faeaaacc3004a9232a9f](https://gist.github.com/abhisuri97/5eadf5eb87a5faeaaacc3004a9232a9f)

**OLD HOMEWORK ONLY**: Create a new folder called `static` at the top level and two subfolders in it called `scripts` and `styles`. In the scripts folder, put in the following file (name it `main.js`)

[https://gist.github.com/abhisuri97/a3bbe652625995a6a0a63a74850ff7d2](https://gist.github.com/abhisuri97/a3bbe652625995a6a0a63a74850ff7d2)

**FOR EVERYONE**: In the `scripts` folder, create another subfolder called `lib` and save the code from [here](https://code.jquery.com/jquery-3.3.1.min.js) under the name  `jquery.min.js` within that `lib` folder.

**OLD HOMEWORK ONLY**: In the styles folder, create a new file called `styles.css` with the content from here:

[https://gist.github.com/abhisuri97/b5acabff8f6db5d7d35fc01f63949df8](https://gist.github.com/abhisuri97/b5acabff8f6db5d7d35fc01f63949df8)

**FOR EVERYONE**: Lastly, as will be shown in class, we need to let express know that some urls are meant just to load up static assets. Back in `server.js` put in the following line before  any routes are declared.

```js
app.use('/static', express.static(path.join(__dirname, 'static')))
```

** EVERYONE FROM HERE ON OUT: **

Now, if you visit `localhost:3000` you should see a fancier version of  what you originally had. Check the chrome console to see if you have any 404 errors  (and post on piazza if you do see any). You should see something like the following.

![](https://i.imgur.com/7zpBqed.png)

#### Adding a Question on the frontend

If you click 'Add new  Question +', you should be greeted with a modal:

![](https://i.imgur.com/d0qtMGM.png)

This logic of clicking the "Add new question +" button and displaying the modal (i.e. changing its css style property from `display:none` to `display:block`) is done on lines 56-64 of `main.js`.

```js
  // when we want to make a new question, show the modal
  $('#new-question').on('click', function () {
    $('.modal').css('display', 'block');
  })


  $('#close-modal').on('click', function () {
    $('.modal').css('display', 'none');
  })
```

Take a look through the `index.html` structure to see what exactly all the jQuery elements are referring to.

```html
    <div class="main-body">
      <div class="left-col">
      <% if (user) { %> <!-- I.e. show the following if someone is logged in -->
      <!-- relevant part -->
      <a href="#" class="btn" id="new-question">Add new Question + </a>
      <div class="modal" style="display:none">
        <div class="question-area">
          <!-- this is the input box -->
          <textarea type="text" id="question-text">
          Add Question:
          </textarea>
          <a class="btn" id="submit-question">Submit Question</a>
          <a class="btn" id="close-modal">Close</a>
        </div>
      </div>
```

Now we want to actually be able to add a new question. But why is this different than our original idea of having a form? Well...right now it isn't too different, but we're going to be driving home the idea of using an AJAX request to communicate information to the server via an API route rather than setting up a typical post route. Here, once we click on the "Submit question" button in our modal, we still get to stay on the page. Beforehand, we actually reload the entire page. This will be motivated later on as we add in the ability to instantaneously  see the  new question appear at the bottom of our list live.

So now, let's actually code up the stuff that happens on click of the Submit Question button. We've provided a short function stub in `main.js`

```js
  $('#submit-question').on('click', function () {
    var qText = $('#question-text').val();
    // TODO: make a post request to /api/addQuestion with the qText as the
    // questionText attribute. On success, hide the modal
  })
```

This function basically says, when we click on the submit button function, grab the text from the textbox and store it in qText. Now we need to implement the AJAX post logic to our server's API route for handling adding a new question. That's  the `/api/addQuestion` route. To make an ajax post request, we need to specify `url`, `type`, `data`, and `success` properties of the object passed into the `$.ajax(...)` function.

```js
    $.ajax({
      url: '/api/addQuestion',
      data: { questionText: qText },
      type: 'POST',
      success: function(res) {
        console.log(res);
        // exercise for you: close the modal (hint: see how we do it in other places)
      }
    })
```


The code here is fairly self explanatory. The only thing left for you to do here is to put in the code within our success function to hide the modal.

But now, if  we test out this function, we don't get to actually see our new question get added to our list. However, if we go to `localhost:3000/api/getQuestions` we  actually do see it  there. Hmm. There are a couple of ways that we could handle adding the new question to the list

**Way  1:** in the `success` method of  the above AJAX post, insert a new element into  the list.

**Way 2:** Have a running interval in the background that checks the `/api/getQuestions` route ever 2.5 seconds and updates the list of questions that way. If we submit a  question, it'll show up in the list with delay at maximum of 2.5 seconds.

Way 2 does present us with multiple advantages since we  kinda kill two birds with one stone (i.e. we can insert our new question into the list _and_ we can update our list with  new  questions that other users submit).

#### Getting new questions

In the `main.js` file, find the method stub `getQuestions()`

```js
  var data = [];

  // ...other stuff

  function getQuestions() {
    // TODO: make an ajax request to /api/getQuestions. on success
    //       set  the data variable equal to the response and render
    //       out the question previews (by callingrenderPreviews())
    //       Later on in the writeup, also render the active question
    //       (to update it) with renderactive()
  }
```

TODO: Just as we did in class, make an ajax request of type `GET` to  the `/api/getQuestions` route. On success, set the  `data` variable equal to the response (this is so we can keep track of the questions and use them in other methods to do things  to the questions). Also call the  `renderPreviews()` method when you are done.

Note that the renderPreviews method (below) relies on the data variable being set properly so we can add the list elements to our list of questions.

```js
  function renderPreviews() {
    $('#questions').html(
        data.map((i) => '<li data-qid="' + i._id + '">' + i.questionText + '</li>').join('')
    )
  }
```

**Note** for each question we make, we give it a data property qid equal to its question id. Will be useful in the next section!

So _now_ if you add a question, you should see it pop up in the list! Similarly, if another user session adds a question, you'll be able to see it pop up for you as well without refreshing the page. Wow!

![](https://media.giphy.com/media/8lZ0r0XQkwnIiJy0Cw/giphy.gif)


#### Showing a Question

We have provided for you a wonderful method that inserts a question's info into the right pane of our website.

```js
  function renderActive() {
    if (activeIdx > -1) {
      var active = data[activeIdx];
      $('#show-question').css('display', 'block');
      $('#question').text(active.questionText ? active.questionText: '');
      $('#author').text(active.author ? active.author: '');
      $('#answer-text').text(active.answer ? active.answer : '');
    } else {
      $('#show-question').css('display', 'none');
    }
  }
```

Look through this method and the html to figure out  what's going  on.

Note that this method relies on two variables `activeIdx` and `data`. `data`  is set on every API call to `/api/getQuestions`. `activeIdx` is what we will set in this next question. But first some motivation:

Let's  say we click on a  question. The ideal flow is that we get the id of that question and then figure out where in our array of data that question lies and we just  would _normally_ store the _value_ at that array index. However, since we are dealing with data that changes, it is very possible that  our question could change while we are looking at it. By storing  only the index of the active question and  getting the  question information from our data array each time we call renderActive(), we can ensure that the  new data of the question will actually render out. This will be more relevant in the next part.

So, when we implement the following stub:

```js
  $('#questions').on('click', 'li', function () {
    // TODO: When a question is clicked, set the `active` variable equal to
    //       the data of the question that is active (hint: look through the
    //       data array. If an array entry has the same _id as the _id we just
    //       declared here, it is the active question

    // we now render out the active question
    renderActive();
  })
```

We need to do a few things.

* get the `_id` of the question we have clicked on (hint, look up how to access the `data-qid` attribute we've set  for you
* look through  the `data` array for any question `_id` that matches the `_id` we just found
* Once we've found that, set `activeIdx` equal to that index.

Note, this  method implementation can be done in 1 line of a jQuery call and a for loop (or `.forEach` call if you're fancy).

At the end of  the method, we call `renderActive()`. So if we implement everything and click on a question, it should mimic the following behavior:

![](https://media.giphy.com/media/lpeE65dnn1OZYY6Npf/giphy.gif)

Make sure this also works for new questions that you insert into the list!

#### Adding Answers

Almost done...

Now, we have a bit of a  tall feature request here:

* We want to answer these questions (that's fine)
* But if we are on a question and someone else answers, we should be able to see the answer that is displayed change as well.
* Also, when we submit, we should also see our answer pop up.

Okay. So the relevant part to implement here is the following method:

```js
  $('#show-question').on('click', '#submitAnswer', function () {
    var answer = $('#answer').val();
    // TODO: When we submit a new answer, send a POST request to
    //      /api/answerQuestion with  the question answer and the active question's
    //      _id.
  })
```

Okay, so we've sent an Ajax POST  request before, so that's fine (ref `/api/addQuestion` AJAX request). But now recall that our `/api/answerQuestion` api route needs a question `_id` to figure out what question it needs to add the given answer to. We already give you an `answer` variable that contains the actual value of our `#answer` textbox.

But now we need to find out what is the active question's Id. Hmm...Perhaps it'll be `data[activeIdx]._id`. Yeah...that'd do it :)

So TODO Here:

* Make an AJAX post  request to the `/api/answerQuestion` url with the data object containing keys answer and `qid` (or whatever you used to refer to your question `_id`).
* On success, don't do anything except console.log whatever response you get.

Okay great, we added  an  answer...but that didn't do anything. In order to actually see the new answer pop up, I need to click on the question again after 2.5 s have elapsed and then i'll get the updated answer. Why is this?

Well...it's because we have no way of getting updated info  on our questions other than the 2.5s interval we have on getting all the questions from `/api/getQuestions` (which in turn will update the `data` array).

We know that the `renderActive()` method will re-look up the question corresponding to the activeIdx. Perhaps it'd be best to call  `renderActive()` every couple of seconds...perhaps every 2.5 seconds!

Edit the `getQuestions()` method AJAX call to be the following:

```js
    $.ajax({
      url: '/api/getQuestions',
      success: function (res) {
        data = res;
        renderPreviews();
        renderActive();
      }
    })
```

That way we constantly update the active question! We should get the following behavior:

![](https://media.giphy.com/media/ja2qFAk1DFhUxm8yQp/giphy.gif)

## Heroku & Submission

Same instructions as last time. But this time, you should try and figure out what files should be added to your git repo and how they should be added :) Contact us over piazza if you have any issues.

Also make sure that you make a file  `heroku_url.txt` with the actual link to your heroku app (it can be the same as last time or different, but we need to know).

**NOTE: You should move the contents of your directory to a new folder and create a new heroku url, NOT the same one as hw5. If  you need help reverting see [@294](https://piazza.com/class/jlfyr4fho1j3rb?cid=294) on piazza.**

### Gradescope Submission

The submission for Gradescope is open. Create a zip file using  the following command (or just zipping the following):

```sh
zip -r submission.zip middlewares/* package.json server.js views/* heroku_url.txt models/* routes/* static/*
```

### Rubric

* /api/getQuestions route does return list of  questions [5pts]
* Questions made in another browser window will reflect automatically on another user's browser without page reload [5pts]
* The UI looks  the same as in examples (set up static dir correctly) [2pts]
* Ability to add question exists w/o page reload exists [5pts]
* Ability to add answer exists w/o page reload [5pts]
* ABility to see answer update in real time w/o page reload exists [3pts]
