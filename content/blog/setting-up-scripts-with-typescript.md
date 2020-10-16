---
path: setting-up-scripts-with-typescript
date: 2020-09-16T20:12:18.415Z
lastUpdated: 2020-09-16T20:12:18.457Z
title: Setting up scripts with Typescript
description:
  Everyone needs to script a process to become more efficient. If we
  frequently update a script it's nice to have documentation and completion.
  Typescript is a powerful tool to make lookup and updating quick and easy. Lets
  implement it!
tldr:
  Create Javascript script and get running in babel, add Typescript and
  babel Typescript dependencies, generate input and output interfaces, and
  rewrite to new output structure
image: /img/computer_code.jpg
tags:
  - javascript
  - typescript
  - scripting
  - node
  - babel
  - fs
  - spread-operator
  - node-fetch
  - json
---

# Table of Contents

```toc

```

## Why

Scripts typically require some level of tinkering and tweaking to get the desired output. If written in Javascript, developers have to remember the shape of input and output. I personally have to log output to recall what I'm getting as a response. By now, most of the Javascript community is aware of the perks of switching to Typescript. If you'd like a refresher, visit [Serokell's post](https://serokell.io/blog/why-typescript)

## What are we making?

We are going to take input from [the covid tracking api](https://api.covidtracking.com) and format it in a slightly different way to prepare to graph it on a chart. Here is an example of a day's US output

#### Sample Input

```json
[
 {
   "date":20200916,
   "states":56,
   "positive":6597783,
   "negative":81976741,
   "pending":10587,
   "hospitalizedCurrently":30278,
   "hospitalizedCumulative":390624,
   "inIcuCurrently":6308,
   "inIcuCumulative":18961,
   "onVentilatorCurrently":1651,
   "onVentilatorCumulative":2090,
   "recovered":2525573,
   "dateChecked":"2020-09-16T00:00:00Z",
   "death":188802,
   "hospitalized":390624,
   "lastModified":"2020-09-16T00:00:00Z",
   "total":88585111,
   "totalTestResults":88574524,
   "posNeg":88574524,
   "deathIncrease":1202,
   "hospitalizedIncrease":1517,
   "negativeIncrease":625601,
   "positiveIncrease":40021,
   "totalTestResultsIncrease":665622,
   "hash":"e66c44b8b93e51c84321a2933d4031d75084a04c"
 },
 ...
]
```

#### Sample Output

```json
[
 {
   "x":09-16-2020,
   "y":{
      "positive":6597783,
      "negative":81976741,
      "pending":10587,
      "hospitalizedCurrently":30278,
      "hospitalizedCumulative":390624,
      "inIcuCurrently":6308,
      "inIcuCumulative":18961,
      "onVentilatorCurrently":1651,
      "onVentilatorCumulative":2090,
      "recovered":2525573,
      "death":188802,
      "hospitalized":390624,
      "total":88585111,
      "totalTestResults":88574524,
      "posNeg":88574524,
      "deathIncrease":1202,
      "hospitalizedIncrease":1517,
      "negativeIncrease":625601,
      "positiveIncrease":40021,
      "totalTestResultsIncrease":665622,
 },
 ...
]
```

Instead of starting with a fully functional Javascript script... we'll get a script running and switch to Typescript to start building out the structure and documenting for future changes

## Getting Started with a Javascript example

#### Setup a project space

```bash
mkdir script-in-ts && cd script-in-ts
```

Then initialize a `package.json` that will allow you to specify scripts and dependencies needed

```bash
npm init --y
```

#### We're going to get the script running in Javascript first so lets install the necessary dependencies

```bash
npm install @babel/core @babel/node @babel/preset-env
```

[babel](https://babeljs.io/) allows us the ability compile modern javascript. Both `@babel/core` and `@babel/node` make that possible while [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) allows us to specify things such as the node version or browser support

#### Setting up babel to run Javascript

Add a `.babelrc` file

```bash
touch .babelrc && code .babelrc
```

Paste in the following setup to specify use of node version 10. This will give us access to things like the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) which you will see here soon

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ]
  ]
}
```

#### We're ready to create!

Make an `index.js` file

```bash
touch index.js && code index.js
```

Get started with a [hello world](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program) example

```js
console.log("hello world")
```

#### Open `package.json` and add a start script like so

```json
{
...
   "scripts": {
       "start": "babel-node index.js", // highlight-line
       "test": "echo \"Error: no test specified\" && exit 1"
   },
...
}
```

#### Let's make sure our script runs and everything is setup to move onto Typescript

```bash
npm run start // highlight-line
  hello world // expected output
