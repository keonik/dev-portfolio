---
path: setting-up-scripts-with-typescript
date: 2020-09-16T20:12:18.415Z
lastUpdated: 2020-09-16T20:12:18.457Z
title: Setting up scripts with Typescript
description: Everyone needs to script a process to become more efficient. If we
  frequently update a script it's nice to have documentation and completion.
  Typescript is a powerful tool to make lookup and updating quick and easy. Lets
  implement it!
tldr: Make javascript script,...
image: /img/computer_code.jpg
tags:
  - javascript
  - typescript
  - scripting
  - node
  - babel
---
## Why

Scripts typically require some level of tinkering and tweaking to get the necessary data. If written in javascript, it can be hard to recall what the planned input and output structure is. By now, most of the javascript community is aware of the perks of switching to typescript. If you'd like a refresher visit [serokell's post](https://serokell.io/blog/why-typescript)

## What we are going to make

We are going to take output from [the covid tracking api](https://api.covidtracking.com/v1/us/daily.json) and format it in a slightly different output. Here is an example of a day's US output. The link above returns an array of these objects

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

Instead of starting with a fully functional javascript script... we'll get a script running and switch to typescript to start building out the structure and documenting for future changes

## Getting Started with a javascript example

#### Setup a project space

   This could be things like opening terminal and running `mkdir script-in-ts`, changing directory into the project space `cd script-in-ts`, and `npm init --y` to create a package.json file

#### Open `package.json` and add a start script like so

```
"scripts": {
    "start": "babel-node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

#### We're going to get the script running in javascript first so lets install the necessary dependencies

   `npm install @babel/core @babel/node @babel/preset-env`

#### Create a `.babelrc` file with the following

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

#### Create a `index.js` file to test the script

   How about a basic hello world

```js
   console.log('hello world')
```

#### Run the script and make sure you get the expected output by running `npm run start`

## Migrating javascript to typescript

#### Install dependencies

`npm install typescript @babel/preset-typescript @babel/plugin-transform-typescript`

The first dependency is [typescript](https://www.typescriptlang.org/) itself and the second is the preset to transpile typescript using [babel](https://babeljs.io/)

#### Create a `tsconfig.json` file

We could quickly do this by running the initialization after install typescript

`npx tsc --init`

#### Rename `index.js` to `index.ts`

#### Update your start script in `package.json`

`"start": "babel-node index.ts --extensions '.ts'",`

#### Revalidate your hello world script runs!

## Getting your hands dirty with typescript 👨🏻‍💻

If you're unfamiliar with defining types and interfaces I would highly encourage you to take a break here and familiarize yourself with the subtle differences between javascript and [typescript](https://www.typescriptlang.org/). I enjoy this [devhints cheatsheet](https://devhints.io/typescript) when I was getting familiar.

#### Fetch the input file

We're going to type out the response from <https://api.covidtracking.com/v1/us/daily.json> which is the United States COVID-19 impact.

Feel free to use whatever fetching library you prefer. I'll be using [node-fetch](https://www.npmjs.com/package/node-fetch#json)

```
npm install node-fetch @types/node-fetch
```

Fetch and log the response from `https://api.covidtracking.com/v1/us/daily.json`

```ts
import fetch from "node-fetch";

(async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json"
  );
  const json = await response.json();
  console.log(json);
})();
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
interface USInputDay {
  date: Date;
  states: number;
  positive: number;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  dateChecked: Date;
  death: number;
  hospitalized: number;
  lastModified: Date;
  total: number;
  totalTestResults: number;
  posNeg: number;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
  hash: string;
}
```

The interface above is an array of `USInputDay` so if we apply that type to the json response constant

```ts
  const json: USInputDay[] = await response.json();
```

We can get a taste of the perks to switching to typescript! 

![typescript auto-completion example](/img/typescript_sample_auto_completion.png)

Auto-completion makes future requests to change input or output easy

#### Typing the output

In comparison to the input format we are just going to separate this into `x` and `y` values to show how to manipulate this into a new format

```ts
interface USOutputDay {
  x: Date;
  y: Omit<USInputDay, "date" | "dateChecked" | "lastModified" | "hash">;
}
```

Above we made reuse of the `USInputDay` interface and we used the [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) utility to delete the keys we don't want to account for

#### Format Output 

Now all we have to do is format the input into the output structure

```ts
  const output: USOutputDay[] = json.map(
    ({ date, dateChecked, lastModified, hash, ...theRest }) => ({
      x: date,
      y: theRest,
    })
  );
```

#### Write it to file

Last step... I promise 😉

Import the [file system]()

```
import { writeFileSync } from "fs";
```

write the output to file

```ts
  writeFileSync("formatted.json", JSON.stringify(output));
```

That's it! Now your script is ready to tweak for a new change or to use as is! Create something great!
