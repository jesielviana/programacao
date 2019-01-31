---
path: "/assignments/2"
date: "2019-01-29"
due: "2019-02-05"
title: "Homework 2: Async, Events, and Callbacks"
---

Due **Tuesday, September 18, 11:59:59pm**.

Download the implementation stub [here](/~cis197/assignments/build/CIS197_HW2.zip).

### Before starting this assignment

Review [Lecture 2](/~cis197/lectures/lecture2).

Install the async, request, and sax libraries by running `npm install` in the root of your homework directory.

We will be interacting with our own simplified version of the New York Times API (our own wrapper around the API calls) to obtain metadata from articles published on their website. If you haven't worked with APIs before, here's a short article that explains [what they are](http://www.makeuseof.com/tag/api-good-technology-explained/).

### **IN ORDER TO PROCEED, YOU NEED TO GET AN API KEY FROM THE NEW YORK TIMES WEBSITE AS SOON AS POSSIBLE**

**Instructions**
* Visit the NYT developer website [by clicking here](https://developer.nytimes.com/accounts/create)
* Create an account (and verify your email)
* Select "My Apps" from the account dropdown at the top right
* Click "Create new App"
* Fill out App Name and Description. Make sure that your Description makes sense. Select the following APIs:
  - Most Popular API
  - Article Search API
* Copy your API key, which is available under "API Keys"
* Paste this API key into `api/config.js` (in your project directory) and change the string `YOUR_API_KEY_HERE` to whatever your api key ends up being. It should still look something like this

```javascript
module.exports = {
  apiKey: 'NoticeIStillHaveQuotesAroundThisString'
}
```

**Typically the NYT team will send you an API key within 30 minutes of submitting the form, but it is best to get issues resolved earlier rather than later.**

## Overview: API Interactions

In this assignment, you'll be writing a Node script that uses callback functions to interface with the NYT API. The final product will output the five topics that are currently most popular among NYT readers, as well as links to recent articles related to each of the topics. This kind of script can serve as an easy way for someone without a lot of time to keep up with trending news.

You'll need to accomplish three main tasks:

1. Fetch the weekly most viewed articles using the NYT Most Popular/Article Search API.
2. Determine the five most frequently used keywords using the XML parser [sax.js](https://github.com/isaacs/sax-js).
3. Fetch and display articles related to the keywords using the NYT Search API.

Although there are quite a few moving parts involved, the async.js library will help us pull the methods you write together into a streamlined, easily refactored script.

------------------------------------------------------

## Part 1: Fetching popular articles

**`pullTrendingArticles.js`**

In order to obtain the data we need, we'll use the [request](https://github.com/request/request) library. Conveniently, we have put the logic to handle all this low level request logic within `api/nyt.js`. From your end, all you need to interact with is the resulting functions from the `nyt` wrapper we gave you.

But regardless, it is useful to cover. Since we haven't covered HTTP in class yet, you don't need to worry about how request is communicating with NYT servers.

Here's a simple example of request in action:

```javascript
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body); // Show the HTML for the Google homepage.
  }
});
```

Notice how `request` is asynchronous: after it receives a response from the URL (the first argument), it passes the information to a callback function (the second argument). You will be making a request to the New York Times API Servers (you can see the exact urls in `api/nyt.js`) in order to get the data you need.

### Explanation of NYT Wrapper Library

For this assignment, we made a wrapper around the API requests in `api/nyt.js` (using the requests library). So if you wish to do a call to get the most popular articles and their metadata, you can just do the following

```javascript
var nyt = require('./api/nyt');

nyt.mostPopular(function (err, res, body) {
  console.log(res.statusCode); // -> 200
  console.log(body); // -> all the content
  console.log(err); // -> null
)}
```

**TODO:** Write `pullTrendingArticles`.

This function will get metadata of the most popular articles by calling `nyt.mostPopular` and handling its response via a callback (look at the code example above to see what the function signature of your callback should be). Notice that the `pullTrendingArticles` function header accepts a `callback` argument.

Note that we need to handle errors from the `nyt.mostPopular` request as well. For instance, what if the internet cuts out while the script is running? For all the methods in this assignment, the callback function (for the `nyt.mostPopular` call) will take an error (possibly null) as the first argument, and any actual data as subsequent arguments. If there weren't any errors and the response status code is `200`, pass `null` and the response's `body` to the callback. For all other cases, pass an error to the callback. It is possible that the error is `null` and `response.statusCode` is not 200; in these cases, make sure to create and pass an error to the callback function. As a refresher, we create errors like so

```javascript
var error = new Error("SOME USEFULL ERROR MESSAGE");
```

To test out your functionality: Create a file called `testHw2.js` (or whatever you want) with the following contents:

```javascript
var pullTrendingArticles = require('./pullTrendingArticles'); // import the function from the pullTrendingArticles file

pullTrendingArticles(function (error, response) {
  if (error) console.log('OOPS: ' + error);
  console.log(response); // this should be a huge string that looks like <foo>bar</foo><bazz>buzz</bazz><fuzz>wuzz</fuzz>...
})
```

You can run this file by executing `node testHw2.js`. Make sure that this component of the homework works before moving on.

------------------------------------------------------

## Part 2: Parsing metadata with sax.js

**`countKeywords.js`**

The article metadata we just grabbed is formatted in XML, a markup language consisting of nested tags very similar to HTML. In a nutshell, XML describes data, in this case information about NYT articles, in a standardized, machine-readable form.

[Here](http://www.w3schools.com/xml/xml_whatis.asp) is a short and sweet explanation of XML, and [this](http://www.w3schools.com/xml/simple.xml) is an example of an XML file. If you haven't seen XML before, **read these before continuing.**

Now, our next task is to find article keywords and keep track of how many times they show up. Luckily, there's a node in each article's XML containing a list of its keywords: `ADX_KEYWORDS`. Its text field might look something like this:

```text
Forests and Forestry;Firearms;Federal Lands;Hikes and Hiking;National Rifle Assn;Colorado;Utah
```

Note how each keyword is separated by a semicolon.

How do we extract this information? That's where [sax](https://www.npmjs.com/package/sax) comes in. The sax parser will read in an XML document and provide callback hooks for events that occur during parsing. We need to define these events appropriately to extract the information we need.

The parser events we're interested in are the following:

- `onerror`: an error occurred; call the callback with the error
- `onopentag`: parsed an opening tag for a node, like `<title>`. The argument `node` given `onopentag` is an object that contains a field called `name`. `node.name` will be something like `title`. (This makes sense if you look at the code.)
- `onclosetag`: parsed a closing tag for a node, like `</title>`
- `ontext`: parsed some text within a node
- `onend`: finished parsing the document

Here's an example of SAX in action, parsing a (somewhat simplified) version of the XML from the New York Times. You'll see that as SAX encounters tags and text, it calls the appropriate event with the corresponding argument.

![sax parsing animation](/images/sax-animation/sax-demo.gif)

While parsing, you'll need some sort of updatable data structure to keep track of keywords as they appear and their frequencies (using an object as a dictionary is a good approach here). After parsing finishes, your `onend` method should find the five keywords that appeared the most. An elegant approach, although not the only way, is to create an array from the keywords and use JavaScript's `Array.sort()`, passing in a comparator function.

I've already provided a skeleton of what the parser should look like; just fill in the provided methods. Hint: We only care about what's between `<ADX_KEYWORDS>` tags.

**TODO:** Write `countKeywords`. It should parse the metadata XML and pass an array containing the five most frequently used keywords, *in descending order of popularity*, to its callback. You should probably use [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to sort the array!

**NOTE**: Sometimes the keywords have trailing whitespace. You can use the [trim method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) to get rid of this before adding them to your data structure. Another useful method is [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), which splits a string along a separator character. This will make it a lot easier to deal with the text in ADX_KEYWORDS, once you isolate it.

To test the function, update your test file to now import countKeywords.js and console.log the expected results. here is what your test file should be (note from here on out, we won't give you test file but will give expected output at every step):

```js
var pullTrendingArticles = require('./pullTrendingArticles');
var countKeywords  = require('./countKeywords');

pullTrendingArticles(function (error, response) {
  console.log(error);
  //console.log(response);

  countKeywords(response, function (cKerror, topKeywords) {
    console.log(cKerror)
    console.log(topKeywords)
  })
})

```
Make sure that this component of the homework works before moving on.

Output should look something like this:
```sh
request processed
null
null
[ 'United States Politics and Government',
  'Trump, Donald J',
  'Midterm Elections (2018)',
  'Williams, Serena',
  'Republican Party' ]
```

------------------------------------------------------

## Part 3: Finding related articles

**`pullRelatedArticles.js`**

We now have an array containing five trending keyword strings sorted by popularity. For now, let's focus on finding the related articles for a single entry in the array. We'll once again be using request.js, but this time, we'll query the [Search API](http://developer.nytimes.com/docs/read/article_search_api_v2) with our keyword string.

**TODO:** Write `pullRelatedArticles`. This function takes in a query and a callback, and uses the request library to grab the data.

We want article metadata from the 10 (that's the default) most *recent* articles that show up as search results for our query. This time, the response format will be JSON, *not XML*. After checking for any errors or inappropriate status codes, you should pass to the callback an object containing two fields: `query`, with the query you used, and `JSON`, with the response's `body`.

We can't quite pass in the array of all the popular keywords we got from the last function (countKeywords) to test this. However for testing, you can do a call like

```js
pullRelatedArticles('Williams, Serena', function (...you put in args here...) {
  ...do what you need to here
})
```

Ultimately an output of pullRelatedArticles should give to its callback something like the following result (if there are no errors):

```sh
{ query: 'United States Politics and Government',
  JSON: '{"status":"OK","copyright":"Copyright (c) 2018 The New York Times Company. All Rights Reserved.","response":{"docs":[{"web_url":"https://www.nytimes.com/reuters/2018/09/11/world/europe/11reuters-spain-politics-catalonia-explainer.html","snippet":"At the height of the crisis over Catalonia\'s secession drive last year, thousands of companies moved their legal headquarters out of the region, the Madrid stock market and government ... }
```

------------------------------------------------------

## Part 4: Streamlining callbacks with async.js

**`processKeywords.js`**

It would be pretty convenient if you could apply the `pullRelatedArticles` method you just wrote to each entry in the keyword array. Well, the asyncJS library allows you to [do just that](https://caolan.github.io/async/docs.html#map) in a single line of code. We want to map each keyword we obtained from the previous step through pullRelatedArticles to create a new array containing related articles for each keyword.

For example, we might have the keywords `['Williams, Serena', 'B, Taras']`. Then, the callback should be called with an array that looks like this `[{articles_related_to_serena}, {articles_related_to_taras}]`.

**TODO:** Write `processKeywords`.

*Note:* In order to understand the `map` how this function works, it's essential to read the provided documentation, linked [here](https://caolan.github.io/async/docs.html#map).

Update `testHw2.js` to look like this:

```js
pullTrendingArticles(function (error, response) {
  console.log(error);
  console.log(response); // <- this is just the general trending articles responses

  countKeywords(response, function (error, topKeywords) {
    console.log(error)
    console.log(topKeywords) // <- this is the top keywords parsed out of those trending artilces

    processKeywords(topKeywords, function (err, rel) {
      console.log(err);
      console.log(rel); // <- this is an array of (large) JSON objects (each of which contains a bunch of articles for each keyword from the previous step
    })
  })
})
```

Make sure that this component of the homework works before moving on.

------------------------------------------------------

## Part 5: Putting it all together

**`getTrendingKeywords.js`**

We're almost done - now we just have to link all the methods we wrote together. With so many callbacks involved, it's easy for our code to get messy. The async library has another good solution, in the form of the [waterfall](https://github.com/caolan/async#waterfall) control flow function.

Using `waterfall` is optional. Any code that successfully weaves together the callbacks is fine, although a waterfall implementation is highly recommended because it's simply better style than marching callbacks.

**TODO:** Write `getTrendingKeywords`. The provided method, `displayRelatedArticles`, will be passed in as the callback argument. Remember that you'll need to call the wrapper functions you wrote in Parts 1 and 4 with API key arguments to obtain the actual functions.

------------------------------------------------------

## Submitting to Gradescope

Run `gulp zip` and submit the `files.zip` file that's made. On gradescope submit all the files that gets outputted on the upload interface.

![Gradescope submit](https://i.imgur.com/kXJEg0b.png)
