---
path: "/assignments/hw3"
date: "2019-01-29"
title: "Homework 3: Object Oriented JavaScript"
---

Due **Tuesday, September 25th, 11:59:59pm**.

Download the implementation stub [here](/~cis197/assignments/build/CIS197_HW3.zip). Note that this homework will be much lighter than last week's.

### Before starting this assignment

Review [Lecture 3](/~cis197/lectures/lecture3). You may also find the resources on the [lecture page](/~cis197/lectures) helpful.

## Practice with Prototypes

In this assignment, you will practice object-oriented JavaScript in three ways. First, in `animals.js`, you will implement some simple classes using prototypes. In `vehicles.js`, you will implement several *subclasses* of the Vehicle class using prototypal inheritance. Lastly, in `planets.js`, you can see how the same functionality exists in the latest ES6 standard.

The implementation instructions can be found in the stub code.

## Submitting the Assignment

This assignment can be submitted to Gradescope as usual.

In order to submit your assignment, please use the provided Gulp routines to first compile and then zip up your assignment files. This can be done with the following commands (in this order):

```bash
gulp compile
gulp zip
```

You will need to run both each time you save a new version of any of the files in this homework. This is important since the compilation takes your ES6 code and transpiles it to industry standard ES5 code for the tests.

Submit the contents of the files.zip file (should be animals.js, vehicles.js, and planets.js) to gradescope.