```

![Nailed it 🎉 Onto part 2](https://media2.giphy.com/media/8VrtCswiLDNnO/giphy.gif?cid=6104955e307906cc7b2d8c8e01b352e2495dcfbc024edf87&rid=giphy.gif)

## Migrating Javascript to Typescript

#### Install dependencies

```bash
npm install typescript @babel/preset-typescript @babel/plugin-transform-typescript
```

The first dependency is [Typescript](https://www.typescriptlang.org/) itself and the second is the preset to transpile Typescript using [babel](https://babeljs.io/)

We'll need to update our `.babelrc` to include the Typescript preset like so

```json
{
  "presets": [
    "@babel/preset-typescript", // highlight-line
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ]
  ]
}
```

#### Create a `tsconfig.json` file

```bash
npx tsc --init
```

#### Rename `index.js` to `index.ts`

```bash
mv index.js index.ts
```

#### Update your start script in `package.json`

```json
{
...
"scripts": {
 "start": "babel-node index.ts --extensions '.ts'", // highlight-line
 "test": "echo \"Error: no test specified\" && exit 1"
},
...
}
```

Although we've added [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript) babel still needs a specification to allow `.ts` files

#### Validate babel compiles and runs `index.ts`

```bash
npm run start // highlight-line
hello world // expected output
```

![Not impressed](https://media1.giphy.com/media/c5FhF1waAJ5wk/giphy.gif?cid=6104955e88a9aa59159727efb21e3902a05049b10d41b861&rid=giphy.gif)

🤞 Although this doesn't seem like a big step... it is. Unless you've configured babel frequently you forget these setup instructions and could put your search abilities to work

## Getting your hands dirty with Typescript 👨🏻‍💻

If you're unfamiliar with defining types and interfaces I would highly encourage you to take a break here and familiarize yourself with the subtle differences between [Javascript](https://www.javascript.com/) and [Typescript](https://www.typescriptlang.org/). I enjoy this [devhints cheatsheet](https://devhints.io/typescript) when I was getting familiar.

#### Fetching data

We're going to type out the response from the [United States COVID-19 impact](https://api.covidtracking.com/v1/us/daily.json) in json format.

Feel free to use whatever fetching library you prefer. I'll be using [node-fetch](https://www.npmjs.com/package/node-fetch#json)

```bash
npm install node-fetch @types/node-fetch
```

Fetch and log the response

```ts
import fetch from "node-fetch"
;(async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json"
  )
  const json = await response.json() //
  console.log(json)
})()
```

#### Typing the input

Your console should be logging something similar to this...

```json
[
 {
   "date":20200916,
   "states":56,
   "positive":6597783,
   "negative":81976741,
   "pending":10587,
   "hospitalizedCurrently":30278,
   "hospitalizedCumulative":390624,
   "inIcuCurrently":6308,
   "inIcuCumulative":18961,
   "onVentilatorCurrently":1651,
   "onVentilatorCumulative":2090,
   "recovered":2525573,
   "dateChecked":"2020-09-16T00:00:00Z",
   "death":188802,
   "hospitalized":390624,
   "lastModified":"2020-09-16T00:00:00Z",
   "total":88585111,
   "totalTestResults":88574524,
   "posNeg":88574524,
   "deathIncrease":1202,
   "hospitalizedIncrease":1517,
   "negativeIncrease":625601,
   "positiveIncrease":40021,
   "totalTestResultsIncrease":665622,
   "hash":"e66c44b8b93e51c84321a2933d4031d75084a04c"
 },
 ...
]
```

Lets make an interface to replicate it!

```ts
import fetch from "node-fetch"

// highlight-start
interface USInputDay {
  date: Date
  states: number
  positive: number
  negative: number
  pending: number
  hospitalizedCurrently: number
  hospitalizedCumulative: number
  inIcuCurrently: number
  inIcuCumulative: number
  onVentilatorCurrently: number
  onVentilatorCumulative: number
  recovered: number
  dateChecked: Date
  death: number
  hospitalized: number
  lastModified: Date
  total: number
  totalTestResults: number
  posNeg: number
  deathIncrease: number
  hospitalizedIncrease: number
  negativeIncrease: number
  positiveIncrease: number
  totalTestResultsIncrease: number
  hash: string
}
// highlight-end

;(async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json"
  )
  const json = await response.json() //
  console.log(json)
})()
```

The interface above is an array of `USInputDay` so if we apply that type to the json response constant

```ts
import fetch from "node-fetch"

interface USInputDay {
  date: Date
  states: number
  positive: number
  negative: number
  pending: number
  hospitalizedCurrently: number
  hospitalizedCumulative: number
  inIcuCurrently: number
  inIcuCumulative: number
  onVentilatorCurrently: number
  onVentilatorCumulative: number
  recovered: number
  dateChecked: Date
  death: number
  hospitalized: number
  lastModified: Date
  total: number
  totalTestResults: number
  posNeg: number
  deathIncrease: number
  hospitalizedIncrease: number
  negativeIncrease: number
  positiveIncrease: number
  totalTestResultsIncrease: number
  hash: string
}

;(async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json"
  )
  const json: USInputDay[] = await response.json() // highlight-line
  console.log(json)
})()
```

We can now get a taste of the perks to switching to Typescript!

![typescript auto-completion example](/img/typescript_sample_auto_completion.png)

Auto-completion makes future requests to change input or output easy. We no longer need to log the file fetch to understand what it should look like!

#### Typing the output

In comparison to the input format we are just going to separate this into `x` and `y` values to show how to manipulate this into a new format

```ts
import fetch from "node-fetch"

