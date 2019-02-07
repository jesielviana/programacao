---
path: "/assignments/7"
date: "2019-01-29"
title: "Homework 7: Conway's Game of Life"
hidden: true
---

Due **Tuesday, November 13, 11:59:59pm.**

Implementation stub available for [here](/~cis197/assignments/build/CIS197_HW7.zip).

## Before starting this assignment

Review [Lecture 7](/~cis197/lectures/lecture16). You may also find the official documentation pages for [ReactJS](http://facebook.github.io/react/docs/getting-started.html) and [Redux](http://redux.js.org/) helpful.

If you need a more in-depth look at how Browserify and Gulp work, check out their official pages [here](http://browserify.org/) and [here](http://gulpjs.com/).

JSX is a funky language that mixes HTML and JavaScript syntax together. To get proper syntax highlighting in Sublime Text, install [Babel](https://packagecontrol.io/packages/Babel) using [Package Control](https://packagecontrol.io). Then in Sublime, change your highlighter by selecting View -> Syntax -> Babel -> JavaScript (Babel). This does *not* affect the way your code will function in any manner.

## The Game of Life & ReactJS

Conway's Game of Life is a popular two-dimensional cell board simulation that, given a starting configuration and set of survival rules, evolves without any user input. You begin with any arrangement of *living* cells in a grid and start the simulation to watch how their individual state changes iteratively, relative to the cells surrounding them. It's actually pretty neat - take a look at how an example run looks below:

![Neat image here](http://lh6.ggpht.com/_bazwyKf2FDM/Sm3hcNDUHRI/AAAAAAAACAM/WQJlB2rJg3A/gosper.gif)

You're going to build your own version of this using a frontend view library called ReactJS, or React, in conjunction with another library called Redux, which serves as a predictable state container for JavaScript apps and lets you write more robust, scalable frontend applications.

Once you're done, the final application will look something like this:

![Final application photo](http://i.imgur.com/AttFsM0.png)

------------------------------------------------------

## Project Setup

**Using Node.js, Gulp, and Browserify**

React developers use a language called JSX which acts as syntactic sugar for building HTML-like elements from scratch. While this makes a lot of the associated code easier to both write and understand intuitively, additional steps have to be taken to ensure web browsers can translate JSX into pure JavaScript.

`Note: A server must to be used to host the files, since JSX is`
`pre-compiled to JavaScript by a third-party transformer. To`
`avoid cross-origin requests the files cannot be directly`
`retrieved from local filepaths.`

This project will make use of several libraries to function correctly, and in order to import and manage all of them, Browserify and Gulp will come in handy.

We'll use Browserify to allow us to use libraries from npm (such as lodash, React, Redux, or even async) on the browser. And we'll use Gulp to automate the otherwise tedious build process (basically, it will make it such that any time you save a frontend JS file, the gulp process will first convert all the JSX to pure JavaScript and then use Browserify to convert your node-style `require`'s and `module.exports`'s into a form the browser can understand. The result is one big build file located in `/public/build/main.js`, which contains the entire frontend application).

To run and test the application in your browser, fire up the node server by running `npm start` and navigate to `localhost:3000/`.

------------------------------------------------------

## Part 0 - Application Overview

### 0.1 Redux Application Architecture

First, take a look at the app's main entry point, located in `/public/main.jsx`. Here, you'll see some boilerplate for initializing a React application that uses Redux. The most important line is the one where we use React to render the top-level `<GameOfLife>` React component. You can find the code for `GameOfLife` in `/public/components/GameOfLife.jsx`.

You'll notice that we implement a function called `onImportSeed` that delegates to the `dispatch` function of our Redux store, which has been passed in as a React prop, `this.props.store`. The idea here is that, when an action is performed on the React frontend, such as a button click to import a seed,  we dispatch a Redux action to update our application state. In this case the action is the one located at `actions.importSeed`.

You're probably wondering what actions are and where they come from. Navigate to `/public/actions/index.js`. Here you will find an incomplete list of all the Redux actions that this application can perform. The core idea behind Redux is that every state change in the application can only occur through the dispatching of a registered action. This way, you can very easily predict the lifecycle of your application over time, and you do away with state mutation complications altogether (more on this later).

The structure of a Redux application is such that every time an action is dispatched (with some optional data passed along with it), a Redux reducer function will take the current state and the recently dispatched action and compute the *new* state in a predictable way. The only way to change state is via an action to the reducer.

Notice that in the entry file `main.jsx`, we initialize a variable called `store` by passing `Redux.createStore` our `mainReducer` function, exported from `/reducers/index.js`. Also note that we pass it our initial application state, too. This is how you initialize the base structure for a Redux application.

### 0.2 Example of Dispatching of Redux Action to Redux Reducer

To illustrate the role of the reducer in the application, consider the following example. First, the run button located in the main React component, `GameOfLife`, is clicked. The click handler on the `<button>` in that component then calls some function that uses the `store` prop in the `GameOfLife` component to dispatch an event of the form `action.run()`. This then dispatches a `RUN` action to to our main reducer (registered in `main.jsx`, defined in `/public/reducers/index.js`).

Now, our reducer is called with the current state of the application and the result of `action.run()` (an object of the form `{ type: 'RUN' }`) as parameters. The job of the reducer is to determine how to compute the *next* state based on the current state, the action just performed, and any additional data (which would be located in the action object if it existed).

Because Redux does not let you mutate state directly, any changes in application state require that the state object be rebuilt entirely. This is most easily done by using an immutability helper of some sort, or, in our case, lodash's [`_.assign`](https://lodash.com/docs#assign) function.

Anyway, once the reducer returns the next state, Redux will re-render the application with the new state and wait for more actions to be dispatched.

*Note: If you still don't feel totally comfortable with Redux, we recommend you try reading the [Redux documentation](http://redux.js.org/index.html).*

------------------------------------------------------

## Part 1.1 - Setting up the Redux Actions

First, we want to decide on our [Redux Actions](http://redux.js.org/docs/basics/Actions.html).
Each action object describes an event that has occurred in the application and contains a `type` and any additional information.

Again, the idea is that when an event occurs that changes the application state, an action of a particular type gets dispatched to the Redux reducer, and the application state is updated accordingly.

Navigate to `/public/actions/index.js` to fill out the remaining action creator functions. We've implemented a couple of them for you, but you'll need to do the rest.

------------------------------------------------------

## Part 1.2 - Setting up the UI and Initial State

Now that we've enumerated all possible actions that can lead to state changes in our application, we're prepared to begin building out the UI.

### Part 1.2.1 - Writing the Markup for GameOfLife.jsx

First, navigate to `/public/components/GameOfLife.jsx` and complete the `render` function that generates the component's JSX.

### Part 1.2.2 - Writing the Markup for Cell.jsx

Now, head over to `/public/components/Cell.jsx` and complete the render function as specified in the TODO comments.

------------------------------------------------------

## Part 1.3 - Implementing the Redux Reducer

So far, we've defined all the Actions that can change the state of the app, and we've built React components to display the game board and its cells.

Now, it's time to finally handle those actions!

Head over to `/public/reducers/index.js` and follow the instructions in the comments for completing the action handlers in the reducer.

------------------------------------------------------

## Submitting to GradeScope
Yay! You're done.

Run the following:

```sh
gulp compile
gulp zip
```

And then upload the `files.zip` archive that is created to gradescope.
**Note:** please do not attempt to zip the files from the GUI, or using any other zip utility. Only use gulp. Invalid submissions may crash the submission system!

------------------------------------------------------
## Debugging

Check out the Chrome DevTools docs / tutorials on
[JavaScript debugging](https://developers.google.com/chrome-developer-tools/docs/javascript-debugging). There's also a handy chrome extension developed by the folks over at Facebook, which can be found [here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).
