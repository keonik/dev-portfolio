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
 }
]
```

Instead of starting with a fully functional javascript script... we'll get a script running and switch to typescript to start building out the structure and documenting for future changes

## 