---
number: 8
path: "/lectures/8"
date: "2019-01-29"
title: "ReactJS"
---

class: center, middle, block-text

# Lecture 8
## ReactJS

---

class: med-large

# Hype, hype, hype!


1. Developing with React feels like the *future*!
2. It uses a Virtual DOM to make page rendering blazing fast.
3. It reduces code complexity and increases readability.
4. It lets you write isomorphic code.
5. Oriented about code modularization and reusability.
6. If you know JavaScript, you can pick up React in a flash.

In case this wasn't enough, it's maintained by the fine folk at Facebook and in
use all across Netflix ([60 FPS in the browser](https://www.youtube.com/watch?v=g01dGsKbXOk)),
Airbnb, Khan Academy, NYT, Dropbox's
Carousel, WhatsApp Web etc etc.

---

class: x-large

# Agenda

1. JSX
2. React
3. Redux
4. Why use React?

---

class: center, middle, block-text

# JSX

---

class: med-large, smaller-code

## JavaScript + HTML = JSX

JSX is a language extension that allows you to write HTML directly into your JavaScript files. Behind the scenes, it converts all the HTML text to React components.

This means that we use `ReactDOM.render` to render JSX. This function takes in a JSX object (which it renders) and a plain DOM element (which it renders the JSX inside of).

```js
var myDiv = (
  <div class="jsx">
    Greetings from JSX world!
  </div>
);
ReactDOM.render(myDiv, getElementById('container'));
```

---

class: med-large

## The Transformation

JSX maps directly into React syntax, so you never actually have to dig down into the React element-creation API. Here's a side-by-side comparison of the JSX syntax and the equivalent JavaScript:

.col1[
```html
<ul id="list">
  <li>One thing</li>
  <li>another</li>
</ul>
```
]
.col2[
```js
React.createElement(
  "ul",
  { id: "list" },
  React.createElement(
    "li",
    null,
    "One thing"
  ),
  React.createElement(
    "li",
    null,
    "another"
  )
);
```
]

---

class: med-large

## JSX Syntax

It's pretty much HTML, with a few key differences:

* Some common attribute names (like `class` and `for`) are reserved in JavaScript, so they have different names in JSX (`className` and `htmlFor`, respectively).
* Custom attributes (any attribute not in the HTML spec) must have a `data-` prefix.
* Inline styles must be specified as objects, not strings. Properties are camelCased instead of kebab-case. Example: `<div style={{color: 'white', fontSize:'12px'}}>`

---

class: large

## Computed Expression Values

What makes JSX useful is that we don't need to know all the values of the attributes ahead of time. So we can use it as an easy templating engine. For instance, here's an example of a simple login/logout button.

```html
<a
  className="button"
  href={window.loggedIn ? '/logout' : '/login'}
>
  {window.loggedIn ? 'Log Out' : 'Log In'}
</a>
```

In reality, though, these values won't be global - they'll actually come from a React component!

---

class: med-large

## Side Note: How JSX is transformed

We're going to use [Browserify](http://browserify.org/)  to bring the `require` syntax from Node to our browser. It generates one big JS file by parsing the syntax of your program for `require` calls and replacing them with the actual code. As it does this, it also transforms JSX files into plain JS files.

Now, instead of including all the `<script>` tags for our JS files, we only need to include the one that Browserify gives us.

```html
<script src="js/build/main.js"></script>
```

---

class: large

# Using Browserify

With Browserify, we just use the same syntax that we're used to from Node.

```js
// require Lodash from node_modules
var _ = require('lodash');

// require some local file
var utils = require('./utils/index.js');

// export an object to be required elsewhere
module.exports = [1, 2, 3, 4];
```


---

class: center, middle, block-text

# React

---

class: large

# Putting the "V" in "MVC"

React is often used as the View in a Model-View-Controller architecture. It's a really efficient way to update the DOM in response to state changes because it only re-renders things that have changed, rather than just re-rendering everything.

React doesn't really have any utilities for modeling data. It can easily be used with any model framework, including Backbone models.

---

class: large

## Components

Components are the basic building blocks of React. A React application is just a tree of components, each representing a different part of the DOM.

.center[![React Component Illustration](/~cis197/images/react-component-illustration.png)]

---

class: large

# Before we proceed...

React is a fairly new framework and encourages modern syntax standards. The docs for React are written in [ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015), the latest (but not yet fully supported!) syntax standard for JavaScript. It adds in support for Classes, auto bound prototype functions and arrow syntax.

**You can write ES6 code with React!** *

.footnote[We added in a compile task with Gulp for BRUCE.]

---

class: large

# Creating Components

Components are created using `React.createClass`. The only required method is `render` (though we'll discuss many others). This method simply returns a JSX representation of the component.

```js
var HelloWorld = React.createClass({
  render: function () {
    // Return a heading to greet the user.
    return (
      <h1>Hello {this.props.name}!</h1>
    );
  }
});
```
---

class: large

# Creating Components *in ES6*

Syntactic sugar from ES6 means we can use the `class` syntax as follows.

```js
class HelloWorld extends React.Component {
  render() {
    // Return a heading to greet the user.
    return (
      <h1>Hello {this.props.name}!</h1>
    );
  }
}
```
---

class: med-large

# Rendering Components

Once we have a component, we can refer to it *as a JSX element* using its variable name. Here's an example of rendering a `HelloWorld` component with a name `'CIS 197'`. An important caveat however, is to ensure that all React component names
are *capitalized*!

```js
ReactDOM.render(
  // Here's the name prop from the previous slide!
  <HelloWorld name={'CIS 197'} />,
  document.getElementById('container')
);
```
---

class: large

# State and Props

The previous example used `this.props` to access a value that was defined as a JSX attribute. These values are called **properties**, and they should be treated as immutable by their components (though, this being JavaScript, they're very mutable).

Mutable values are encapsulated as the **state** of a component. A component is allowed to mutate its state, usually in response to events.

---

class: large

# Changing State

Changing state implies that information encapsulated in your React component has changed, which means you should re-render the component to update the DOM. *You should never modify state directly!* Instead, use React's `setState` function which does
this for you.

```js
var HelloWorld = React.createClass({
  updateGreeting: function() {
    this.setState({greeting: 'Goodbye World!'});
  },
  ...
  render: function () {
    // render code from before
  }
});
```
---

class: large

# Default State

You can set default state for React components using the `getInitialState` function, which returns an object to be assigned as initial state (`this.state`) for the component.

```js
var HelloWorld = React.createClass({
  getInitialState: function() {
    return {greeting: 'Hello World!'};
  },
  ...
  render: function () {
    // render code from before
  }
});
```
---

class: med-large, smaller-code

## Event Listeners

Event listeners are set up in JSX. They should refer to functions on the component, which will (almost always) then update the state of the component using `setState`.

```js
var LikeButton = React.createClass({
  getInitialState: function () {
    return {liked: false};
  },
  toggle: function () {
    this.setState({liked: !this.state.liked});
  },
  render: function () {
    var txt = this.state.liked ? 'Unlike' : 'Like';
    var color = this.state.liked ? '#3b5998' : '#627AAC';
    return (
      <span onClick={this.toggle} style={{color: color}}>
        {'\ud83d\udc4d' + txt} // 👍
      </span>
    );
  }
});
```

---

class: med-large, smaller-code

## The Component Lifecycle

React components allow you to override certain functions that let you hook into different stages of a component's *lifecycle*. A few functions from the
[Component Docs](https://facebook.github.io/react/docs/react-component.html) are demonstrated below.

```js
var LikeButton = React.createClass({
  // extending the component from the last slide
  componentDidMount: function() {
    // triggered the first time the component
    // is mounted into the DOM
    console.log('Mounted to the DOM!');
  },
  componentWillUpdate: function() {
    // triggered *before* props or state change
    console.log('About to receive new state or props!')
  },
  componentDidUpdate: function() {
    // triggered *after* props or state change
    console.log('Received new state and/or props!')
  }
});
```

---

class: large

# Nesting Components

A component can have subcomponents, which can have components themselves, and so on. This allows for component re-use, and it's very intuitive, since a component is JSX looks just like any other element.

Generally a higher level component will change its subcomponents when it re-renders itself. Since React efficiently recomputes the DOM, this is much more efficient than it sounds!

---

class: center, middle, block-text

# Redux

---

class: large

# Managing Application State

Rather than using traditional models to manage our React application, we're going to do something a little different. Instead of keeping a model for every component, we're just going to keep track of the state of the whole app at once!

---

class: med-large

# How Redux Works

Redux keeps track of the state of your application behind of the scenes. To change the state, you can *dispatch actions* (which are just arbitrary JS objects). The event is passed to the *reducer*, which is a function of type **(state, action) -> state**. Finally, you can use *subscribe* to run a function whenever the state changes.

This is a lot like an event listener, but the difference is that with Redux, everything depends on the state. Subscribed functions don't have access to the event that caused the change to state.

---

class: med-large, smaller-code

## Quick Redux Example

```js
var redux = require('redux');

var reducer = function (state, action) {
  if (action.type === 'INCR') {
    return state + 1;
  } else if (action.type === 'DECR') {
    return state - 1;
  }
  return state;
};

// create store with initial state 10
var store = redux.createStore(reducer, 10);
store.subscribe(function () {
  console.log(store.getState());
});

store.dispatch({type: 'INCR'});
store.dispatch({type: 'INCR'});
store.dispatch({type: 'DECR'});
store.dispatch({type: 'DECR'});
```


---

class: med-large

# Using React with Redux

You don't *need* to use React with Redux - they work fine on their own, or with other frameworks like Backbone. But the combination is really nice. Redux is a way of keeping track of state, and React components efficiently update based on their state. So if we just update the state of the top-level React component when the application state changes, we have a working app!

The tricky part is updating state based on events. To dispatch an action in response to event (like `click`), a component needs access to the store itself. For small applications, this isn't too bad; for larger ones, we may want to factor out this code into other modules.

---

class: x-large

# Example Code

Some example code for React is available on [the CIS 197 Github](https://github.com/cis197/react-examples). Be sure to reference this when completing the homework assignment!

---


class: x-large

# Coming Up

* Homework 7 - The Game of Life
* Start thinking up some final project ideas!
