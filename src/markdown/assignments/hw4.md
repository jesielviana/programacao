---
path: "/assignments/4"
date: "2019-01-29"
title: "Homework 4: Pokémon Map Builder"
hidden: true
---

Due **Thursday, October 4th, 11:59:59pm**.

Download the implementation stub [here](/~cis197/assignments/build/CIS197_HW4.zip).

### Before starting this assignment

Review [Lecture 4](/~cis197/lectures/lecture4). You may also find the resources on the [lecture page](/~cis197/lectures) helpful.

If you are completely new to jQuery, you might want to go through
[this tutorial](http://learn.jquery.com/about-jquery/how-jquery-works/)
on the jQuery website.

## Building a map builder

![map-builder](/images/map-builder.gif)

This project will introduce you some important jQuery concepts while helping you
design a map-building application. It will run entirely in the browser; you're
going to submit the whole client-side application (well, the JS parts at least - we'll provide the HTML and CSS). It's inspired a lot by Pokémon maps. Here's a general outline of the functionality:

1. Pick a swatch from the palette
2. Hover over the map canvas to see swatch in context
3. Click on the canvas to paint it with a selected swatch
4. Use the arrow keys to navigate a player sprite around the map.

To begin, take a look at the provided HTML and CSS files that lay out the map
building interface. There are a few files linked to the `index.html` web page -
styles in `main.css`, the jQuery library in `lib/js/jquery-1.11.0.js`, and the
scripts that you will produce in this assignment: `map-builder.js` and `player.js`.

There are two main sections of concern in `index.html`: the
swatches palette at the top and the map canvas below it. The map swatches are
already populated for you and have associated tile images (they show up as
background images applied through CSS). A palette swatch looks like this:
```html
<li class="swatch water-se"></li>
```

`water-se` is the swatch name; **this will be the same class name applied to map tiles to build up the map**. A 'selected' swatch will have the special 'selected' class applied to it - the default selected swatch should be 'grass'. **Do not change the default selected swatch to something other than 'grass' - we'll expect it to start out as grass in our tests.**

***TODO***: Start off by creating a JavaScript class called `MapBuilder` to
encapsulate the map builder logic (this will make it easy to convert to a JS
plugin later on). Its constructor should be accept two arguments:

1. A jQuery element that represents the map-builder container. It should contain
 a `.palette` element and `.map` element within it. In the provided HTML page,
 you can immediately see that this corresponds to the `<div id="map-builder">`
 container in the document body. The constructor should save this provided
 `$elem` (note the prepended `$` on jQuery variable names) as a property in
 the `MapBuilder` instance.

2. An *optional* params object with `width` and `height` properties indicating how
 large the map should be in tile dimensions. When this argument isn't
 provided, the `MapBuilder` should resort to some reasonable stored defaults - in
 this case, a width of 30 and a height of 15.

_Note_: For this project, it is likely that all the work done by `MapBuilder` will occur in its constructor (not through any instance methods after
construction). We're using the class more as a method of organization and
encapsulation rather than for more "traditional" object-oriented purposes. However, note that this does allow us to pass a MapBuilder object to our Player class, which will greatly simplify things later on.

------------------------------------------------------

## Selecting swatches

![select-swatches](/images/gifs/select-swatches.gif)

The first task will be to have `MapBuilder` keep track of which swatch is
currently selected in the palette. Visually (in CSS), we'll represent this with
the `'selected'` class on swatches. If the 'grass' swatch is selected, its
palette element looks like this:

```html
<li class="swatch grass selected"></li>
```
***TODO***: Write a function on the `MapBuilder` prototype called
`setupPalette` that gets invoked in the builder constructor (in `main.js`).
This setup function should bind a `click` handler to palette swatches that

1. Ensures only one swatch ever has the 'selected' class (check out jQuery's
[`.addClass`](https://api.jquery.com/addclass/) and
[`.removeClass`](https://api.jquery.com/removeclass/) methods).
2. Stores the currently selected swatch name in the `MapBuilder` instance.
 You'll probably want a helper function to extract the swatch name from a DOM
 element. It will be helpful to get access to the raw DOM element `classList`.
 For example:

```js
$grassSwatch = $('.swatch.grass');  // jQuery element

grassSwatch = $grassSwatch.get(0);  // DOM element

grassSwatch.classList;              // DOM NodeList, which works like an array (an array-like object!)
```

__Debugging__: Try logging the swatch name to the console every time the
selected swatch changes. You ought to be able to click a bunch of swatches and
see this value update to values like `'water-se'`, `'fence-nw'`, `'cave'`, etc.

------------------------------------------------------

## Drawing the map canvas

***TODO***: Next, write another similar setup function for the map canvas. It
should generate `<div>`s for the map tiles according to the provided map size
dimensions and insert them into the DOM inside the `.map` element. A 2 x 2 map
would look like this on the page:

```html
<div class="map">
  <h3>Map Canvas</h3>
  <div class="row">
    <div class="tile swatch grass"></div>
    <div class="tile swatch grass"></div>
  </div>
  <div class="row">
    <div class="tile swatch grass"></div>
    <div class="tile swatch grass"></div>
  </div>
</div>
```

If you use the same class names as listed here, the styles provided with the
assignment should work right off the bat.

As mentioned in lecture, it's possible to __generate__ a DOM element with jQuery
by passing an HTML tag string to `$`, like this:

```js
var $newDiv = $('<div>');

// We can invoke jQuery methods on this new div
$newDiv.addClass('swatch');
```
Until you write `$newDiv` into the `document`, however, it only exists in your
script. Take a look at jQuery's [`.append`](https://api.jquery.com/append/) method
to write elements into the page DOM.

_Note_: this layout could have been implemented with a `<table>` (it is, after
all, simply a grid), but using `<div>`s allows us to write simpler CSS.

------------------------------------------------------

## Previewing swatches

![preview-swatches](/images/gifs/preview-swatches.gif)

While building our Pokémon level map, it would be nice to preview what a map
tile would look like in position on the canvas. There are a few ways you can
make this work with classes, some of which don't require edits to the provided
CSS file. A map tile simply looks like:

```html
<div class="tile swatch grass"></div>
```

So if you swap out `'grass'` for another swatch name, it takes on that swatch's
appearance.

***TODO***: On construction, `MapBuilder` should bind event handlers to the
newly generated tiles. In particular, we are interested in the `mouseenter` and
`mouseout` events on each tile `<div>`. When the mouse hovers over a tile, it
should take the appearance of `MapBuilder`'s selected swatch.

* `mouseenter`: edit the tile's CSS classes so that it appears to look like the
selected swatch

* `mouseout`: restore the tile's original "painted-on" swatch appearance with
CSS classes

Remember that jQuery event handlers have this general form:

```js
function onMouseEnter (e) {
  // An event handler's context gets bound to its target element on the
  // page. Here, we create a jQuery object handle for the element.
  var $this = $(this);
  // do stuff
}

$myDiv.on('mouseenter', onMouseEnter);
```

_Hint_: If you need to store information on a DOM element, it's common to use
a `data-` attribute. You can give this any name; it looks something like this:

```html
<li class="swatch grass" data-seq="1"></li>
```

You can then access these attributes in jQuery:

```js
var $grass = $('.swatch.grass');

$grass.data('seq');       // --> '1'
$grass.data('seq', 2);    // updates the 'data-seq' attr
```

------------------------------------------------------

## Painting swatches

Now the fun part! To allow a user to "paint" a swatch (make it stay in place on
the map canvas), we'll make them click on a tile. That tile should then take the
appearance of the selected swatch.

![paint-swatches](/images/gifs/paint-swatches.gif)

***TODO***: On construction, `MapBuilder` should bind a `mousedown` event
handler to the map tiles. This handler will be similar to `mouseenter`, but
you'll have to do something special to ensure that the swatch appearance doesn't
revert when the mouse leaves the tile.

***TODO***: In addition, you should implement tile painting by dragging. This
can all be done with just the `mousedown` and `mouseenter` events. Think about
what should happen to a tile when the mouse enters it AND the mouse button is
already clicked.

_Hint_: You can access the pressed key or mouse button in an event handler
through the event object:

```js
var LEFT_MOUSE_BUTTON = 1;

$grass.on('mousedown', function (e) {
  e.which === LEFT_MOUSE_BUTTON;      // --> true
});
```

However, you can do it without accessing the `e.which` property by storing the mouse
state with a *closure* - and I encourage you to try to do it this way!

------------------------------------------------------


## A playable character

![preview-swatches](/images/gifs/playable-character.gif)


It's time to get adventurous like Ash Ketchum and implement a playable character
within this map once it's built. There are sprites for Pikachu in all four orientations
(left, up, right, and down) in `hw4/lib/images/sprites` - they correspond to the classes
'facing-left', 'facing-up', 'facing-right', and 'facing-down' in the CSS.

We are going to implement a separate class called `Player` that generates a player on the map page. This player can move around with the arrow keys.
They should be able to move over terrain (e.g. grass) but not through obstructions.

The `Player` constructor will take 3 arguments: an x-coordinate, a y-coordinate, and
a `MapBuilder` instance. This is where making the `MapBuilder` class comes in handy -
we've assigned the `builder.$elem` to be the container for the entire map builder, and
we can access this from `Player` now. We can also tack on useful properties like `width`
and `height` to the builder and reference those from `Player`. Neat!

__TODO__: Create an element for the player and add it to the DOM. Again, you'll need to
create an element by using the jQuery syntax:

```js
$('<div>').addClass('player facing-down');
```

Once you've created the element, you'll need to add it to the DOM. The correct element
to add the player to is a child of the map builder element with the class `.map`. If you
don't add it to the correct element, its position will be messed up!

**TODO**: Display the player element at the correct position on the page. You must do this
by setting the `left` and `top` properties in CSS. For instance, if the player's current coordinates are `(x, y)`, then you would set the `left` property to `(x * SWATCH_SIZE)` and
the `top` property to `(y * SWATCH_SIZE)`.

**TODO**: Listen for keydown events on `document` and move the player accordingly.

Actually listening for these events is pretty easy. You'll wrap the `document` in a jQuery object, and bind an event for `keydown`. You'll need to look at the *event object* to determine which key was pressed. The key codes for [left, up, right, down] are [37, 38, 39, 40], respectively; and the relevant property is `event.which`.

The tricky part is determining whether a move is valid. You need to ensure that

1. The player does not go out of the map boundaries, and
2. The tile that the player is moving into is *terrain* and not an obstacle.

We've provided you with a handy `isTerrain` function that, given a swatch name, will tell
you whether the player can be moved into it or not. However, you'll need to dig into the
map itself to determine the swatch name for a given coordinate.

**Hint**: Check out the [`.eq`](https://api.jquery.com/eq/) method in jQuery - it grabs
the nth object from a set of matches.

Make sure that you're changing the *orientation* of the player on each move, regardless of
whether the move is valid or not. For instance, if the player starts off facing down at
`(0, 0)` and you receive a 'left' keydown event, you cannot move the player (since this
would run them off the map). However, you would *still* change their orientation class to
'facing-left' even though the coordinates haven't changed.


------------------------------------------------------

## Make cool maps

If you build any cool Pokémon maps once you're finished with the assignment,
please share them! Post a screenshot to the class Piazza forum.

------------------------------------------------------

## Submitting to Gradescope

Submit to gradescope and only upload the `map-builder.js` and `player.js` files. No other files are needed for this assignment.  
**Note: There are a total of 23 tests; however, not all tests will execute if there are errors that break the testing suite** . So double check that you have
completed all the tests before believing you are done. Ask on piazza if you have any questions!

------------------------------------------------------

## Debugging

Check out the Chrome DevTools docs / tutorials on
[JavaScript debugging](https://developers.google.com/chrome-developer-tools/docs/javascript-debugging).