interface USInputDay {
  date: Date
  states: number
  positive: number
  negative: number
  pending: number
  hospitalizedCurrently: number
  hospitalizedCumulative: number
  inIcuCurrently: number
  inIcuCumulative: number
  onVentilatorCurrently: number
  onVentilatorCumulative: number
  recovered: number
  dateChecked: Date
  death: number
  hospitalized: number
  lastModified: Date
  total: number
  totalTestResults: number
  posNeg: number
  deathIncrease: number
  hospitalizedIncrease: number
  negativeIncrease: number
  positiveIncrease: number
  totalTestResultsIncrease: number
  hash: string
}

// highlight-start
interface USOutputDay {
  x: Date
  y: Omit<
    USInputDay,
    "date" | "dateChecked" | "lastModified" | "hash"
  >
}
// highlight-end

;(async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json"
  )
  const json: USInputDay[] = await response.json()
})()
```

Above we made reuse of the `USInputDay` interface and we used the [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) utility to delete the keys we don't want to account for

#### Format Output

Now all we have to do is format the input into the output structure

```ts
import fetch from "node-fetch"

interface USInputDay {
  date: Date
  states: number
  positive: number
  negative: number
  pending: number
  hospitalizedCurrently: number
  hospitalizedCumulative: number
  inIcuCurrently: number
  inIcuCumulative: number
  onVentilatorCurrently: number
  onVentilatorCumulative: number
  recovered: number
  dateChecked: Date
  death: number
  hospitalized: number
  lastModified: Date
  total: number
  totalTestResults: number
  posNeg: number
  deathIncrease: number
  hospitalizedIncrease: number
  negativeIncrease: number
  positiveIncrease: number
  totalTestResultsIncrease: number
  hash: string
}

interface USOutputDay {
  x: Date
  y: Omit<
    USInputDay,
    "date" | "dateChecked" | "lastModified" | "hash"
  >
}

;(async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json"
  )
  const json: USInputDay[] = await response.json()

  // highlight-start
  const output: USOutputDay[] = json.map(
    ({ date, dateChecked, lastModified, hash, ...theRest }) => ({
      x: date,
      y: theRest
    })
  )
  // highlight-end
})()
```

I got a little fancy here and used the [spread operator](https://www.javascripttutorial.net/es6/javascript-spread/). Since I knew the output format only excluded a few keys from the input I pulled the keys I wanted and the `...theRest` is all the remaining keys in the object I need to satisfy my output.

![Slick huh!?](https://media3.giphy.com/media/eKDp7xvUdbCrC/giphy.gif?cid=6104955eb8d41fd07c51b519d8a0dce614135765d932dc9d&rid=giphy.gif)

#### Write it to file

Last step... I promise 😉

Import the [file system](https://nodejs.org/api/fs.html#fs_file_system) and write it to an output file

```ts
import fetch from "node-fetch"
import { writeFileSync } from "fs" // highlight-line

interface USInputDay {
  date: Date
  states: number
  positive: number
  negative: number
  pending: number
  hospitalizedCurrently: number
  hospitalizedCumulative: number
  inIcuCurrently: number
  inIcuCumulative: number
  onVentilatorCurrently: number
  onVentilatorCumulative: number
  recovered: number
  dateChecked: Date
  death: number
  hospitalized: number
  lastModified: Date
  total: number
  totalTestResults: number
  posNeg: number
  deathIncrease: number
  hospitalizedIncrease: number
  negativeIncrease: number
  positiveIncrease: number
  totalTestResultsIncrease: number
  hash: string
}

interface USOutputDay {
  x: Date
  y: Omit<
    USInputDay,
    "date" | "dateChecked" | "lastModified" | "hash"
  >
}

;(async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json"
  )
  const json: USInputDay[] = await response.json()

  const output: USOutputDay[] = json.map(
    ({ date, dateChecked, lastModified, hash, ...theRest }) => ({
      x: date,
      y: theRest
    })
  )

  writeFileSync("formatted.json", JSON.stringify(output)) // highlight-line
})()
```

That's it! Now your script is ready to tweak for a new change or to use as is!

![Celebration Time](https://media4.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy-downsized.gif?cid=6104955ecf32cab9ec792acd6cff55cda44eb3a17a317894&rid=giphy-downsized.gif)

If you got lost at any point, no fear, [here](https://github.com/keonik/scripting-in-ts) is a repository showing what was made!

## Summary

We learned how to setup a project from scratch to use babel and run basic Javascript files. We then converted Javascript to Typescript and setup babel to handle Typescript files. Next we learned how to fetch files using `node-fetch`. We gained some experiences building types/interfaces to control input and output for benefits such as auto-completion. Lastly, we learned to write content to a file using `fs`.
